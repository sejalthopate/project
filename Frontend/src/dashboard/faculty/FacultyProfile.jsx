




import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Edit,
  Save,
  UploadCloud,
} from "lucide-react";
import {
  getFacultyProfile,
  updateFacultyProfile,
  uploadFacultyProfileImage,
} from "../../services/facultyProfileApi";

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFacultyProfile(userId);
      setFaculty(data);
      setFormData(data);
    };
    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const updatedData = await updateFacultyProfile(userId, formData);
    if (updatedData) {
      setFaculty(updatedData);
      setEditing(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const updated = await uploadFacultyProfileImage(userId, file);
    if (updated) {
      setFaculty((prev) => ({ ...prev, profileImage: updated.profileImage }));
    }
  };

  if (!faculty) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 bg-gradient-to-br from-purple-900 h-screen bg-slate-900 h-130 via-[#1e1b4b] to-gray-900 text-white pb-85  ">
      <h2 className="text-3xl font-bold text-purple-400 mb-6">Faculty Profile</h2>

      <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg h-50 max-w-3xl mx-auto flex flex-col md:flex-row gap-6 items-center">
        <div className="relative">
          <img
            src={
              faculty.profileImage
                ? `http://localhost:5000/uploads/${faculty.profileImage}`
                : "/default-profile.png"
            }
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-purple-500"
          />
          <label className="absolute bottom-0 right-0 cursor-pointer bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition">
            <UploadCloud size={18} />
            <input type="file" hidden onChange={handleImageUpload} />
          </label>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            {editing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-slate-800 p-2 rounded text-white w-full"
              />
            ) : (
              <>
                <h3 className="text-2xl font-semibold">{faculty.name}</h3>
                <span className="text-sm bg-purple-600 text-white px-3 py-1 rounded-full">{faculty.role}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <Mail size={18} />
            {editing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-slate-800 p-2 rounded text-white w-full"
              />
            ) : (
              <span>{faculty.email}</span>
            )}
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <Phone size={18} />
            {editing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-slate-800 p-2 rounded text-white w-full"
              />
            ) : (
              <span>{faculty.phone}</span>
            )}
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <Briefcase size={18} />
            <span>{faculty.department}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <Calendar size={18} />
            <span>Joined on {new Date(faculty.createdAt).toDateString()}</span>
          </div>

          <button
            onClick={editing ? handleSave : () => setEditing(true)}
            className="mt-4 inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
          >
            {editing ? <Save size={18} /> : <Edit size={18} />}
            {editing ? "Save" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;

