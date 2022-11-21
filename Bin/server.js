const app = require("../App/HTTP/expressApp/express")
require('../App/Database/Connection/DatabaseConnection')
const port = process.env.PORT;
app.get('/', (req, res) => {
  res.send('Hello World!')
}),



app.listen(port,() => {
    console.log(`Running on port ${port}`)
})