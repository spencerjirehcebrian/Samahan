const mongoose = require('mongoose');
const groupSchema = mongoose.Schema(
    {
        groupName: { type: String, required: [true, 'Please add the group'] },
        locationMeetUp: { type: String, required: [true, 'Please add a meetup place'] },
        locationDestination: { type: String, required: [true, 'Please add the destination'] },
        description: { type: String, required: [true, 'Please add the group'] },
        timeMeetup: { type: Date, required: [true, 'Please add the meetup time'] },
        timeGroupDeparture: { type: Date, required: [true, 'Please add the departure time'] },
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        members: { type: [String], required: true, default: [] }, // Array of strings for members
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('Group', groupSchema);
