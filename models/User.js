const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true, 
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            default:[0,0]
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        required: true
    },
    donatedTimes: {
        type: Number,
        default: 0
    },
    donationHistory: [
        {
            requestId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "BloodRequest"
            },
            date: Date
        }
    ],
    badges: [String],
    resetToken: String,
    resetTokenExpiry: Date,
}, { timestamps: true});

userSchema.index({ location: "2dsphere"});

module.exports = mongoose.model("User",userSchema);