module.exports = function errorMiddleware(error, req, res){
  if(error && res.status){
    console.log(error);
    return res.status(500).send("Bad request"); 
  }        
}