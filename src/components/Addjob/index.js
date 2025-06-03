import React, { useState } from 'react';
import './index.css';
import modelsFunc from '../models/modelsfunc';

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    position: '',
    company: '',
    duration: '',
    salary: '',
    location: '',
    jobDescription: '',
    recruiterName: ''
  });

  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (message) setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setMessage('You must be logged in to post a job.');
      return;
    }

    const db = modelsFunc.read();
    const employer = db.users.find(u => u.id.toString() === userId);

    if (!employer || employer.role !== 'employer') {
      setMessage('You must be logged in as an employer to post a job.');
      return;
    }

    // Check for required fields
    if (!formData.title.trim() || !formData.position.trim() || !formData.company.trim()) {
      setMessage('Please fill in Title, Position, and Company.');
      return;
    }

    setSubmitting(true);

    const newJob = {
      id: Date.now(),
      employerId: employer.id,
      ...Object.fromEntries(
        Object.entries(formData).map(([key, val]) => [key, val.trim()])
      )
    };

    db.jobs.push(newJob);
    modelsFunc.write(db);

    setMessage('Job posted successfully!');
    setFormData({
      title: '',
      position: '',
      company: '',
      duration: '',
      salary: '',
      location: '',
      jobDescription: '',
      recruiterName: ''
    });
    setSubmitting(false);
  };

  return (
    <div className="add-job-container">
      <h2>Post a New Job</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-job-form" autoComplete="off">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required disabled={submitting} />
        <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required disabled={submitting} />
        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required disabled={submitting} />
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Job Duration" disabled={submitting} />
        <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" disabled={submitting} />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" disabled={submitting} />
        <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} placeholder="Job Description" disabled={submitting} />
        <input type="text" name="recruiterName" value={formData.recruiterName} onChange={handleChange} placeholder="Recruiter Name" disabled={submitting} />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
