import { Server } from '@colyseus/core'
import { WebSocketTransport } from '@colyseus/ws-transport'
import { GameRoom } from './rooms/GameRoom.js'

const server = new Server({
  transport: new WebSocketTransport(),
  express: (app) => {
    app.get('/health', (_request: unknown, response: { set: (name: string, value: string) => void; json: (body: { status: string }) => void }) => {
      response.set('Access-Control-Allow-Origin', '*')
      response.set('Cache-Control', 'no-store')
      response.json({ status: 'ok' })
    })
  },
})
server.define('game_room', GameRoom)

export default server
