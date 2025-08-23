import React from "react";

const LeaveRequestTable = ({ requests, onEdit, onDelete, onStatusChange, isAdmin }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-purple-600 text-white">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Leave Type</th>
            <th className="p-2 border">From</th>
            <th className="p-2 border">To</th>
            <th className="p-2 border">Days</th>
            <th className="p-2 border">Reason</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Notes</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests?.length > 0 ? (
            requests.map((req) => {
              // ✅ Calculate days between fromDate & toDate
              const from = new Date(req.fromDate);
              const to = new Date(req.toDate);
              const diffDays =
                Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

              return (
                <tr key={req._id} className="text-center border-b">
                  <td className="p-2 border">{req.name || "N/A"}</td>
                  <td className="p-2 border">{req.leaveType}</td>
                  <td className="p-2 border">
                    {new Date(req.fromDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {new Date(req.toDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">{diffDays}</td>
                  <td className="p-2 border">{req.reason}</td>

                  {/* ✅ Status Column */}
                  <td className="p-2 border">
                    {isAdmin ? (
                      <select
                        value={req.status || "Pending"}
                        onChange={(e) =>
                          onStatusChange(req._id, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          req.status === "Approved"
                            ? "bg-green-500"
                            : req.status === "Rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {req.status || "Pending"}
                      </span>
                    )}
                  </td>

                  <td className="p-2 border">{req.notes || "-"}</td>

                  {/* ✅ Actions */}
                  <td className="p-2 border">
                    {isAdmin ? (
                      // 👉 Admin साठी फक्त static buttons
                      <div className="flex justify-center space-x-2">
                        <button className="px-2 py-1 bg-blue-400 text-white rounded text-sm cursor-not-allowed">
                          Edit
                        </button>
                        <button className="px-2 py-1 bg-red-400 text-white rounded text-sm cursor-not-allowed">
                          Delete
                        </button>
                      </div>
                    ) : (
                      // 👉 Faculty साठी working buttons
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => onEdit(req)}
                          className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(req._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" className="p-4 text-center text-gray-500">
                No leave requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequestTable;