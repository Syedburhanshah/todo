import app from "../App/HTTP/expressApp/express"
const port = process.env.PORT;



app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
}),

app.listen(port,() => {
    console.log(`Running on port ${port}`)
})