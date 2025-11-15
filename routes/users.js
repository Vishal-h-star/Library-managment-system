const  express = require('express')
const {users}  = require('../Data/user.json')

const router = express.Router();

// example
// router.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: users
//     })
// })

// -------->>------------->------------->>
// Route: /users
// Method : Get
// Description:  Get all the list of users  in the system
// Access: public
// Parameters :none

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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
        return res.status(404).send({ success: false, message: `Requeste id ${id} user not found ` })
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

router.post('/', (req, res) => {
    // required fields
    //  id, name, surname ,email ,subscriptionType,subscriptionDate
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body
    console.log(id, name, surname, email, subscriptionDate, subscriptionType)

    if (!id, !name, !surname, !email, !subscriptionType, !subscriptionDate) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        })
    }

    const user = users.find((eachUser) => eachUser.id === Number(id))
    if (user) {
        return res.status(409).json({
            success: false,
            message: "User id  is already exists"
        })
    }

    users.push({ id, name, surname, email, subscriptionType, subscriptionDate })
    res.status(201).json({
        success: true,
        message: "User created Successfully"
    })


})

// ----------->------------------------------>
// Route: /users/:id
// Method : PUT    
// Description:  Updating a user by their Id
// Access: public
// Parameters : id

router.put('/:id', (req, res) => {
    const { id } = req.params
    // example  i change  {"name":"vishal singh"}
    const { data } = req.body

    // data will be {name:"vishal singh"}
    const user = users.find((user) => user.id === Number(id))
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found for id : ${id}`
        })
    }

    //  we can also do it like this;
    //  Object.assign(user, data)

    const updatedUser = users.map((user) => {
        if (user.id === Number(id)) {
            return {
                ...user,
                //  new incoming data (overwrites only matching fields)
                ...data,
                id: user.id,
            }
        }
        return user;
    })
    
    console.log("updatedUser", updatedUser)
    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User Updated successfully"
    })

})

// Route: /users/:id
// Method : DELETE   
// Description:  Deleting user by their Id
// Access: public
// Parameters : id

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === Number(id))
     console.log("user" , user)
    if (!user) {
       return  res.status(404).json({
            success: false,
            message: "User not found by this id"
        })
    }

    // there is one more method 
    // const updatedUser = users.filter( (user) => user.id !== Number(id))

    const userIndex =  users.indexOf(user)
    if(userIndex > -1){
        users.splice(userIndex, 1);
    }
    
    console.log("users full data" , users)

    res.status(200).json({
          success:true,
          message:" User is deleted successfully"
    })


})

module.exports = router;