import logger from "../App/services/loggers"
import app from "../App/HTTP/expressApp/express"
const port = process.env.PORT;



app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
}),

app.listen(port,() => {
    logger.info(`Running on port ${port}`)
    
    

})