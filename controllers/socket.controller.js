class SocketController {
  /* Не будет работать на нескольких точках входа для одного и того же пользователя
    При открытии второй вкладки, первый connect ws будет заменен на второй 
    Нужно добавить идентификатор точки входа
  */  
  clients = {};
  connect = (ws, req) => {
    console.log("WS connect", req.user.id)
    try {
      this.clients[req.user.id] = ws;
      ws.on("close", () => {
        console.log("WS close")
        delete this.clients[req.user.id];
      })
      ws.on("message",(msg)=>{
        console.log(msg)
      })
    } catch (error) {
      console.log(error)
    }
  }
  sendMessage = (chat_id, recipient_id, message) => {
    try {
      const ws = this.clients[recipient_id];
      if (ws) ws.send(JSON.stringify({ message, chat_id }));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new SocketController();