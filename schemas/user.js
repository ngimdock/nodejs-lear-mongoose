import mongoose, { model, Schema } from "mongoose";

const professionSchema = new Schema({
  name: String,
  salary: Number,
});

const userSchema = new Schema({
  name: {
    type: String,
    minLength: 5,
    validate: {
      validator: (value) => value.endsWith("fack"),
      message: (props) => `${props.value} is not a name for Dschang people.`,
    },
  },
  age: {
    type: Number,
    min: 1,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  hobbies: [String],
  address: {
    street: String,
    city: String,
  },
  profession: professionSchema,
});

userSchema.methods.sayHi = function () {
  console.log(`Hi my name is ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

const User = model("User", userSchema);

export default User;
