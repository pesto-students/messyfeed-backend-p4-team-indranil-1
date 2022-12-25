import Mess from "../models/Mess.js";

export const addMess = async (req, res, next) => {
  const newMess = new Mess({ userId: req.user.id, ...req.body });
  try {
    const savedMess = await newMess.save();
    res.status(200).json(savedMess);
  } catch (err) {
    next(err);
  }
};
