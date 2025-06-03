import React, { useState, useEffect } from "react";
import Jobcart from "../Jobcart/index.js";
import "./index.css";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const db = JSON.parse(localStorage.getItem("jobseekerDB")) || { jobs: [] };
      if (Array.isArray(db.jobs)) {
        setJobs(db.jobs);
      } else {
        throw new Error("Invalid job data structure.");
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to load jobs from local storage.");
      setLoading(false);
    }
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const query = search.toLowerCase();
    return (
      job.title?.toLowerCase().includes(query) ||
      job.position?.toLowerCase().includes(query)
    );
  });

  if (loading)
    return <p style={{ padding: "20px", textAlign: "center" }}>Loading jobs...</p>;

  if (error)
    return (
      <p style={{ padding: "20px", textAlign: "center", color: "red" }}>
        Error: {error}
      </p>
    );

  return (
    <div className="jobs-wrapper">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="jobs-container">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <Jobcart key={job.id} job={job} />)
        ) : (
          <p style={{ padding: "20px", textAlign: "center" }}>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
