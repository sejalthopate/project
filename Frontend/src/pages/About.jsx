import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import illustration from "../assets/5.png"; // Make sure 4.png matches the illustration in your design
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-black text-white px-6 py-12 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
        
        {/* Illustration */}
        <div className="flex-1 flex justify-center">
          <img
            src={illustration}
            alt="System Illustration"
            className="w-[300px] sm:w-[400px] drop-shadow-xl"
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-extrabold mb-4 text-purple-200">About Our Attendance System</h2>
          <p className="text-md text-purple-100 mb-8 leading-relaxed">
            Our Online Attendance System is designed to simplify and streamline the attendance management
            process for educational institutions. It provides separate dashboards and functionality for 
            students, teachers, and administrators.
          </p>

          <div className="space-y-4">
            <div className="bg-purple-700/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 shadow-md hover:scale-[1.02] transition">
              <FaUserGraduate className="text-2xl text-blue-300" />
              <div>
                <p className="font-semibold text-purple-100">Student Role</p>
                <p className="text-sm text-purple-300">
                  Students can view their schedule, mark attendance (if allowed), and see their attendance history.
                </p>
              </div>
            </div>

            <div className="bg-purple-700/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 shadow-md hover:scale-[1.02] transition">
              <FaChalkboardTeacher className="text-2xl text-yellow-300" />
              <div>
                <p className="font-semibold text-purple-100">Teacher Role</p>
                <p className="text-sm text-purple-300">
                  Teachers can take attendance, schedule classes, and manage student data per batch and subject.
                </p>
              </div>
            </div>

            <div className="bg-purple-700/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 shadow-md hover:scale-[1.02] transition">
              <FaUserShield className="text-2xl text-green-300" />
              <div>
                <p className="font-semibold text-purple-100">Admin Role</p>
                <p className="text-sm text-purple-300">
                  Admins can assign subjects, create batches, manage user access, and monitor the overall system.
                </p>
              </div>
            </div>
          </div>

          {/* <button
            onClick={() => navigate("/")}
            className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition"
          >
            Get Started
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default About;
