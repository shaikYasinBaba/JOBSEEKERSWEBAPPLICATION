import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("Missing userId. Redirecting.");
      return navigate("/");
    }

    const db = JSON.parse(localStorage.getItem("jobseekerDB")) || { users: [], jobs: [] };
    const users = db.users || [];
    const jobsData = db.jobs || [];

    const currentUser = users.find((u) => u.id.toString() === userId);
    if (!currentUser) {
      console.warn("User not found. Redirecting.");
      return navigate("/");
    }

    setUser(currentUser);
    setUpdateData({
      name: currentUser.name || "",
      number: currentUser.number || "",
      resumeDescription: currentUser.resumeDescription || "",
      companyDescription: currentUser.companyDescription || "",
    });

    if (currentUser.role === "employer") {
      const employerJobs = jobsData.filter(
        (job) => job.employerId?.toString() === userId
      );
      setJobs(employerJobs);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const userId = localStorage.getItem("userId");
    const db = JSON.parse(localStorage.getItem("jobseekerDB")) || { users: [], jobs: [] };
    const users = db.users || [];

    const index = users.findIndex((u) => u.id.toString() === userId);
    if (index === -1) return alert("User not found");

    const updatedUser = { ...users[index], ...updateData };
    users[index] = updatedUser;

    db.users = users;
    localStorage.setItem("jobseekerDB", JSON.stringify(db));

    setUser(updatedUser);
    setEditMode(false);
    alert("Profile updated successfully.");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleDelete = (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    const db = JSON.parse(localStorage.getItem("jobseekerDB")) || { users: [], jobs: [] };
    const jobsData = db.jobs || [];

    const updatedJobs = jobsData.filter((job) => job.id !== jobId);
    db.jobs = updatedJobs;
    localStorage.setItem("jobseekerDB", JSON.stringify(db));

    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    alert("Job deleted.");
  };

  if (!user) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2 className="profile-title">My Profile Details</h2>
        <p className="role-badge">{user.role.toUpperCase()}</p>

        {!editMode ? (
          <div className="profile-info">
            <div className="new">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="new_1">
              <p><strong>Phone Number:</strong> {user.number || "N/A"}</p>
            </div>
            {user.role === "jobseeker" && (
              <div>
                <p><strong>Resume Description:</strong></p>
                <p className="multi-line">{user.resumeDescription || "N/A"}</p>
              </div>
            )}
            {user.role === "employer" && (
              <div>
                <p><strong>Company Description:</strong></p>
                <p className="multi-line">{user.companyDescription || "N/A"}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="edit-form">
            <label>
              Name:
              <input
                name="name"
                value={updateData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone Number:
              <input
                name="number"
                value={updateData.number}
                onChange={handleChange}
              />
            </label>
            {user.role === "jobseeker" && (
              <label>
                Resume Description:
                <textarea
                  name="resumeDescription"
                  value={updateData.resumeDescription}
                  onChange={handleChange}
                />
              </label>
            )}
            {user.role === "employer" && (
              <label>
                Company Description:
                <textarea
                  name="companyDescription"
                  value={updateData.companyDescription}
                  onChange={handleChange}
                />
              </label>
            )}
          </div>
        )}

        <div className="profile-buttons">
          {editMode ? (
            <>
              <button className="btn primary" onClick={handleUpdate}>Save</button>
              <button className="btn" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn primary" onClick={() => setEditMode(true)}>Edit</button>
          )}
          <button className="btn danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {user.role === "employer" && jobs.length > 0 && (
        <div className="jobs-container profile-card" style={{ marginTop: "30px" }}>
          <h3 style={{ margin: "10px 0", color: "#2c3e50", width: "100%" }}>Your Job Posts</h3>
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h2 className="job-title">{job.title}</h2>
              <div className="job-details-row">
                <span><strong>Position:</strong> {job.position}</span>
                <span><strong>Company:</strong> {job.company}</span>
              </div>
              <div className="job-details-row">
                <span><strong>Location:</strong> {job.location || "N/A"}</span>
                <span><strong>Salary:</strong> {job.salary || "N/A"}</span>
              </div>
              <div className="job-details-row">
                <span><strong>Duration:</strong> {job.duration || "N/A"}</span>
                <span><strong>Recruiter:</strong> {job.recruiterName || "N/A"}</span>
              </div>
              <div className="job-buttons">
                <button className="btn secondary" onClick={() => navigate(`/applications/${job.id}`)}>View Applications</button>
                <button className="btn danger" onClick={() => handleDelete(job.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
