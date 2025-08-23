import React from "react";

const StudentProfile = () => {
  const student = {
    userId: "UID202507",
    name: "Srushti Bhagwan Pingale",
    gender: "Female",
    email: "srushti@example.com",
    rollNo: "STU2025002",
    course: "B.Sc Computer Science",
    semester: "6th Semester",
    year: "Third Year",
    department: "Computer Science",
    batch: "2022-2025",
    phone: "9876543210",
    dob: "2003-08-20",
    address: "Pune, Maharashtra",
    profilePic: "", // Leave this blank to test default
  };

  const defaultPic = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white flex justify-center items-start">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg rounded-xl max-w-3xl w-full px-6 py-8 text-gray-900">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={student.profilePic || defaultPic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-white shadow-md object-cover"
          />
          <h2 className="text-2xl font-semibold mt-3">{student.name}</h2>
          <p className="text-sm text-gray-300">{student.email}</p>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProfileField label="User ID" value={student.userId} />
          <ProfileField label="Roll Number" value={student.rollNo} />
          <ProfileField label="Gender" value={student.gender} />
          <ProfileField label="Phone" value={student.phone} />
          <ProfileField label="Course" value={student.course} />
          <ProfileField label="Semester" value={student.semester} />
          <ProfileField label="Year" value={student.year} />
          <ProfileField label="Department" value={student.department} />
          <ProfileField label="Batch" value={student.batch} />
          <ProfileField label="Date of Birth" value={student.dob} />
          <ProfileField label="Address" value={student.address} />
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="bg-white/30 backdrop-blur-sm p-3 rounded-lg shadow-sm">
    <p className="text-xs text-gray-300">{label}</p>
    <p className="text-sm font-medium text-gray-100">{value}</p>
  </div>
);

export default StudentProfile;
