import React, { useState, useEffect } from "react";
import { getAllClasses, addClass, deleteClass, updateClass } from "../../services/ManageClassApi";
import ManageClassForm from "../../components/ManageClassForm";

const ManageClassFaculty = () => {
  const [showForm, setShowForm] = useState(false);
  const [classList, setClassList] = useState([]);
  const [editingClass, setEditingClass] = useState(null);

  const currentUserRole = localStorage.getItem("role");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const res = await getAllClasses();
    if (res) setClassList(res);
  };

  const handleAddOrUpdateClass = async (data) => {
    try {
      if (editingClass) {
        await updateClass(editingClass._id, data);
        setEditingClass(null);
      } else {
        await addClass(data);
      }
      fetchClasses();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving class:", error);
      alert(error.response?.data?.message || "Failed to save class");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this class?")) {
      await deleteClass(id);
      fetchClasses();
    }
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 pb-85 h-250 text-white">
      <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingNotice(null);
            setTitle("");
            setContent("");
            setVisibleTo("student");
          }}
          className="bg-gradient-to-r from-violet-600 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
        >
          {showForm ? "Cancel" : "➕ Add Class"}
        </button>

      {showForm && (
        <ManageClassForm
          onSubmit={handleAddOrUpdateClass}
          initialData={editingClass}
          setEditMode={setEditingClass}
          setSelectedClass={setEditingClass}
        />
      )}

       <h2 className="text-3xl  text-center mb-7 font-bold mb-2">Class List</h2>
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
       
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr className="p-3 border border-white/10">
              <th className="p-3 border border-white/10">Dept</th>
              <th className="p-3 border border-white/10">Sem</th>
              
              <th className="p-3 border border-white/10">Date</th>
              <th className="p-3 border border-white/10">Day</th>
              <th className="p-3 border border-white/10">Time</th>
              <th className="p-3 border border-white/10">Prev Lecture</th>
              <th className="p-3 border border-white/10">Prev Staff</th>
              <th className="p-3 border border-white/10">Lecture</th>
              <th className="p-3 border border-white/10">Staff</th>
              {currentUserRole === "faculty" && <th className="border px-2 py-1">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {classList.map((cls) => (
              <tr key={cls._id}>
                <td className="p-3 border border-white/10">{cls.department}</td>
                <td className="p-3 border border-white/10">{cls.semester}</td>
           
                <td className="p-3 border border-white/10">{cls.date}</td>
                <td className="p-3 border border-white/10">{cls.day}</td>
                     <td className="p-3 border border-white/10">{cls.time}</td>
                <td className="p-3 border border-white/10">{cls.previousLecture}</td>
                <td className="p-3 border border-white/10">{cls.previousStaff}</td>
                <td className="p-3 border border-white/10">{cls.manageLecture}</td>
                <td className="p-3 border border-white/10">{cls.manageStaff}</td>
                {currentUserRole === "faculty" && (
                  <td className="p-3 border border-white/10">
                    <div className="flex justify-center gap-4">
                      <button onClick={() => handleDelete(cls._id)} className="text-red-600 hover:text-red-800 text-xl">🗑</button>
                      <button onClick={() => handleEdit(cls)} className="text-blue-600 hover:text-blue-800 text-xl">✏</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {classList.length === 0 && (
              <tr>
                <td colSpan={currentUserRole === "faculty" ? 10 : 9} className="text-center py-4">
                  No Classes Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClassFaculty;