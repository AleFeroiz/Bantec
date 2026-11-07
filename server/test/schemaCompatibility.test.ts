import { Metadata } from '@colyseus/schema'
import { LobbyPlayerState, LobbyState } from '../src/rooms/schema/LobbyState.js'
import { describe, expect, it } from 'vitest'

describe('Colyseus schema compatibility', () => {
  it('appends team fields without shifting existing lobby field indexes', () => {
    const lobbyFields = Object.keys(Metadata.getFields(LobbyState))
    const playerFields = Object.keys(Metadata.getFields(LobbyPlayerState))

    expect(lobbyFields.slice(0, 4)).toEqual(['players', 'properties', 'roomCode', 'mode'])
    expect(lobbyFields.at(-1)).toBe('teamFormat')
    expect(playerFields.slice(0, 11)).toEqual([
      'name', 'isHost', 'isReady', 'isConnected', 'reconnectionExpired', 'isBot',
      'isBotControlled', 'isInactive', 'controllerSessionId', 'characterType', 'color',
    ])
    expect(playerFields.slice(-2)).toEqual(['teamId', 'teamColor'])
  })
})
