const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handlerFactory');

const signToken = id => {
    return jwt.sign({ id }, 'a9f3dcb28g4c1d5a93e8b6c1q2f7a1e4', {
        expiresIn: '90d'
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role,
        branch: req.body.branch,
    })
    const token = signToken(newUser._id)
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { name, password } = req.body
    if (!name || !password) {
        return next(new AppError('Please provide name and password', 400))
    }

    const user = await User.findOne({ name }).select('+password')
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect name or password !', 401))
    }

    const token = signToken(user._id)
    res.status(200).json({
        status: 'success',
        user,
        token
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return next(new AppError('You are not logged in ! please log in to get access', 401))
    }

    const decoded = await promisify(jwt.verify)(token, 'a9f3dcb28g4c1d5a93e8b6c1q2f7a1e4')

    const currenthUser = await User.findById(decoded.id)

    if (!currenthUser) return next(new AppError('The user belonging to this token does no longer exist !', 401))

    if (currenthUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('user recently changed password! please login in again', 401))
    }

    req.user = currenthUser

    next()
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have a premission to perform this action', 403))
        }

        next()
    }
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1 get user based on posted email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError('There is no user with email address', 404))
    }

    // 2 generate the random token
    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave })
    // 3 send it to user's email
})
exports.resetPassword = (req, res, next) => {

}

exports.getUser = factory.getOne(User);