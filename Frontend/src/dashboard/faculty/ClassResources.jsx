import React, { useState } from "react";
import { Folder, PlusCircle } from "lucide-react";

const initialResources = [
  { id: 1, title: "Syllabus PDF", link: "#", type: "PDF" },
  { id: 2, title: "Lecture Slides", link: "#", type: "PPT" },
  { id: 3, title: "Reference Book", link: "#", type: "PDF" },
];

const ClassResources = () => {
  const [resources, setResources] = useState(initialResources);
  const [newResource, setNewResource] = useState({
    title: "",
    link: "",
    type: "PDF",
  });

  const handleAddResource = (e) => {
    e.preventDefault();
    if (!newResource.title || !newResource.link) return;
    setResources([
      ...resources,
      { ...newResource, id: resources.length + 1 },
    ]);
    setNewResource({ title: "", link: "", type: "PDF" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-[#1e1b4b] to-gray-900 pb-85 h-250 text-white p-6">
      <div className="flex items-center gap-2 mb-6">
        <Folder className="text-blue-400" />
        <h2 className="text-3xl font-bold text-indigo-300">Class Resources</h2>
      </div>

      {/* Add Resource Form */}
      <form
        onSubmit={handleAddResource}
        className="bg-[#1e293b] rounded-xl p-4 mb-6 shadow-md space-y-4 max-w-xl"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Title</label>
          <input
            type="text"
            placeholder="Enter resource title"
            className="p-2 rounded bg-gray-800 text-white"
            value={newResource.title}
            onChange={(e) =>
              setNewResource({ ...newResource, title: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Link</label>
          <input
            type="url"
            placeholder="Enter resource link"
            className="p-2 rounded bg-gray-800 text-white"
            value={newResource.link}
            onChange={(e) =>
              setNewResource({ ...newResource, link: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Type</label>
          <select
            className="p-2 rounded bg-gray-800 text-white"
            value={newResource.type}
            onChange={(e) =>
              setNewResource({ ...newResource, type: e.target.value })
            }
          >
            <option value="PDF">PDF</option>
            <option value="PPT">PPT</option>
            <option value="DOC">DOC</option>
            <option value="Link">External Link</option>
          </select>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white transition"
        >
          <PlusCircle size={18} /> Add Resource
        </button>
      </form>

      {/* Resource List */}
      <div className="space-y-3 bg-[#1f2937] rounded-lg p-4 shadow-lg max-w-xl">
        {resources.map((res) => (
          <div
            key={res.id}
            className="flex items-center justify-between border-b border-gray-700 pb-2"
          >
            <div>
              <span className="text-purple-300 font-medium">{res.title}</span>{" "}
              <span className="text-xs text-gray-400 ml-2 px-2 py-1 rounded bg-gray-800">
                {res.type}
              </span>
            </div>
            <a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 underline hover:text-blue-200 transition"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassResources;
