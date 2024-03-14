const asyncHandler = require(`express-async-handler`);
const Group = require(`../models/groupModel`);
const User = require(`../models/userModel`);

const getGroup = asyncHandler(async (req, res) => {
  const group = await Group.find({ _id: req.params.id });
  res.status(200).json(group);
});

const getGroups = asyncHandler(async (req, res) => {
  const group = await Group.find({ members: {
    $elemMatch: {
      $eq: req.user.name
    }
  } });
  res.status(200).json(group);
});

const getAllGroups = asyncHandler(async (req, res) => {
  const group = await Group.find();
  res.status(200).json(group);
});

const setGroup = asyncHandler(async (req, res) => {
  if (
    !req.body.groupName ||
    !req.body.locationMeetUp ||
    !req.body.locationDestination ||
    !req.body.description ||
    !req.body.timeMeetup ||
    !req.body.timeGroupDeparture
  ) {
    res.status(400).json({ message: `Missing Detail` });
  }
  console.log(req.body);

  const group = await Group.create({
    groupName: req.body.groupName,
    locationMeetUp: req.body.locationMeetUp,
    locationDestination: req.body.locationDestination,
    description: req.body.locationDestination,
    timeMeetup: req.body.timeMeetup,
    timeGroupDeparture: req.body.timeGroupDeparture,
    user: req.user.id,
    members: req.user.name,
  });
  console.log("asdasd" + group);
  res.status(200).json(group);
});

const updateGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) {
    res.status(400);
    throw new Error(`Group not found`);
  }

  const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGroup);

});

const addGroupMember = asyncHandler(async (req, res) => {
  
  const group = await Group.findById(req.params.id);
  if (!group) {
    res.status(400);
    throw new Error(`Group not found`);
  }

  console.log(req.body.members)
  console.log('hello')
  const updatedGroup = await Group.findByIdAndUpdate(req.params.id, { $push: { members: req.body.members } } , {
    new: true,
  });
  res.status(200).json(updatedGroup);

});

const removeGroupMember = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) {
    res.status(400);
    throw new Error(`Group not found`);
  }

  const updatedGroup = await Group.findByIdAndUpdate(req.params.id, { $pull: { members: req.body.members } }, {
    new: true,
  });
  res.status(200).json(updatedGroup);

});

const deleteGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) {
    res.status(400);
    throw new Error(`Group not found`);
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error(`No such user found`);
  }

  if (group.user.toString() !== user.id) {
    res.status(401);
    throw new Error(`User is not authorized to delete`);
  }

  await Group.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGroup, setGroup, updateGroup, deleteGroup, getGroups, getAllGroups, addGroupMember, removeGroupMember };
