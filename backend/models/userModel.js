const mongoose = require(`mongoose`)

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, `Name is Required`],
        },
        email: {
            type: String,
            required: [true, `Email is Required`],
            unique: true,
        },
        password: {
            type: String,
            required: [true, `Password is Required`],
        },
        age: {
            type: Number,
            required: [true, `Age is Required`],
        },
        gender: {
            type: String,
            required: [true, `Gender is Required`],
            enum: ['male', 'female', 'other'],
        },
        school: {
            type: String,
            required: [true, `School is Required`],
        },
        phone: {
            type: String,
            required: [true, `Phone is Required`],
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model(`Users`, userSchema)