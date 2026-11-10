import { describe, expect, it, vi } from 'vitest'
import { clearLastRoom, configureRoomReconnection, discardExpiredLastRoom, getSessionRecoveryName, readLastRoom, recoverRoomAfterRetries, ROOM_RECONNECT_MAX_RETRIES, saveLastRoom } from './roomRecovery'

describe('room reconnection recovery', () => {
  it('apaga apenas a sala confirmada inexistente e preserva falhas e alterações de outra aba', async () => {
    const values = new Map<string, string>()
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value) }, removeItem: (key: string) => { values.delete(key) } }
    const room = { roomCode: 'ABCDE', name: 'Ana', reconnectionToken: 'a' }
    saveLastRoom(storage, room)
    await discardExpiredLastRoom(storage, room, async () => true)
    expect(readLastRoom(storage)).toEqual(room)
    await discardExpiredLastRoom(storage, room, async () => { throw new Error('offline') })
    expect(readLastRoom(storage)).toEqual(room)
    const other = { roomCode: 'FGHJK', name: 'Bia', reconnectionToken: 'b' }
    await discardExpiredLastRoom(storage, room, async () => { saveLastRoom(storage, other); return false })
    expect(readLastRoom(storage)).toEqual(other)
    saveLastRoom(storage, room)
    await discardExpiredLastRoom(storage, room, async () => false)
    expect(readLastRoom(storage)).toBeNull()
  })
  it('preserva o nome de cada aba mesmo quando outra altera a última sala compartilhada', async () => {
    const values = new Map<string, string>()
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value) } }
    saveLastRoom(storage, { roomCode: 'ABCDE', name: 'Ana', reconnectionToken: 'a' })
    saveLastRoom(storage, { roomCode: 'ABCDE', name: 'Bia', reconnectionToken: 'b' })
    expect(readLastRoom(storage)?.name).toBe('Bia')
    expect(getSessionRecoveryName('Ana')).toBe('Ana')
    expect(getSessionRecoveryName('Bia')).toBe('Bia')
    const join = vi.fn().mockResolvedValue({ id: 'cadeira de Ana' })
    await recoverRoomAfterRetries(async () => { throw new Error('token expirado') }, () => join('ABCDE', getSessionRecoveryName('Ana')))
    expect(join).toHaveBeenCalledWith('ABCDE', 'Ana')
  })
  it('stores and restores the last room identity and token for a new visit', () => {
    const values = new Map<string, string>()
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value) }, removeItem: (key: string) => { values.delete(key) } }
    const lastRoom = { roomCode: 'ABCDE', name: 'Lia', reconnectionToken: 'secret-token' }
    saveLastRoom(storage, lastRoom)
    expect(readLastRoom(storage)).toEqual(lastRoom)
    clearLastRoom(storage)
    expect(readLastRoom(storage)).toBeNull()
  })

  it('não apaga a última sala de outra aba quando a primeira sai', () => {
    const values = new Map<string, string>()
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value) }, removeItem: (key: string) => { values.delete(key) } }
    const ana = { roomCode: 'ABCDE', name: 'Ana', reconnectionToken: 'a' }
    const bia = { roomCode: 'ABCDE', name: 'Bia', reconnectionToken: 'b' }
    saveLastRoom(storage, bia)
    clearLastRoom(storage, ana)
    expect(readLastRoom(storage)).toEqual(bia)
    clearLastRoom(storage, bia)
    expect(readLastRoom(storage)).toBeNull()
  })

  it('ignores malformed saved rooms and unavailable storage', () => {
    expect(readLastRoom({ getItem: () => '{broken' })).toBeNull()
    expect(readLastRoom({ getItem: () => JSON.stringify({ roomCode: 'bad', name: 'Lia' }) })).toBeNull()
    expect(readLastRoom(null)).toBeNull()
    expect(() => saveLastRoom({ setItem: () => { throw new Error('blocked') } }, { roomCode: 'ABCDE', name: 'Lia', reconnectionToken: '' })).not.toThrow()
  })
  it('limita as tentativas automáticas para liberar a recuperação por identidade', () => {
    const room = { reconnection: { maxRetries: 15, minUptime: 5000 } }

    configureRoomReconnection(room)

    expect(ROOM_RECONNECT_MAX_RETRIES).toBe(6)
    expect(room.reconnection).toMatchObject({ maxRetries: ROOM_RECONNECT_MAX_RETRIES, minUptime: 0 })
  })

  it('tries the session token before rejoining with the player identity', async () => {
    const recoveredRoom = { id: 'room' }
    const reconnectByToken = vi.fn().mockRejectedValue(new Error('expired token'))
    const rejoinByIdentity = vi.fn().mockResolvedValue(recoveredRoom)

    await expect(recoverRoomAfterRetries(reconnectByToken, rejoinByIdentity)).resolves.toEqual({ room: recoveredRoom, method: 'identity' })
    expect(reconnectByToken).toHaveBeenCalledOnce()
    expect(rejoinByIdentity).toHaveBeenCalledOnce()
  })

  it('does not try identity rejoin when token recovery succeeds', async () => {
    const recoveredRoom = { id: 'room' }
    const rejoinByIdentity = vi.fn()

    await expect(recoverRoomAfterRetries(async () => recoveredRoom, rejoinByIdentity)).resolves.toEqual({ room: recoveredRoom, method: 'token' })
    expect(rejoinByIdentity).not.toHaveBeenCalled()
  })

  it('reports when neither recovery path succeeds', async () => {
    await expect(recoverRoomAfterRetries(async () => { throw new Error('token failed') }, async () => { throw new Error('identity failed') }))
      .resolves.toEqual({ room: null, method: null })
  })
})
