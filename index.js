const express = require('express')
const { users } = require('./Data/user.json')
const dotenv = require("dotenv")

// Importing Database connection file
const Dbconnection =  require('./DataBaseConnection')

const usersRouter = require('./routes/users')
const booksRouter = require('./routes/book')

dotenv.config()

const app = express()
const PORT = 8081

Dbconnection();

app.use(express.json())


// ---------->---------->
// For home page 

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Home page :-)"
    })
})

// Should call after home pasge 

app.use( '/users' , usersRouter)
app.use( '/books' , booksRouter)


// This is not working

// app.get('/users', async (req, res) => {
//     try {
//         let filepath = path.join(__dirname, "Data", 'user.json')
//         let data = await fs.readFile(filepath, "utf-8")
//         res.status(200).json(json.parse(data))
//     }catch(err){
//        res.status(500).send( {message:"something went wrong"})
//     }

// })

// app.all("*" , (req, res)=>{
//      res.status(501).send( {
//         message:"not implimented"
//      })
// })

//  show if the request  noutes is not implimented

// app.use( (req, res)=>{
//      res.status(404).send({
//          message:"page not found",
//      })
// })

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})