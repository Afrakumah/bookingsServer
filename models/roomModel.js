import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
     price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumber: [{
        number:Number,
        unavailableDates: {type: [Date]}
    }],
}, {timestamps: true });


// [
//     {number:101, unavailableDates:[15.04.2024,21.04.2024]},
//     {number:102, unavailableDates:[]},
//     {number:103, unavailableDates:[]},
//     {number:104, unavailableDates:[]},
//     {number:105, unavailableDates:[]}

// ]

const Room = mongoose.model('Room', roomSchema)
export default Room