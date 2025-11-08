const express = require('express')
const { users } = require('./Data/user.json')

const app = express()
const PORT = 8081

app.use(express.json())


// ---------->---------->
// For home page 

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Home page :-)"
    })
})

// -------->>------------->------------->>
// Route: /users
// Method : Get
// Description:  Get all the list of users  in the system
// Access: public
// Parameters :none

app.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})

// ----------->--------------------->
// Route: /users/:id
// Method : Get
// Description:  Get a user details by their id
// Access: public
// Parameters : id

app.get('/users/:id', (req, res) => {
    // returns id in string
    const { id } = req.params
    const user = users.find((eachUser) => eachUser.id === Number(id))
    console.log("user", user)
    //  why is use return  here 
    // don’t stop the function after that   .
    // So the code keeps running and immediately hits this line too:
    // That means Express tries to send two responses for one request, which is not allowed.
    // Now if a user isn’t found, the function exits right there —
    // and your server won’t try to send a second response.
    if (!user) {
        return res.status(404).send({ success: false, data: `Requeste id ${id} user not found ` })
    }

    res.status(200).send({
        success: true,
        data: user
    })
})

// ------------------->---------------------------->
// Route: /users
// Method : POST    
// Description:  create/Register a new user
// Access: public
// Parameters : Details

app.post('/users', (req, res) => {
    // required fields
    //  id, name, surname ,email ,subscriptionType,subscriptionDate
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body
    console.log(id , name ,surname ,email , subscriptionDate, subscriptionType)

    if (!id, !name, !surname, !email, !subscriptionType, !subscriptionDate) {
       return  res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        })
    } 

    const user = users.find((eachUser) => eachUser.id === Number(id))
     if(user){
       return  res.status(409).json({
         success:false,
         message: "User id  is already exists"
       })
     }

     users.push( {id, name ,surname,email, subscriptionType, subscriptionDate})
     res.status(201).json({
        success:true,
        message:"User created Successfully"
     })


})

// ----------->------------------------------>
// Route: /users/:id
// Method : PUT    
// Description:  Updating a user by their Id
// Access: public
// Parameters : id

app.put('/users/:id' , (req, res)=>{
     const {id} = req.params
    // example  i change  {"name":"vishal singh"}
     const {data} = req.body

    // data will be {name:"vishal singh"}
     const user = users.find( (user) => user.id === Number(id) )
     if(!user){
         return res.status(404).json({
            success:false,
            message:`User not found for id : ${id}`
         })
     }

    //  Object.assign(user, data)
     const updatedUser = users.map( (user) =>{
         if(user.id === Number(id)){
            return {
                 ...user,
                //  new incoming data (overwrites only matching fields)
                 ...data,
                 id:user.id,
            }
         }
         return user;
     })

     console.log("updatedUser", updatedUser)
     res.status(200).json({
        success:true,
        data: updatedUser,
        message: "User Updated successfully"
     })

})



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