import Room from "../models/roomModel.js";
import hotelModel from "../models/hotelModel.js";
import { createError } from "../utils/error.js";
//importing hotelmodel bcos in that model we have rooms which is type string

export const postRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newroom = new Room(req.body);

  try {
    const savedroom = await newroom.save();

    try {
      await hotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedroom._id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json(savedroom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const roomupdate = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (roomupdate) {
      res.status(200).json(roomupdate);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  
  try {
    await Room.findByIdAndDelete(req.params.id);

    try {
      await hotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("room deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const getoneroom = async (req, res, next) => {
  try {
    const getroom = await Room.findById(req.params.id);
    if (getroom) return res.status(200).json(getroom);
    else {
      return res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    next(err);
    //    console.error('Error fetching room:', err.message);
    //    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    if (rooms) {
      res.status(200).json(rooms);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  postRoom,
  updateRoom,
  deleteRoom,
  getoneroom,
  getRooms,
};
