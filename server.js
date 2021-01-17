const express = require("express")
var cors = require("cors")

const app = express()

app.use(cors())
const path = require("path")
const publicPath = path.join(__dirname, "build")

console.log(path)
app.use(express.static(publicPath))

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
})
