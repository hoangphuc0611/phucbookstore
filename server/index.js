const express = require("express");
const app = express()
const cors = require("cors")

const PORT = process.env.PORT || 3001

app.use(express.json())
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const router = require("./routes/route.js")
app.use("/", router);

app.listen(PORT, () => console.log('server running is port: '+ PORT));