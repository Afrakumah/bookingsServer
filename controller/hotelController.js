import express from "express";
import hotelModel from "../models/hotelModel.js";
import { createError } from "../utils/error.js";


const postHotel = async (req, res, next) => {
  const newHotel = new hotelModel(req.body);

  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (err) {
    // res.status(500).json(err)
    next(err);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await hotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (updatedHotel) {
      res.status(200).json(updatedHotel);
    }
  } catch (err) {
    next(err);
  }
};

const deletehotel = async (req, res, next) => {
  try {
    await hotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel deleted successfully");
  } catch (err) {
    next(err);
  }
};

const onehotel = async (req, res, next) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const gethotels = async (req, res, next) => {
  //     const failed = true;
  //  if(failed) return next(createError(401, "You're not authenticated!"))

  try {
    const hotels = await hotelModel.find();
    //generating error----errorhandler
    // const hotels = await hotelModel.findById('1122')
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',')
  try {
    const list = await Promise.all(cities.map(city => {
      // return hotelModel.find({city: city}).length or shows count
      return hotelModel.countDocuments({city: city})
    
    }));
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const countByType = async (req, res, next) => {
  
  try {
    const hotelCount = await hotelModel.countDocuments({type:"hotel"})
    const apartmentCount = await hotelModel.countDocuments({type:"apartment"})
    const resortCount = await hotelModel.countDocuments({type:"resort"})
    const villaCount = await hotelModel.countDocuments({type:"villa"})
    const cabinCount = await hotelModel.countDocuments({type:"cabin"})
    
    res.status(200).json([
      { type: "hotel", count: hotelCount},
      { type: "apartments", count: apartmentCount},
      { type: "resorts", count: resortCount},
      { type: "villas", count: villaCount},
      { type: "cabin", count: cabinCount},

    ]);
  } catch (err) {
    next(err);
  }
};

export default {
  postHotel,
  updateHotel,
  deletehotel,
  onehotel,
  gethotels,
  countByCity,
  countByType
};
