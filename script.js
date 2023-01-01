import mongoose from "mongoose";
import User from "./schemas/user.js";

mongoose.set("strictQuery", true);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/nodejs-learn-mongoose");

  await run();
}

async function run() {
  const USER_DATA = {
    name: "temfack",
    age: 25,
    email: "temfack@gmail.com",
    phone: "111-222-3338",
    hobbies: ["basket", "mangas"],
    address: {
      street: "bonas",
      city: "yaoundé",
    },
    profession: {
      name: "fooballer",
      salary: 10000000,
    },
  };

  try {
    // const user = await User.create({
    //   name: "danfack",
    //   email: "danilix@gmail.com",
    //   phone: "000-222-0000",
    // });

    const user = await User.findOne({ name: "danfack" });

    user.hobbies = ["dance", "mangas"];

    await user.save();

    console.log({ user });
  } catch (err) {
    console.log({ errorMessage: err.message });
  }
}
