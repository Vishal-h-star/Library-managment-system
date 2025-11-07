const express = require('express')

const app = express()
const PORT = 8081

app.use(express.json())

app.get( '/', (req ,res)=>{
     res.status(200).json( {
        message:"Home page :-)"
     })
})

// app.all("*" , (req, res)=>{
//      res.status(501).send( {
//         message:"not implimented"
//      })
// })

// app.use( (req, res)=>{
//      res.status(404).send({
//          message:"page not found",
//      })
// })

app.listen(PORT ,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})