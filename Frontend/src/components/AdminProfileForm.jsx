import React, { useState } from "react";
import { updateAdminProfile } from "../services/AdminProfileApi";
import { toast } from "react-toastify";

const AdminProfileForm = ({ profile, setProfile, setEditing }) => {
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateAdminProfile(formData);
      toast.success("Profile updated successfully");
      setProfile(updated.admin);   // backend कडून येणारा object
      setEditing(false);
    } catch (err) {
      toast.error("Save failed: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label>Name</label>
        <input
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          type="email"
          required
        />
      </div>
      <div>
        <label>College</label>
        <input
          name="college"
          value={formData.college || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label>Role</label>
        <input
          name="role"
          value={formData.role || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdminProfileForm;
