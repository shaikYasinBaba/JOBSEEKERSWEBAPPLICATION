import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const db = JSON.parse(localStorage.getItem("jobseekerDB")) || { jobs: [] };
      const foundJob = db.jobs.find((j) => String(j.id) === id);
      if (!foundJob) {
        setError("Job not found");
      } else {
        setJob(foundJob);
      }
    } catch (err) {
      setError("Failed to load job details");
    }
  }, [id]);

  const handleApply = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in as a jobseeker to apply.");
      return;
    }

    const db = JSON.parse(localStorage.getItem("jobseekerDB")) || { users: [], jobs: [] };
    const userIndex = db.users.findIndex((u) => String(u.id) === userId);
    if (userIndex === -1) {
      alert("User not found.");
      return;
    }

    const user = db.users[userIndex];
    if (user.role !== "jobseeker") {
      alert("Employers are not allowed to apply for jobs.");
      return;
    }

    const jobIndex = db.jobs.findIndex((j) => String(j.id) === id);
    if (jobIndex === -1) {
      alert("Job no longer available.");
      return;
    }

    const applicants = db.jobs[jobIndex].applicants || [];
    if (applicants.includes(userId)) {
      alert("You have already applied for this job.");
      return;
    }

    // Update job object
    applicants.push(userId);
    db.jobs[jobIndex].applicants = applicants;

    // Update user object
    const application = {
      jobId: job.id,
      status: "applied",
      appliedAt: new Date().toISOString(),
    };

    if (!user.appliedJobs) {
      user.appliedJobs = [];
    }

    user.appliedJobs.push(application);
    db.users[userIndex] = user;

    // Save
    localStorage.setItem("jobseekerDB", JSON.stringify(db));

    alert("Successfully applied to the job!");
  };

  if (error)
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        {error}
      </div>
    );

  if (!job) return <p style={{ padding: "20px", textAlign: "center" }}>Loading...</p>;

  const {
    title = "N/A",
    position = "N/A",
    company = "N/A",
    duration = "N/A",
    salary = "N/A",
    location = "N/A",
    jobDescription = "No description provided.",
    recruiterName = "N/A",
  } = job;

  return (
    <div className="job-details">
      <h2>{title}</h2>

      <div className="format">
        <p><strong>Position:</strong> {position}</p>
        <p><strong>Company:</strong> {company}</p>
      </div>

      <div className="format">
        <p><strong>Duration:</strong> {duration}</p>
        <p><strong>Salary:</strong> {salary}</p>
      </div>

      <div className="format">
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Recruiter:</strong> {recruiterName}</p>
      </div>

      <p className="Jobdisc">
        <strong>Job Description:</strong>
        <br />
        {jobDescription}
      </p>

      <button className="apply-btn" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

export default JobDetails;
