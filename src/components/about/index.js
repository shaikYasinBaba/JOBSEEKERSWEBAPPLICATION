import React from "react";
import './index.css'

const About = () => {
  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2 id="heading">About This JobSeeker App</h2>
      
      <div className="cont"><p>
      This app connects job seekers and employers seamlessly on a single platform. Employers can easily post job openings and efficiently manage applicants, while job seekers can browse available positions, apply, and track their applications with ease. All data is stored locally to ensure quick access and offline usability. The user interface is designed to be simple and intuitive, catering to all user roles. Additionally, secure login and role-based access controls safeguard user information and privacy.
      </p></div>

      <h3 id="heading">Sample User Accounts</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "white" }}>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Password</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Alice Johnson", email: "alice@techcorp.com", password: "alice123", role: "employer" },
            { name: "Bob Smith", email: "bob@finserve.com", password: "bob123", role: "employer" },
            { name: "David Lee", email: "david.lee@gmail.com", password: "david123", role: "jobseeker" },
            { name: "Eva Brown", email: "eva.brown@gmail.com", password: "eva123", role: "jobseeker" },
            { name: "Frank Wright", email: "frank.wright@gmail.com", password: "frank123", role: "jobseeker" }
          ].map((user, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#f8f9fa" : "white" }}>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{user.name}</td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                <a href={`mailto:${user.email}`} style={{ color: "#007bff", textDecoration: "none" }}>
                  {user.email}
                </a>
              </td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>{user.password}</td>
              <td style={{ padding: 8, border: "1px solid #ddd", textTransform: "capitalize" }}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default About;
