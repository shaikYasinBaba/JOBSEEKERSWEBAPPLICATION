import React, { useState, useEffect } from "react";
import "./index.css";

const Jobcart = ({ job }) => {
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const db = JSON.parse(localStorage.getItem("jobseekerDB")) || { users: [] };
    const user = db.users.find((u) => String(u.id) === userId);

    if (user?.appliedJobs) {
      const alreadyApplied = user.appliedJobs.some(
        (applied) => applied.jobId === job.id
      );
      setHasApplied(alreadyApplied);
    }
  }, [job.id]);

  const handleApply = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please log in to apply.");

    const db = JSON.parse(localStorage.getItem("jobseekerDB")) || { users: [], jobs: [] };
    const userIndex = db.users.findIndex((u) => String(u.id) === userId);
    if (userIndex === -1) return alert("User not found.");

    const user = db.users[userIndex];
    if (user.role !== "jobseeker") {
      alert("Employers are not allowed to apply for jobs.");
      return;
    }

    const jobIndex = db.jobs.findIndex((j) => j.id === job.id);
    if (jobIndex === -1) return alert("Job no longer available.");

    const alreadyApplied = user.appliedJobs?.some(
      (applied) => applied.jobId === job.id
    );
    if (alreadyApplied) return alert("You have already applied.");

    const application = {
      jobId: job.id,
      status: "applied",
      appliedAt: new Date().toISOString(),
    };

    if (!user.appliedJobs) user.appliedJobs = [];
    user.appliedJobs.push(application);

    // Update job object too
    if (!db.jobs[jobIndex].applicants) db.jobs[jobIndex].applicants = [];
    db.jobs[jobIndex].applicants.push(userId);

    db.users[userIndex] = user;
    localStorage.setItem("jobseekerDB", JSON.stringify(db));
    setHasApplied(true);
    alert("Application submitted successfully!");
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <div className="myst">
      <p><strong>Position:</strong> {job.position}</p>
      <p><strong>Company:</strong> {job.company}</p>
      </div> <div className="myst">
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
       </div> 
      <p><strong>Description:</strong> {job.jd}</p>

      {!hasApplied ? (
        <button onClick={handleApply} className="apply-btn">Apply</button>
      ) : (
        <button className="applied-btn" disabled>Already Applied</button>
      )}
    </div>
  );
};

export default Jobcart;
