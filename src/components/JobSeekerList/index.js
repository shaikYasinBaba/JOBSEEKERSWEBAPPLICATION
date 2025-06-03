import React, { useEffect, useState } from "react";
import "./index.css";

const JobSeekerList = () => {
  const [search, setSearch] = useState("");
  const [allJobseekers, setAllJobseekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedResumes, setExpandedResumes] = useState({});

  useEffect(() => {
    fetchJobseekers();
  }, []);

  const fetchJobseekers = () => {
    setLoading(true);
    try {
      const db = JSON.parse(localStorage.getItem("jobseekerDB")) || { users: [] };
      const jobseekers = db.users.filter((user) => user.role === "jobseeker");
      setAllJobseekers(jobseekers);
    } catch (error) {
      console.error("Failed to load jobseekers from localStorage", error);
      setAllJobseekers([]);
    }
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleResume = (id) => {
    setExpandedResumes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredJobseekers = allJobseekers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      (user.resume && user.resume.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <p className="center">Loading...</p>;

  return (
    <div className="jobseeker-list-container">
      <h2>Job Seekers</h2>
      <input
        type="text"
        placeholder="Search by name or resume..."
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="jobs-container">
        {filteredJobseekers.length > 0 ? (
          filteredJobseekers.map((user) => {
            const resume = user.resume || "N/A";
            const isExpanded = expandedResumes[user.id];
            const wordCount = resume.split(" ").length;
            const summary = resume.split(" ").slice(0, 25).join(" ") + (wordCount > 25 ? "..." : "");

            return (
              <div key={user.id} className="job-card">
                <h3>{user.name}</h3>
                <div className="myst">
                  <p>📧 :<strong></strong> {user.email}</p>
                  <p>📞:<strong></strong> {user.phone || user.number}</p>
                </div>
                <p><strong>Resume:</strong></p>
                <p style={{ textAlign: "left" }}>{isExpanded ? resume : summary}</p>
                {wordCount > 25 && (
                  <button
                    onClick={() => toggleResume(user.id)}
                    className="apply-btn"
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="center">No job seekers found.</p>
        )}
      </div>
    </div>
  );
};

export default JobSeekerList;
