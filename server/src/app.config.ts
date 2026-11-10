import { Server, matchMaker } from '@colyseus/core'
import { WebSocketTransport } from '@colyseus/ws-transport'
import { GameRoom } from './rooms/GameRoom.js'

const server = new Server({
  transport: new WebSocketTransport(),
  express: (app) => {
    app.get('/room-exists/:roomId', async (request: { params: { roomId: string } }, response: { set: (name: string, value: string) => void; status: (code: number) => { json: (body: object) => void }; json: (body: object) => void }) => {
      response.set('Access-Control-Allow-Origin', '*')
      response.set('Cache-Control', 'no-store')
      if (!/^[A-Z0-9]{5}$/.test(request.params.roomId)) return response.status(400).json({ error: 'invalid room code' })
      try {
        const rooms = await matchMaker.findRoomsByIds([request.params.roomId])
        response.json({ exists: rooms.has(request.params.roomId) })
      } catch {
        response.status(503).json({ error: 'room lookup unavailable' })
      }
    })
    app.get('/health', (_request: unknown, response: { set: (name: string, value: string) => void; json: (body: { status: string }) => void }) => {
      response.set('Access-Control-Allow-Origin', '*')
      response.set('Cache-Control', 'no-store')
      response.json({ status: 'ok' })
    })
  },
})
server.define('game_room', GameRoom)

export default server
