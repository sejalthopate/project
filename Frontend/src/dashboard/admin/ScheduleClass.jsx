// src/dashboard/admin/ScheduleClass.jsx
import React, { useState, useEffect } from "react";
import {
  getFacultySchedules,
  addFacultySchedule,
  updateFacultySchedule,
  deleteFacultySchedule,
} from "../../services/ScheduleClassApi";
//import { addStudentSchedule}from"../../services/ScheduleAPI";

const departments = ['Computer', 'Electrical', 'Civil', 'Mechanical', 'IT', 'Automobile', 'E&TC'];
const years = ['FY', 'SY', 'TY'];
const views = ['Student', 'Faculty'];

const timeSlots = [
  "9:00–10:00",
  "10:00–11:00",
  "11:10–11:45", // Lunch
  "11:45–1:45",
  "1:45–1:55",   // Short break
  "1:55–2:55",
  "2:55–3:55",
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const generateInitialData = () =>
  views.reduce((viewAcc, view) => {
    viewAcc[view] = departments.reduce((deptAcc, dept) => {
      deptAcc[dept] = years.reduce((yearAcc, year) => {
        yearAcc[year] = days.reduce((dayAcc, day) => {
          dayAcc[day] = {};
          return dayAcc;
        }, {});
        return yearAcc;
      }, {});
      return deptAcc;
    }, {});
    return viewAcc;
  }, {});

export default function ScheduleClass({ isEditable = true }) {
  // Shared (student)
  const [selectedView, setSelectedView] = useState('Student');
  const [selectedDept, setSelectedDept] = useState('Computer');
  const [selectedYear, setSelectedYear] = useState('SY');

  const [currentTimetables, setCurrentTimetables] = useState(generateInitialData());
  const [dynamicTeachers, setDynamicTeachers] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);

  // Faculty
  const [facultyData, setFacultyData] = useState([]);
  const [showFacultyFormModal, setShowFacultyFormModal] = useState(false);
  const [facultyForm, setFacultyForm] = useState({
    facultyName: "",
    subject: "",
    day: "",
    date: "",
    time: "",
    sem: "",
    year: "",
    department: "",
  });
  const [editingFacultyId, setEditingFacultyId] = useState(null); // _id if backend, or local id

  // Load on mount
  useEffect(() => {
    // load student timetables & teachers from localStorage
    try {
      const storedStudent = JSON.parse(localStorage.getItem('student_timetables'));
      const storedFacultyTimetable = JSON.parse(localStorage.getItem('faculty_timetables')); // old format if used
      const storedTeachers = JSON.parse(localStorage.getItem('teachers'));

      setCurrentTimetables({
        Student: storedStudent && typeof storedStudent === 'object' ? storedStudent : generateInitialData().Student,
        Faculty: storedFacultyTimetable && typeof storedFacultyTimetable === 'object' ? storedFacultyTimetable : generateInitialData().Faculty,
      });

      if (Array.isArray(storedTeachers)) setDynamicTeachers(storedTeachers);
    } catch (err) {
      setCurrentTimetables(generateInitialData());
      setDynamicTeachers([]);
    }

    // load faculty schedules from backend; fallback to localStorage
    (async () => {
      try {
        const res = await getFacultySchedules();
        // Some APIs return data directly, some wrap: handle both
        const arr = Array.isArray(res) ? res : (res?.data ? res.data : []);
        if (Array.isArray(arr) && arr.length > 0) {
          setFacultyData(arr);
          localStorage.setItem('faculty_schedules', JSON.stringify(arr));
        } else {
          const local = JSON.parse(localStorage.getItem('faculty_schedules'));
          if (Array.isArray(local)) setFacultyData(local);
        }
      } catch (err) {
        const local = JSON.parse(localStorage.getItem('faculty_schedules'));
        if (Array.isArray(local)) setFacultyData(local);
      }
    })();
  }, []);

  // Helpers for student timetable (same logic as original)
  const timetable = currentTimetables[selectedView]?.[selectedDept]?.[selectedYear] || {};

  const handleAddScheduleClick = () => {
    setEditData(null);
    setShowAddScheduleModal(true);
  };

  const handleModalClose = () => {
    setEditData(null);
    setShowAddScheduleModal(false);
  };

  const handleSaveSchedule = ({ day, time, subject, teacher }) => {
    const updatedTimetables = JSON.parse(JSON.stringify(currentTimetables));
    if (!updatedTimetables[selectedView]) updatedTimetables[selectedView] = {};
    if (!updatedTimetables[selectedView][selectedDept]) updatedTimetables[selectedView][selectedDept] = {};
    if (!updatedTimetables[selectedView][selectedDept][selectedYear]) updatedTimetables[selectedView][selectedDept][selectedYear] = {};
    if (!updatedTimetables[selectedView][selectedDept][selectedYear][day]) updatedTimetables[selectedView][selectedDept][selectedYear][day] = {};

    updatedTimetables[selectedView][selectedDept][selectedYear][day][time] = { subject, teacher };
    setCurrentTimetables(updatedTimetables);

    const key = selectedView === 'Student' ? 'student_timetables' : 'faculty_timetables';
    localStorage.setItem(key, JSON.stringify(updatedTimetables[selectedView]));

    if (teacher && !dynamicTeachers.includes(teacher)) {
      const updatedTeachers = [...dynamicTeachers, teacher].sort();
      setDynamicTeachers(updatedTeachers);
      localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
    }

    alert(editData ? 'Schedule updated!' : 'Schedule added successfully!');
    handleModalClose();
  };

  const handleDelete = (day, time) => {
    const updatedTimetables = JSON.parse(JSON.stringify(currentTimetables));
    if (updatedTimetables[selectedView] &&
      updatedTimetables[selectedView][selectedDept] &&
      updatedTimetables[selectedView][selectedDept][selectedYear] &&
      updatedTimetables[selectedView][selectedDept][selectedYear][day]) {
      delete updatedTimetables[selectedView][selectedDept][selectedYear][day][time];
      setCurrentTimetables(updatedTimetables);
      const key = selectedView === 'Student' ? 'student_timetables' : 'faculty_timetables';
      localStorage.setItem(key, JSON.stringify(updatedTimetables[selectedView]));
      alert("Schedule deleted successfully!");
    }
  };

  const handleEdit = (day, time, subject, teacher) => {
    setEditData({ day, time, subject, teacher });
    setShowAddScheduleModal(true);
  };

  const formatCell = (subject, teacher) => subject + (teacher ? ` - ${teacher}` : '');

  // Faculty handlers (create, edit, delete)
  const openFacultyForm = (f = null) => {
    if (f) {
      // editing existing: fill form
      setFacultyForm({
        facultyName: f.facultyName || "",
        subject: f.subject || "",
        day: f.day || "",
        date: f.date || "",
        time: f.time || "",
        sem: f.sem || f.semester || "",
        year: f.year || "",
        department: f.department || "",
      });
      setEditingFacultyId(f._id || f.id || null);
    } else {
      // new
      setFacultyForm({
        facultyName: "",
        subject: "",
        day: "",
        date: "",
        time: "",
        sem: "",
        year: "",
        department: "",
      });
      setEditingFacultyId(null);
    }
    setShowFacultyFormModal(true);
  };

  const closeFacultyForm = () => {
    setShowFacultyFormModal(false);
    setFacultyForm({
      facultyName: "",
      subject: "",
      day: "",
      date: "",
      time: "",
      sem: "",
      year: "",
      department: "",
    });
    setEditingFacultyId(null);
  };

  const handleFacultyInputChange = (e) => {
    const { name, value } = e.target;
    setFacultyForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFacultySave = async (e) => {
    e.preventDefault();
    const required = ['facultyName', 'subject', 'day', 'date', 'time', 'sem', 'year', 'department'];
    for (let f of required) {
      if (!facultyForm[f]) {
        alert("Please fill all fields.");
        return;
      }
    }

    // local fallback: create an id if not present
    const makeLocalId = () => `local-${Date.now()}`;


    if (editingFacultyId) {
      // try update via backend
      try {
        await updateFacultySchedule(editingFacultyId, {
          facultyName: facultyForm.facultyName,
          subject: facultyForm.subject,
          day: facultyForm.day,
          date: facultyForm.date,
          time: facultyForm.time,
          sem: facultyForm.sem,
          year: facultyForm.year,
          department: facultyForm.department,
        });
        // refresh from backend
        const res = await getFacultySchedules();
        const arr = Array.isArray(res) ? res : (res?.data || []);
        setFacultyData(arr);
        localStorage.setItem('faculty_schedules', JSON.stringify(arr));
      } catch (err) {
        // fallback: update locally
        const updated = facultyData.map(fd => {
          const id = fd._id || fd.id;
          if (id === editingFacultyId) {
            return { ...fd, ...facultyForm, _id: id };
          }
          return fd;
        });
        setFacultyData(updated);
        localStorage.setItem('faculty_schedules', JSON.stringify(updated));
      }
    } else {
      // new entry: try backend post; else local push
      try {
        const res = await addFacultySchedule({
          facultyName: facultyForm.facultyName,
          subject: facultyForm.subject,
          day: facultyForm.day,
          date: facultyForm.date,
          time: facultyForm.time,
          sem: facultyForm.sem,
          year: facultyForm.year,
          department: facultyForm.department,
        });
        // If API returned saved object or confirmation, re-fetch to keep sync
        const fetched = await getFacultySchedules();
        const arr = Array.isArray(fetched) ? fetched : (fetched?.data || []);
        if (Array.isArray(arr) && arr.length > 0) {
          setFacultyData(arr);
          localStorage.setItem('faculty_schedules', JSON.stringify(arr));
        } else {
          // API responded but returned one object
          const newObj = (res && (res.data || res)) ? (res.data || res) : { ...facultyForm, _id: makeLocalId() };
          const updated = [...facultyData, newObj];
          setFacultyData(updated);
          localStorage.setItem('faculty_schedules', JSON.stringify(updated));
        }
      } catch (err) {
        // local fallback
        const newObj = { ...facultyForm, _id: makeLocalId() };
        const updated = [...facultyData, newObj];
        setFacultyData(updated);
        localStorage.setItem('faculty_schedules', JSON.stringify(updated));
      }
    }

    closeFacultyForm();
    alert(editingFacultyId ? "Faculty schedule updated." : "Faculty schedule added.");
  };

  const handleFacultyEditClick = (f) => {
    openFacultyForm(f);
  };

  const handleFacultyDelete = async (id) => {
    if (!window.confirm("Delete this faculty schedule?")) return;
    // try backend delete
    try {
      await deleteFacultySchedule(id);
      const re = await getFacultySchedules();
      const arr = Array.isArray(re) ? re : (re?.data || []);
      if (Array.isArray(arr)) {
        setFacultyData(arr);
        localStorage.setItem('faculty_schedules', JSON.stringify(arr));
      } else {
        // fallback remove local
        const filtered = facultyData.filter(fd => (fd._id || fd.id) !== id);
        setFacultyData(filtered);
        localStorage.setItem('faculty_schedules', JSON.stringify(filtered));
      }
    } catch (err) {
      // fallback: remove locally
      const filtered = facultyData.filter(fd => (fd._id || fd.id) !== id);
      setFacultyData(filtered);
      localStorage.setItem('faculty_schedules', JSON.stringify(filtered));
    }
  };

  // Render
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">📅 Diploma Timetable</h1>

      {/* View buttons */}
      <div className="flex gap-3 mb-4 ">
        {views.map(v => (
          <button
            key={v}
            onClick={() => setSelectedView(v)}
            className={`px-4 py-2 rounded-lg  bg-gradient-to-r from-violet-400 to-purple-500 hover:scale-105 flex justify-end 
              transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg shadow ${selectedView === v ? 'bg-blue-600 text-white' : 'bg-slate-600 text-gray-300'}`}
          >
            {v} View
          </button>
        ))}
      </div>

      {/* STUDENT VIEW */}
      {selectedView === 'Student' && (
        <>
          <div className="flex flex-wrap gap-4 mb-6 items-center justify-end">
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="p-3 bg-slate-700 text-black  border p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-500 rounded-lg">
              {departments.map((dept) => <option key={dept}>{dept}</option>)}
            </select>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="p-3 bg-slate-700 border p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-500 rounded-lg">
              {years.map((yr) => <option key={yr}>{yr}</option>)}
            </select>
            {isEditable && (
              <button onClick={handleAddScheduleClick} className="bg-gradient-to-r from-violet-600 to-purple-700 hover:scale-105 flex justify-end transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg">➕ Add Schedule</button>
            )}
          </div>

          <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
            <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
              <thead className="bg-white-300/10 backdrop-blur-sm">
                <tr className="p-3 border border-white/10">
                  <th className="p-3 border border-white/10">Day / Time</th>
                  {timeSlots.map(slot => (
                    <th key={slot} className="p-3 border border-white/10">
                      {(slot === '11:10–11:45' || slot === '1:45–1:55') ? (
                        <span className={slot === '11:10–11:45' ? 'text-white-300' : 'text-white-300'}>{slot}</span>
                      ) : slot}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map(day => (
                  <tr key={day} className="border-t border-slate-700">
                    <td className="p-3 border border-white/10">{day}</td>
                    {timeSlots.map(slot => {
                      const entry = timetable[day]?.[slot];
                      const subject = entry?.subject || '—';
                      const teacher = entry?.teacher;

                      if (slot === '11:10–11:45') {
                        const recessLetters = { Monday: 'R', Tuesday: 'E', Wednesday: 'C', Thursday: 'E', Friday: 'S', Saturday: 'S' };
                        return <td key={day + slot} className="px-4 py-3 text-orange-300 font-bold text-center">{recessLetters[day]}</td>;
                      }

                      if (slot === '1:45–1:55') {
                        return <td key={day + slot} className="px-4 py-3 text-yellow-300 font-medium text-center">SHORT BREAK</td>;
                      }

                      return (
                        <td key={day + slot} className="p-3 border border-white/10">
                          <div className="flex flex-col">
                            <span>{formatCell(subject, teacher)}</span>
                            {isEditable && subject !== '—' && (
                              <div className="flex gap-2 mt-1">
                                <button onClick={() => handleEdit(day, slot, subject, teacher)} className="text-blue-400 text-xs">✏ Edit</button>
                                <button onClick={() => handleDelete(day, slot)} className="text-red-400 text-xs">❌ Delete</button>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* STUDENT ADD/EDIT MODAL */}
      {isEditable && showAddScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">{editData ? "Edit Schedule" : "Add New Schedule"}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const day = form.day.value;
              const time = form.time.value;
              const subject = form.subject.value.trim();
              const teacherFromSelect = form.teacher.value;
              const newTeacherManual = form.newTeacherManual.value.trim();
              const teacher = newTeacherManual || teacherFromSelect;
              if (!subject) return alert('Please enter a subject.');
              handleSaveSchedule({ day, time, subject, teacher });
            }}>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Day:</label>
                <select name="day" defaultValue={editData?.day || ''} className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white">
                  {days.map(day => <option key={day}>{day}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Time Slot:</label>
                <select name="time" defaultValue={editData?.time || ''} className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white">
                  {timeSlots.map(slot => <option key={slot}>{slot}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Subject/Activity:</label>
                <input type="text" name="subject" defaultValue={editData?.subject || ''} className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white" placeholder="e.g., MIC - TH" required />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Teacher (Optional):</label>
                <select name="teacher" defaultValue={editData?.teacher || ''} className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white">
                  <option value="">-- Select --</option>
                  {dynamicTeachers.map((t) => <option key={t}>{t}</option>)}
                </select>
                <input type="text" name="newTeacherManual" placeholder="Or type new teacher name" className="p-2 mt-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={handleModalClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">{editData ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FACULTY VIEW */}
      {selectedView === 'Faculty' && (
        <>
          <div className="mt-6" />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-300">Faculty Schedule</h2>
            <button onClick={() => openFacultyForm(null)} className="bg-green-600 px-4 py-2 rounded text-white">+ Add Faculty Schedule</button>
          </div>

          <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
            <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
              <thead>
                <tr className="bg-purple-300/10 backdrop-blur-sm">
                  <th className="p-3 border border-white/10">Faculty</th>
                  <th className="p-3 border border-white/10">Subject</th>
                  <th className="p-3 border border-white/10">Day</th>
                  <th className="p-3 border border-white/10">Date</th>
                  <th className="p-3 border border-white/10">Time</th>
                  <th className="p-3 border border-white/10">Sem</th>
                  <th className="p-3 border border-white/10">Year</th>
                  <th className="p-3 border border-white/10">Department</th>
                  <th className="p-3 border border-white/10">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(facultyData) && facultyData.length > 0 ? (
                  facultyData.map((f, idx) => {
                    const id = f._id || f.id ||` local-${idx}`;
                    return (
                      <tr key={id} className="border-t border-slate-700">
                        <td className="p-3 border border-white/10">{f.facultyName}</td>
                        <td className="p-3 border border-white/10">{f.subject}</td>
                        <td className="p-3 border border-white/10">{f.day}</td>
                        <td className="p-3 border border-white/10">{f.date}</td>
                        <td className="p-3 border border-white/10">{f.time}</td>
                        <td className="p-3 border border-white/10">{f.sem || f.semester}</td>
                        <td className="p-3 border border-white/10">{f.year}</td>
                        <td className="p-3 border border-white/10">{f.department}</td>
                        <td className="p-3 border border-white/10">
                          <div className="p-3 border border-white/10">
                            <button onClick={() => handleFacultyEditClick(f)} className="px-2 py-1 bg-yellow-500 rounded text-white">Edit</button>
                            <button onClick={() => handleFacultyDelete(id)} className="px-2 py-1 bg-red-500 rounded text-white">Delete</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td colSpan="9" className="p-4 text-center text-slate-300">No faculty schedules found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* FACULTY FORM MODAL */}
      {showFacultyFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">{editingFacultyId ? "Edit" : "Add"} Faculty Schedule</h2>
            <form onSubmit={handleFacultySave} className="space-y-3">
              <input name="facultyName" value={facultyForm.facultyName} onChange={handleFacultyInputChange} placeholder="Faculty Name" className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white" required />
              <input name="subject" value={facultyForm.subject} onChange={handleFacultyInputChange} placeholder="Subject" className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white" required />

              <select name="day" value={facultyForm.day} onChange={handleFacultyInputChange} className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white" required>
                <option value="">Select Day</option>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>

              <input type="date" name="date" value={facultyForm.date} onChange={handleFacultyInputChange} className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white" required />

              <select name="time" value={facultyForm.time} onChange={handleFacultyInputChange} className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white" required>
                <option value="">Select Time</option>
                {timeSlots.filter(t => t !== '11:10–11:45' && t !== '1:45–1:55').map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <select name="sem" value={facultyForm.sem} onChange={handleFacultyInputChange} className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white" required>
                <option value="">Select Semester</option>
                {[1,2,3,4,5,6].map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <select name="year" value={facultyForm.year} onChange={handleFacultyInputChange} className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white" required>
                <option value="">Select Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>

              <select name="department" value={facultyForm.department} onChange={handleFacultyInputChange} className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-full text-white" required>
                <option value="">Select Department</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeFacultyForm} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}