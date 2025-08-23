// // import mongoose from "mongoose";

// // const manageFacultySchema = new mongoose.Schema({
// //   user: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "User",
// //     required: true,
// //   },
// //   name: {
// //     type: String,
// //     required: true,
// //     unique:true
// //   },
// //   employeeId: {
// //     type: String,
// //     required: true,
// //     unique:true
// //   },
// //   department: {
// //     type: String,
// //     required: true,
// //   },
// //   qualifications: {
// //     type: String,
// //     required: true,
// //   },
// //   yearsOfExperience: {
// //     type: Number,
// //     required: true,
// //   },
// //  phone: {
// //     type: String,
// //     required: true,
// //     match: /^[6-9]\d{9}$/,
// //     unique:true
// //   },
// //   dob: {
// //     type: Date,
// //     required: true,
// //   },
// //   gender: {
// //     type: String,
// //     required: true,
// //   },
// //   address: {
// //     type: String,
// //     required: true,
// //   },
// // });

// // export const manageFacultyModel = mongoose.model("manageFacultyModel", manageFacultySchema);



// import mongoose from "mongoose";

// const manageFacultySchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   employeeId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   department: {
//     type: String,
//     required: true,
//   },
//   qualifications: {
//     type: String,
//     required: true,
//   },
//   yearsOfExperience: {
//     type: Number,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//     match: /^[6-9]\d{9}$/, // only 10-digit valid Indian phone
//     unique: true,
//   },
//   dob: {
//     type: Date,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },

//   // 👇 नवीन field facultyEmail
//   facultyEmail: {
//     type: String,
//     required: true,
//     unique: true,
//     match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic email validation
//   },
// }, { timestamps: true });

// export const manageFacultyModel = mongoose.model("manageFacultyModel", manageFacultySchema);


import mongoose from "mongoose";

const manageFacultySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  qualifications: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  phone: { type: String, required: true, unique: true, match: /^[6-9]\d{9}$/ },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  facultyEmail: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
}, { timestamps: true });

export const manageFacultyModel = mongoose.model("manageFacultyModel", manageFacultySchema);
