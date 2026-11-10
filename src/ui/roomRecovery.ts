import { normalizePlayerName } from '../../shared/lobby'
import { normalizeRoomCode } from './roomInvite'

export const ROOM_RECONNECT_MAX_RETRIES = 6
const LAST_ROOM_KEY = 'bantec:last-room'

export type LastRoom = { roomCode: string; name: string; reconnectionToken: string }

// The last-room record is shared across tabs; an active session keeps its own name.
export function getSessionRecoveryName(currentName: string) {
  return normalizePlayerName(currentName) ?? ''
}

export function readLastRoom(storage: Pick<Storage, 'getItem'> | null): LastRoom | null {
  try {
    const value = storage?.getItem(LAST_ROOM_KEY)
    if (!value) return null
    const parsed: unknown = JSON.parse(value)
    if (!parsed || typeof parsed !== 'object') return null
    const candidate = parsed as Partial<LastRoom>
    const roomCode = normalizeRoomCode(candidate.roomCode ?? '')
    const name = normalizePlayerName(candidate.name)
    if (!roomCode || !name) return null
    return { roomCode, name, reconnectionToken: typeof candidate.reconnectionToken === 'string' ? candidate.reconnectionToken : '' }
  } catch {
    return null
  }
}

export function saveLastRoom(storage: Pick<Storage, 'setItem'> | null, room: LastRoom) {
  try { storage?.setItem(LAST_ROOM_KEY, JSON.stringify(room)) } catch { /* Storage may be unavailable. */ }
}

export function clearLastRoom(storage: Pick<Storage, 'getItem' | 'removeItem'> | null, expected?: LastRoom) {
  try {
    if (expected) {
      const saved = readLastRoom(storage)
      if (!saved || saved.roomCode !== expected.roomCode || saved.name !== expected.name || saved.reconnectionToken !== expected.reconnectionToken) return
    }
    storage?.removeItem(LAST_ROOM_KEY)
  } catch { /* Storage may be unavailable. */ }
}

export async function discardExpiredLastRoom(storage: Pick<Storage, 'getItem' | 'removeItem'> | null, expected: LastRoom, exists: () => Promise<boolean | null>) {
  try {
    if (await exists() === false) clearLastRoom(storage, expected)
  } catch { /* A falha de consulta não confirma que a sala deixou de existir. */ }
}

export async function checkRoomExists(baseUrl: string, roomCode: string): Promise<boolean | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 4000)
  try {
    const url = new URL(`/room-exists/${encodeURIComponent(roomCode)}`, baseUrl)
    if (url.protocol === 'ws:') url.protocol = 'http:'
    if (url.protocol === 'wss:') url.protocol = 'https:'
    const response = await fetch(url, { cache: 'no-store', signal: controller.signal })
    if (!response.ok) return null
    const body: unknown = await response.json()
    return body && typeof body === 'object' && 'exists' in body && typeof body.exists === 'boolean' ? body.exists : null
  } catch { return null } finally { clearTimeout(timer) }
}

export function configureRoomReconnection(room: { reconnection: { maxRetries: number; minUptime: number } }) {
  room.reconnection.maxRetries = ROOM_RECONNECT_MAX_RETRIES
  room.reconnection.minUptime = 0
}

export async function recoverRoomAfterRetries<T>(reconnectByToken: () => Promise<T>, rejoinByIdentity: () => Promise<T>) {
  try {
    return { room: await reconnectByToken(), method: 'token' as const }
  } catch {
    try {
      return { room: await rejoinByIdentity(), method: 'identity' as const }
    } catch {
      return { room: null, method: null }
    }
  }
}
