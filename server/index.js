const express = require("express");
const app = express()
const cors = require("cors")

const PORT = process.env.PORT || 3001

app.use(express.json())

const router = require("./routes/route.js")
app.use("/", router);

app.listen(PORT, () => console.log('server running is port: '+ PORT));