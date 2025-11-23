const { UserModel, BookModel } = require('../Models')

exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();

    if (!users || users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Users in system"
        })
    }

    res.status(200).json({
        success: true,
        data: users,
    })
}

exports.getSingleUserById = async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({
            success: true,
            message: `User not found by this id : ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: user,
    })

}

exports.createUser = async (req, res) => {
    const { data } = req.body

    if (!data || Object.keys(data) === 0) {
        return res.status(400).json({
            success: true,
            message: "Please provide the details to create the user"
        })
    }


    await UserModel.create(data)

    res.status(201).json({
        success: true,
        message: "User create successfully",
        data
    })

}

exports.updateUserById = async (req, res) => {
    const id = req.params.id
    if (!req?.body) {
        return res.status(400).json({
            success: true,
            message: "Please provide the data to update"
        })
    }

    const { data } = req.body

    const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: id },
        data,
        { new: true }
    )

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            message: `No user found by this id : ${id}`
        })
    }

    res.status(200).json({
        success: true,
        message: `User is update id : ${id}`,
        data: updatedUser,
    })

}

exports.deleteUserById = async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)

    if (!user) {
        return res.status(404).json({
            success: true,
            message: `User not found by given id : ${id}`
        })
    }

    await UserModel.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        message: `User deleted successfully`
    })
}

exports.getSubscriptionDetailsById = async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found by this id: ${id}`
        })
    }

    // Extact the subscription details

    const getDateInDays = (data = '') => {
        let date;
        if (data) {
            date = new Date(data)
        } else {
            date = new Date()
        }
        // It gives days since Jan 1, 1970,
        let days = Math.floor(date.getTime() / (1000 * 60 * 60 * 24))
        return days
    }

    const subscriptionType = (date) => {
        if (user.subscriptionType === 'basic') {
            date += 90;
        } else if (user.subscriptionType === 'standard') {
            date += 180;
        } else if (user.subscriptionType === 'premium') {
            date += 365
        }
        return date;
    }

    //subscription expiration calculation
    //  jaunary 1,1970 UTC  // milliseconds

    let returnDate = getDateInDays(user.returnDate)
    let currentDate = getDateInDays()
    let subscriptionDate = getDateInDays(user.subscriptionDate)
    let subscriptionExpiration = subscriptionType(subscriptionDate)


    const data = {
        ...user._doc,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        DaysAfterReturnDate: returnDate - currentDate,
        returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 180 : 100 : 0,
    }

    res.status(200).json({
        success: true,
        data
    })

}