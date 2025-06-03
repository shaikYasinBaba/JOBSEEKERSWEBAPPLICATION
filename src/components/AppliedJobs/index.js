import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(null); // 👈 Track expanded JD
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliedJobs = () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User not logged in.');
          return;
        }

        const dbRaw = localStorage.getItem('jobseekerDB');
        if (!dbRaw) {
          setError('No data found in jobseekerDB.');
          return;
        }

        const db = JSON.parse(dbRaw);
        if (!db.users || !Array.isArray(db.users)) {
          setError('Users list missing in DB.');
          return;
        }
        if (!db.jobs || !Array.isArray(db.jobs)) {
          setError('Jobs list missing in DB.');
          return;
        }

        const user = db.users.find((u) => u.id === Number(userId));
        if (!user) {
          setError('User not found.');
          return;
        }

        const applied = user.appliedJobs || [];
        const validStatuses = ['applied', 'viewed', 'selected for next step'];

        const filtered = applied
          .filter((app) => validStatuses.includes(app.status?.toLowerCase()))
          .map((app) => {
            const jobDetails = db.jobs.find((job) => job.id === app.jobId);
            return {
              ...app,
              title: jobDetails?.title || 'N/A',
              company: jobDetails?.company || 'N/A',
              location: jobDetails?.location || 'N/A',
              salary: jobDetails?.salary || 'N/A',
              recruiter: jobDetails?.recruiterName || 'N/A',
              description: jobDetails?.jd || 'No description provided',
            };
          });

        setAppliedJobs(filtered);
      } catch (err) {
        console.error(err);
        setError('Failed to load applied jobs.');
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleCardClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  if (error) return <p className="center error">{error}</p>;

  return (
    <div className="jobseeker-list-container">
      <h2 style={{ margin: '20px' }}>Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p className="center">No applied jobs found with the specified status.</p>
      ) : (
        <div className="card-grid">
          {appliedJobs.map((job, index) => {
            const isExpanded = expanded === index;
            const summary = job.description?.split('\n')[0] || 'No description available';

            return (
              <div
                key={job.jobId}
                className="jobseeker-card"
                onClick={() => handleCardClick(job.jobId)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleCardClick(job.jobId);
                }}
              >
                <p className='title'><strong> {job.title}</strong></p>
                <div className="job-details-row" id="f-1">
                  <p><strong>Company:</strong> {job.company}</p>
                  <p><strong>Status:</strong> {job.status}</p>
                </div>
                <div className="job-details-row" id="f-1">
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Salary:</strong> {job.salary}</p>
                </div>
                

                <div className="resume-section">
                  <strong>Job Description:</strong>
                  <p style={{ textAlign: 'center' }}>
                    {isExpanded ? job.description : summary}
                  </p>
                  {job.description?.split('\n').length > 1 && (
                    <button
                      className="toggle-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent card click
                        setExpanded(isExpanded ? null : index);
                      }}
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

export default AppliedJobs;
