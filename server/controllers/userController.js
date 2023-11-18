import SignIn from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const googleSignin = async (req, res) => {
  const { uid, displayName, email, photoURL } = req.body;

  const oldUser = await SignIn.findOne({ email });

  if (oldUser) {
    return res.status(200).json(oldUser);
  }

  try {
    const newUser = new SignIn({ uid, displayName, email, photoURL });
    await newUser.save();

    const { _id } = newUser;

    const token = jwt.sign({ _id }, process.env.Secret_Key);
    newUser.jwtToken = token;

    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const verifyToken = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json("Error while verifying token", error);
  }
};
