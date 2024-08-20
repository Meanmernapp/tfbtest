import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: false,
    enum: ["admin", "general"],
    default: "general",
  },
  vote_history: [
    {
      song_id: {
        type: String,
      },
      voted_on: {
        type: Date,
      },
      song_name: {
        type: String,
      },
    },
  ],
  shopify_id: String,
  gender: String,
  city: String,
  age: String,
  phoneNumber: String,
  countryCode: String,
  password: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
