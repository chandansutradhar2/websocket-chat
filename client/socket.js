const io = require('socket.io-client')

export default function () {
  const socket = io.connect('http://localhost:3000')

  function registerHandler(onMessageReceived) {
    socket.on('message', onMessageReceived) //subscribing to an event
  }

  function unregisterHandler() {
    socket.off('message')
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  function register(name, cb) {
    socket.emit('register', name, cb) //publising an event
  }

  function join(chatroomName, cb) {
    socket.emit('join', chatroomName, cb)
  }

  function leave(chatroomName, cb) {
    socket.emit( 'leave', chatroomName,cb )
  }

  function message(chatroomName, msg, cb) {
    socket.emit('message', { chatroomName, message: msg }, cb) //publising an event
  }

  function getChatrooms(cb) {
    socket.emit('chatrooms', null, cb)
  }

  function getAvailableUsers(cb) {
    socket.emit('availableUsers', null, cb)
  }

  return {
    register,
    join,
    leave,
    message,
    getChatrooms,
    getAvailableUsers,
    registerHandler,
    unregisterHandler
  }
}

