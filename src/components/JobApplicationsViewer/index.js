import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import modelsFunc from '../models/modelsfunc';

const JobApplicationsViewer = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchApplicants = () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User not logged in.');
          return;
        }

        const db = modelsFunc.read();

        // Verify the job exists and belongs to this employer
        const job = db.jobs.find(
          (j) => j.id.toString() === jobId && j.employerId.toString() === userId
        );
        if (!job) {
          setError('Job not found or unauthorized access.');
          return;
        }

        // Fetch users who applied to this job
        const jobApplicants = db.users
          .filter((user) =>
            (user.appliedJobs || []).some((app) => app.jobId.toString() === jobId)
          )
          .map((user) => {
            const application = user.appliedJobs.find(
              (app) => app.jobId.toString() === jobId
            );
            return {
              applicantId: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone || user.number || 'N/A',
              resumeDescription: user.resumeDescription || 'N/A',
              status: application?.status || 'applied',
              appliedAt: application?.appliedAt || ''
            };
          });

        setApplicants(jobApplicants);
      } catch (err) {
        console.error(err);
        setError('Error loading applicants.');
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = (applicantId, newStatus, index) => {
    try {
      const db = modelsFunc.read();

      const userIdx = db.users.findIndex((u) => u.id === applicantId);
      if (userIdx === -1) return;

      const jobIdx = db.users[userIdx].appliedJobs.findIndex(
        (app) => app.jobId.toString() === jobId
      );
      if (jobIdx === -1) return;

      // Update the application status
      db.users[userIdx].appliedJobs[jobIdx].status = newStatus;
      modelsFunc.write(db);

      // Update UI
      setApplicants((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], status: newStatus };
        return updated;
      });
    } catch (err) {
      console.error(err);
      setError('Failed to update status.');
    }
  };

  if (error) return <p className="center error">{error}</p>;

  return (
    <div className="jobseeker-list-container">
      <h2 style={{ margin: '20px' }}>Applicants for Job</h2>
      {applicants.length === 0 ? (
        <p className="center">No applications found.</p>
      ) : (
        <div className="card-grid">
          {applicants.map((applicant, index) => {
            const isExpanded = expanded === index;
            const summary = applicant.resumeDescription?.split('\n')[0] || 'N/A';
            const statusClass = `status-${(applicant.status || 'applied')
              .replace(/\s+/g, '-')
              .toLowerCase()}`;

            return (
              <div key={applicant.applicantId} className="jobseeker-card">
                <div className="job-details-row">
                  <p><strong>Name:</strong> {applicant.name}</p>
                  <p><strong>Email:</strong> {applicant.email}</p>
                </div>

                <div className="job-details-row">
                  <div className="status-update-section">
                    <label htmlFor={`status-${index}`}><strong>Update Status:</strong></label>
                    <select
                      id={`status-${index}`}
                      value={applicant.status || 'applied'}
                      onChange={(e) =>
                        handleStatusChange(applicant.applicantId, e.target.value, index)
                      }
                    >
                      <option value="applied">Applied</option>
                      <option value="viewed">Viewed</option>
                      <option value="selected for next step">Selected for Next Step</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={statusClass}>{applicant.status}</span>
                  </p>
                </div>

                <div className="job-details-row">
                  <p><strong>Phone:</strong> {applicant.phone}</p>
                </div>

                <div className="resume-section">
                  <strong>Resume Summary:</strong>
                  <p style={{ textAlign: 'center' }}>
                    {isExpanded ? applicant.resumeDescription : summary}
                  </p>
                  {applicant.resumeDescription?.split('\n').length > 1 && (
                    <button
                      className="toggle-btn"
                      onClick={() => setExpanded(isExpanded ? null : index)}
                    >
                      {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobApplicationsViewer;
