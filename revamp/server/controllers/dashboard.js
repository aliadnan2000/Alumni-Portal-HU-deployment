import mongoose from "mongoose";
import express from "express";
import User from "../models/user.js";

export const get = async (req, res) => {
    try {
        const usersList = await User.find().select('-password');
        res.status(200).json(usersList);
  } catch (error) {
        res.status(404).json({ message: error.message });
  }
};
