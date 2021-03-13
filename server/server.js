const Koa = require('koa')
const http = require('http')
const cors = require('cors')
const socket = require('socket.io')

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

const app = new Koa()
app.use(cors())
const server = http.createServer(app.callback())
const io = socket(server, { 
    cors: { 
      origin: "http://localhost:3000" , 
      methods: [ "GET" , "POST" ]
     } 
  })

  io.on('connection', socket => {
      console.log('[IO] Connection => Server has a new connection')
      socket.on('chat.message', data => {
          console.log(`[SOCKET] Chat.message => ${data.message}`)
          io.emit('chat.message', data)
      })
      socket.on('disconnect', () => {
          console.log('[SOCKET] Disconnect => A connection was disconnected')
      })
  })

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
    console.log(`[HTTP] Listen => press CTRL+C to stop it`)
})