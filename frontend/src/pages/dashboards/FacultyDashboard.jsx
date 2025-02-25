import { useState } from "react";

const FacultyDashboard = () => {
  const [announcement, setAnnouncement] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [student, setStudent] = useState({}); // Initialized with an empty object

  const handlePostAnnouncement = () => {
    if (announcement) {
      const newAnnouncement = {
        text: announcement,
        year: selectedYear || "All Years",
        branch: selectedBranch || "All Branches",
        division: selectedDivision || "All Divisions",
        timestamp: new Date().toLocaleString(),
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      setAnnouncement("");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-6 bg-gray-100 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-amber-600">Faculty Dashboard</h1>
      </header>

      <section className="bg-gray-100 p-6 rounded-xl shadow-md flex items-center gap-6">
        <img
          src={student?.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-amber-600"
        />
        <div>
          <h2 className="text-lg font-semibold text-amber-500">
            {student?.name || "Student Name"}
          </h2>
          <p className="text-sm text-gray-600">
            Subject, Joined Clg Since, Qualification
          </p>
        </div>
      </section>

      {/* Announcement Section */}
      <section className="bg-gray-100 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-amber-500">📢 Post Announcement</h2>
        <textarea
          className="w-full p-2 bg-gray-50 text-gray-900 rounded-lg outline-none mt-4 border border-gray-300"
          rows="3"
          placeholder="Write an announcement..."
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
        />
        <div className="flex gap-4 mt-3">
          <select
            className="bg-gray-50 p-2 rounded-lg text-gray-900 outline-none border border-gray-300"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="FE">First Year (FE)</option>
            <option value="SE">Second Year (SE)</option>
            <option value="TE">Third Year (TE)</option>
            <option value="BE">Final Year (BE)</option>
          </select>

          <select
            className="bg-gray-50 p-2 rounded-lg text-gray-900 outline-none border border-gray-300"
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">All Branches</option>
            <option value="Computer">Computer</option>
            <option value="IT">IT</option>
            <option value="EXTC">EXTC</option>
          </select>

          <select
            className="bg-gray-50 p-2 rounded-lg text-gray-900 outline-none border border-gray-300"
            onChange={(e) => setSelectedDivision(e.target.value)}
          >
            <option value="">All Divisions</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <button
            className="bg-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-amber-500 transition"
            onClick={handlePostAnnouncement}
          >
            Post
          </button>
        </div>
      </section>

      {/* Announcement History */}
      <section className="bg-gray-100 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-amber-500">📜 Announcement History</h2>
        {announcements.length === 0 ? (
          <p className="text-gray-600 mt-2">No announcements posted yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {announcements.map((ann, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-md border border-gray-300">
                <p className="text-sm text-gray-500">{ann.timestamp}</p>
                <p className="text-gray-900 mt-1">{ann.text}</p>
                <p className="text-sm text-gray-600 mt-2">
                  📌 {ann.year} | {ann.branch} | {ann.division}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>


  );
};

export default FacultyDashboard;
