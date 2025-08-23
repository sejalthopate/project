import React, { useEffect, useMemo, useState } from "react";
import { getCourses } from "../../services/CoursesApi";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");

  const departments = ["All", "CO", "IT", "ENTC", "EE", "ME", "AUTO", "CE"];
  const years = ["All", "FY", "SY", "TY"];
  const semesterOptions = { FY: ["All", "1", "2"], SY: ["All", "3", "4"], TY: ["All", "5", "6"] };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const list = await getCourses();
      setCourses(Array.isArray(list) ? list : []);
      if (list.length) setSelectedCourse(list[0]);
    } catch (e) {
      console.error("Error fetching courses:", e);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const okDept =
        departmentFilter === "All" ||
        (c.department || "").toLowerCase() === departmentFilter.toLowerCase();
      const okYear =
        yearFilter === "All" || (c.year || "").toLowerCase() === yearFilter.toLowerCase();
      const okSemester = semesterFilter === "All" || (c.semester || "") === semesterFilter;
      const okSearch =
        (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (c.department || "").toLowerCase().includes(search.toLowerCase());
      return okDept && okYear && okSemester && okSearch;
    });
  }, [courses, search, departmentFilter, yearFilter, semesterFilter]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">🎓 Student Courses</h2>
          <div className="flex flex-wrap gap-2">
            <input
              placeholder="Search by name/department"
              className="px-3 py-2 rounded-xl bg-white text-black shadow w-56 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="px-3 py-2 rounded-xl bg-white text-black shadow outline-none"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              className="px-3 py-2 rounded-xl text-black bg-white shadow outline-none"
              value={yearFilter}
              onChange={(e) => {
                setYearFilter(e.target.value);
                setSemesterFilter("All");
              }}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {yearFilter !== "All" && (
              <select
                className="px-3 py-2 rounded-xl text-black bg-white shadow outline-none"
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
              >
                {semesterOptions[yearFilter].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={fetchCourses}
              className="px-3 py-2 rounded-xl bg-white text-black shadow hover:bg-pink-50"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading courses...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
            <div className="bg-white p-6 rounded-3xl shadow-xl">
              <ul>
                {filteredCourses.map((course) => (
                  <li
                    key={course._id}
                    className={`mb-3 cursor-pointer text-black  px-4 py-3 rounded-xl transition-all ${
                      selectedCourse?._id === course._id
                        ? "bg-purple-800/10 text-black backdrop-blur-sm"
                        : "bg-purple-800/10 text-black backdrop-blur-sm"
                    }`}
                    onClick={() => setSelectedCourse(course)}
                  >
                    <div className="font-semibold">{course.name}</div>
                    <div className="text-sm opacity-80">
                      Dept: {course.department || "-"} | Year: {course.year || "-"} | Sem:{" "}
                      {course.semester || "-"}
                    </div>
                  </li>
                ))}
                {!filteredCourses.length && (
                  <li className="text-gray-500 italic">No courses found.</li>
                )}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl min-h-[300px]">
              {selectedCourse ? (
                <>
                  <h3 className="text-2xl font-semibold mb-2 text-orange-800">
                    {selectedCourse.name}
                  </h3>
                  <div className="text-gray-700 mb-2">
                    <span className="font-medium">Department:</span>{" "}
                    {selectedCourse.department || "-"}
                  </div>
                  <div className="text-gray-700 mb-4">
                    <span className="font-medium">Year:</span> {selectedCourse.year || "-"} |{" "}
                    <span className="font-medium">Semester:</span>{" "}
                    {selectedCourse.semester || "-"}
                  </div>
                  <h4 className="text-md font-medium mt-2 mb-1 text-gray-500">
                    COURSE LEVEL LEARNING OUTCOMES
                  </h4>
                  <ul className="list-disc ml-6 mb-4 text-gray-800">
                    {Array.isArray(selectedCourse.outcomes) &&
                    selectedCourse.outcomes.length ? (
                      selectedCourse.outcomes.map((co, i) => <li key={i}>{co}</li>)
                    ) : (
                      <li className="text-gray-500">Not provided</li>
                    )}
                  </ul>
                  <h4 className="text-md font-medium mt-4 mb-1 text-gray-500">MARKS</h4>
                  <p className="text-gray-800">
                    {selectedCourse?.marks !== undefined ? selectedCourse.marks : "-"} Marks
                  </p>
                </>
              ) : (
                <p className="text-gray-500 text-lg mt-20 text-center">
                  Select a course to view details.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="text-center text-sm text-gray-600 mt-12">
          © 2025 | Course Learning Outcomes
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;