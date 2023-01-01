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
    const users = await User.findByName("ngimfack").populate("bestFriend");

    const users2 = await User.find().byName("temfack");

    console.log({ users });
    console.log({ users2 });
    users[0].sayHi();
  } catch (err) {
    console.log({ errorMessage: err.message });
  }
}
