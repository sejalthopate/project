import React from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building2,
  Venus,
} from "lucide-react";

const AdminProfile = () => {
  const profile = {
    name: "GPA",
    email: "gpa@gmail.com",
    contact: "1234567890",
    DOB : "11 April 2008",
    address: "GPA ,Dis:Pune Tal:Ambegoan",
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <div className="overflow-auto rounded-xl h-100 border border-white/20 mt-30 ml-40 bg-purple-100/10 justify-center w-180 backdrop-blur-md shadow-lg">
        <div className="text-center justify-center mb-6">
          <User className="w-16 pt-6 h-16 mx-auto text-white" />
          <h2 className="text-3xl font-bold  mt-2 text-white ">My Profile</h2>
          <p className="text-white/80">{profile.email}</p>
        </div>

        <div className="space-y-4 text-white">
          <div className="flex items-center gap-3">
            <Mail className="text-white ml-5 w-5 h-5" />
            <span>
              <strong>Email:</strong> {profile.email}
            </span>
          </div>
          <div className="flex items-center  gap-3">
            <Phone className="text-white w-5  ml-5 h-5" />
            <span>
              <strong>Contact:</strong> {profile.contact}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="text-white ml-5 w-5 h-5" />
            <span>
              <strong>Date Of Establish :</strong> {profile.DOB}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-white ml-5  w-5 h-5" />
            <span>
              <strong>Address:</strong> {profile.address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;