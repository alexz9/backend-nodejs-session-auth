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
  sendMessage = (user_id, recipient_id, msg) => {
    try {
      if(this.clients[recipient_id]){
        this.clients[recipient_id].send(JSON.stringify(msg));
      }
      if(this.clients[user_id]){
        this.clients[user_id].send(JSON.stringify(msg));
      }      
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new SocketController();