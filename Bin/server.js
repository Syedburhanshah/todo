const app = require("../App/HTTP/expressApp/express")
require('../App/Database/Connection/DatabaseConnection')
const port = 5000;
app.get('/', (req, res) => {
  res.send('Hello World!')
}),



app.listen(port,() => {
    console.log(`Running on port ${port}`)
})