import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../middleware/email_send.js";
import { User } from "../models/user.js";
import schedule from "node-schedule";
import sendVerificationEmail from "../services/email_service.js";
import { Store } from "../models/store.js";
import { getDistance } from "geolib";

export const userSignup = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    role,
    image,
    registration_method,
  } = req.body;

  if (!name || !email || !password || !phone || !address) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(400).json({ error: `Something went wrong: ${error.message}` });
  }
};

export const userEmailUpdate = async (req, res) => {
  const { new_email, _id } = req.body;
  if (!_id) {
    return res.status(400).json({ error: "User id is required" });
  }
  if (!new_email) {
    return res.status(400).json({ error: "Please fill the email" });
  }
  try {
    let userCheck = await User.find({ email: new_email });
    if (userCheck.length > 0) {
      return res.status(400).json({ error: "Email already exist" });
    }
    function generateActivationCode() {
      const min = 1000;
      const max = 9999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const activationCode = generateActivationCode();
    await sendMail(
      new_email,
      "Email Verification Code ",
      `<h2>Code :</h2>
    ${activationCode} `
    );
    await User.findByIdAndUpdate(_id, {
      verification_code: activationCode,
      temp_email: new_email,
    });
    res.status(200).json({ message: "please veirfy your email" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const userVerify = async (req, res) => {
  const { verification_code, _id, emailChange } = req.body;
  if (!_id) {
    return res.status(400).json({ error: "user id is required" });
  }
  if (!verification_code) {
    return res.status(400).json({ error: "please fill the code" });
  }
  try {
    let userCheck = await User.findById(_id);
    if (userCheck.verification_code !== verification_code) {
      return res.status(400).json({ error: "please enter valid code" });
    }
    if (emailChange) {
      await User.findByIdAndUpdate(_id, {
        verification_code: null,
        temp_email: undefined,
        email: userCheck.temp_email,
      });
    } else {
      await User.findByIdAndUpdate(_id, {
        verification_code: null,
        email_verified: true,
      });
    }
    res.status(200).json({ message: "verified email successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const userLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please add email or password" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(400).json({ error: "Invalid Email or Password " });
      }
      bcrypt.compare(password, savedUser.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET
          );
          savedUser.password = undefined;
          res.json({ message: "Successfull Login", token, user: savedUser });
        } else {
          return res.status(400).json({ error: "Invalid Email or Password" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const userUpdate = async (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;
  let passwordUpdate = false;
  let newPassword;
  if (password) {
    passwordUpdate = true;
    newPassword = await bcrypt.hash(password, 12);
  }
  try {
    const updateData = passwordUpdate
      ? { ...req.body, password: newPassword }
      : req.body;
    const response = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    res.status(200).json({ message: "updated successfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const userPassUpdate = async (req, res) => {
  const { currPassword, newPassword, _id } = req.body;
  if (!currPassword || !newPassword || !_id) {
    return res.status(400).json({ error: "please fill all fields" });
  }
  try {
    let userData = await User.findById({ _id });

    if (!userData) {
      return res.status(400).json({ error: "user not found" });
    }
    const isPasswordMatch = await bcrypt.compare(
      currPassword,
      userData.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "current password not match" });
    }
    let hashedpassword = await bcrypt.hash(newPassword, 12);
    const updateData = { password: hashedpassword };
    await User.findByIdAndUpdate(_id, updateData);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const userGet = async (req, res) => {
  let filter = { status: "user" };
  if (req.query._id) {
    filter._id = req.query._id.split(",");
  }
  try {
    let result = await User.find(filter).select("-password");
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ message: "something went wrong!" });
  }
};

export const userGetbyId = async (req, res) => {
  let filter = { isActive: true };
  if (req.query._id) {
    filter._id = req.query._id.split(",");
  }
  try {
    let result = await User.findById(filter).select("-password");
    res.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "something went wrong!" });
  }
};

//   forgot password

export const forgotPass = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "please enter email" });
  }
  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ error: "email not found" });
    }

    function generateActivationCode() {
      const min = 1000;
      const max = 9999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const activationCode = generateActivationCode();
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3);

    schedule.scheduleJob(time, function () {
      sendVerificationEmail(email, activationCode);
    });

    let _id = userData._id;
    await User.findByIdAndUpdate(_id, { resetCode: activationCode });
    userData.password = undefined;
    res
      .status(200)
      .json({ message: "code send to your email", user: userData });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

// verify forgot code

export const verifyForgotcode = async (req, res) => {
  const { resetCode, _id } = req.body;
  if (!_id) {
    return res.status(400).json({ error: "user id is required" });
  }
  if (!resetCode) {
    return res.status(400).json({ error: "please fill the code" });
  }
  try {
    let userCheck = await User.findById(_id);
    if (userCheck.resetCode !== resetCode) {
      return res.status(400).json({ error: "please enter valid code" });
    }
    await User.findByIdAndUpdate(_id, { resetCode: null });
    userCheck.password = undefined;
    res
      .status(200)
      .json({ message: "Please enter your new password", user: userCheck });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const addRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const restaurantId = req.user._id;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Invalid rating value" });
    }
    const supplierId = req.params.supplierId;
    const supplier = await User.findById(supplierId);

    if (!supplier || supplier.role !== "supplier") {
      return res.status(404).json({ error: "Supplier not found" });
    }
    supplier.ratings.push({ byUser: restaurantId, rating });
    await supplier.save();
    res.json({ message: "Rating added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const averageRating = async (req, res) => {
  const id = req.params.id;
  try {
    const supplier = await User.findById(id);

    if (!supplier || supplier.role !== "supplier") {
      return res.status(404).json({ error: "Supplier not found" });
    }

    const ratings = supplier.ratings.map((r) => r.rating);
    const averageRating =
      ratings.length > 0
        ? (
            ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          ).toFixed(1)
        : 0;

    res.json({ averageRating, numberOfRatings: ratings.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const userSearch = async (req, res) => {
  try {
    const name = req.query.name;
    const role = req.query.role;
    const query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }
    if (role) {
      query.role = role;
    }
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const nearbySuppliers = async (req, res) => {
  const user = req.user;
  const ADDRESS_RANGE = 10000;
  try {
    let result = await User.find({
      role: "supplier",
      is_active: true,
      is_approved: true,
    });
    const usersWithinRange = result.filter((pUser) => {
      const distance = getDistance(
        {
          latitude: parseFloat(user.location.latitude),
          longitude: parseFloat(user.location.longitude),
        },
        {
          latitude: parseFloat(pUser.location.latitude),
          longitude: parseFloat(pUser.location.longitude),
        }
      );
      return distance <= ADDRESS_RANGE;
    });
    res.json(usersWithinRange);
  } catch (error) {
    res.status(400).json({ message: "something went wrong!" });
  }
};
