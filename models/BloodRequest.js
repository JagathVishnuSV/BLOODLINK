const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    patientName: String,
    bloodGroup: {
        type: String,
        required: true
    },
    unitsNeeded: {
        type: Number,
        required: true
    },
    hospital: String,
    reason: String,
    contactNumber: String,
    urgency: {
        type: String,
        enum: ['normal', 'medium', 'urgent', 'critical'],
        default: 'normal',
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
            required: true
        }
    },
    neededBefore: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["active","fulfilled","expired"],
        default: "active"
    },
    fulfilledBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []  
      }
      
}, { timestamps: true });

bloodRequestSchema.index({ location: "2dsphere"});

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
