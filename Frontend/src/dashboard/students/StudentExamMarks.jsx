import React, { useEffect, useState } from "react";
import { getExamMarks } from "../../services/ExamMarkApi";

const ExamMarksView = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchExamMarks = async () => {
      try {
        const res = await getExamMarks();
        if (res.data && Array.isArray(res.data)) {
          setStudents(res.data);
        } else {
          setStudents([]);
        }
      } catch (err) {
        console.error("Error fetching exam marks", err);
      }
    };

    fetchExamMarks();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-white bg-clip-text text-transparent">
        📊 My Exam Marks
      </h1>

      {/* Table */}
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr  className="p-3 border border-white/10">
              {[
                "Student",
                "UT1",
                "UT2",
                "Average",
                "Practical",
                "Assignment",
                "Oral",
                "Total",
                "Overall Avg",
              ].map((head, i) => (
                <th key={i} className="p-3 border border-white/10">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((stu, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-purple-300/10" : "bg-purple-300/10"
                  } hover:bg-purple-500/10 transition`}
                >
                  <td className="p-3 border border-white/10">{stu.name}</td>
                  <td>{stu.ut1}</td>
                  <td>{stu.ut2}</td>
                  <td className="p-3 border border-white/10">{stu.average}</td>
                  <td>
                    {stu.practical.map((p, i) => (
                      <div key={i}>
                        P{p.no}: {p.marks}
                      </div>
                    ))}
                  </td>
                  <td>
                    {stu.assignment.map((a, i) => (
                      <div key={i}>
                        A{a.no}: {a.marks}
                      </div>
                    ))}
                  </td>
                  <td>
                    {stu.oral.map((o, i) => (
                      <div key={i}>
                        O{o.no}: {o.marks}
                      </div>
                    ))}
                  </td>
                  <td className="font-bold p-3 border border-white/10 text-yellow-400">{stu.total}</td>
                  <td className="text-red-400 p-3 border border-white/10">{stu.overallAvg}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center text-gray-400 p-3 border border-white/10 py-4 italic"
                >
                  🚫 No exam records yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamMarksView;