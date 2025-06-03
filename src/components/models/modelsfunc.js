// src/components/models/modelsfunc.js

const DB_KEY = 'jobseekerDB';

function getInitialData() {
  return {
    users: [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice@techcorp.com",
        password: "alice123",
        role: "employer",
        phone: "1234567890",
        companyDescription: "TechCorp is a software development company specializing in AI products."
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob@finserve.com",
        password: "bob123",
        role: "employer",
        phone: "2345678901",
        companyDescription: "FinServe provides financial software and analytics platforms."
      },
      {
        id: 3,
        name: "Clara Evans",
        email: "clara@greenbuild.com",
        // No password added – wasn't on your list
        role: "employer",
        phone: "3456789012",
        companyDescription: "GreenBuild focuses on sustainable construction solutions."
      },
      {
        id: 4,
        name: "David Lee",
        email: "david.lee@gmail.com",
        password: "david123",
        role: "jobseeker",
        phone: "4567890123",
        resume: "Experienced frontend developer skilled in React, Redux, and TypeScript."
      },
      {
        id: 5,
        name: "Eva Brown",
        email: "eva.brown@gmail.com",
        password: "eva123",
        role: "jobseeker",
        phone: "5678901234",
        resume: "Data analyst with experience in SQL, Python, and Power BI."
      },
      {
        id: 6,
        name: "Frank Wright",
        email: "frank.wright@gmail.com",
        password: "frank123",
        role: "jobseeker",
        phone: "6789012345",
        resume: "Backend developer with Node.js, Express, and MongoDB expertise."
      }
    ],
    jobs: [
      {
        id: 101,
        title: "Frontend Developer",
        position: "Full-time",
        company: "TechCorp",
        duration: "Permanent",
        salary: "₹12 LPA",
        location: "Hyderabad",
        jd: "Build responsive UIs using React and Redux.",
        recruiterName: "Alice Johnson",
        employerId: 1,
        applications: [
          { userId: 4, status: "applied" },
          { userId: 6, status: "viewed" }
        ]
      },
      {
        id: 102,
        title: "React Native Developer",
        position: "Contract",
        company: "TechCorp",
        duration: "6 months",
        salary: "₹10 LPA",
        location: "Remote",
        jd: "Develop mobile apps with React Native.",
        recruiterName: "Alice Johnson",
        employerId: 1,
        applications: []
      },
      {
        id: 103,
        title: "UI/UX Designer",
        position: "Internship",
        company: "TechCorp",
        duration: "3 months",
        salary: "₹25,000/month",
        location: "Bangalore",
        jd: "Design user-friendly interfaces and conduct UX testing.",
        recruiterName: "Alice Johnson",
        employerId: 1,
        applications: [{ userId: 5, status: "selected" }]
      },
      {
        id: 104,
        title: "Business Analyst",
        position: "Full-time",
        company: "FinServe",
        duration: "Permanent",
        salary: "₹15 LPA",
        location: "Mumbai",
        jd: "Analyze business processes and coordinate with development teams.",
        recruiterName: "Bob Smith",
        employerId: 2,
        applications: [{ userId: 5, status: "applied" }]
      },
      {
        id: 105,
        title: "Data Scientist",
        position: "Full-time",
        company: "FinServe",
        duration: "Permanent",
        salary: "₹18 LPA",
        location: "Delhi",
        jd: "Work with large datasets and machine learning models.",
        recruiterName: "Bob Smith",
        employerId: 2,
        applications: [
          { userId: 5, status: "viewed" },
          { userId: 6, status: "applied" }
        ]
      },
      {
        id: 106,
        title: "QA Engineer",
        position: "Full-time",
        company: "FinServe",
        duration: "Permanent",
        salary: "₹9 LPA",
        location: "Pune",
        jd: "Automated and manual testing of software applications.",
        recruiterName: "Bob Smith",
        employerId: 2,
        applications: []
      },
      {
        id: 107,
        title: "Cloud Architect",
        position: "Full-time",
        company: "GreenBuild",
        duration: "Permanent",
        salary: "₹20 LPA",
        location: "Chennai",
        jd: "Design cloud-native infrastructure using AWS and GCP.",
        recruiterName: "Clara Evans",
        employerId: 3,
        applications: [{ userId: 6, status: "applied" }]
      },
      {
        id: 108,
        title: "DevOps Engineer",
        position: "Contract",
        company: "GreenBuild",
        duration: "1 year",
        salary: "₹14 LPA",
        location: "Remote",
        jd: "Implement CI/CD pipelines and infrastructure as code.",
        recruiterName: "Clara Evans",
        employerId: 3,
        applications: []
      },
      {
        id: 109,
        title: "Technical Writer",
        position: "Part-time",
        company: "GreenBuild",
        duration: "6 months",
        salary: "₹5 LPA",
        location: "Remote",
        jd: "Document software modules and developer guides.",
        recruiterName: "Clara Evans",
        employerId: 3,
        applications: [{ userId: 4, status: "rejected" }]
      },
      {
        id: 110,
        title: "Android Developer",
        position: "Full-time",
        company: "TechCorp",
        duration: "Permanent",
        salary: "₹11 LPA",
        location: "Noida",
        jd: "Build Android apps using Kotlin and Java.",
        recruiterName: "Alice Johnson",
        employerId: 1,
        applications: [{ userId: 4, status: "selected" }]
      },
      {
        id: 111,
        title: "Project Manager",
        position: "Full-time",
        company: "FinServe",
        duration: "Permanent",
        salary: "₹16 LPA",
        location: "Hyderabad",
        jd: "Manage IT project delivery and timelines.",
        recruiterName: "Bob Smith",
        employerId: 2,
        applications: []
      },
      {
        id: 112,
        title: "Python Developer",
        position: "Full-time",
        company: "GreenBuild",
        duration: "Permanent",
        salary: "₹13 LPA",
        location: "Kolkata",
        jd: "Develop backend systems using Django and Flask.",
        recruiterName: "Clara Evans",
        employerId: 3,
        applications: [{ userId: 6, status: "viewed" }]
      },
      {
        id: 113,
        title: "Support Engineer",
        position: "Full-time",
        company: "TechCorp",
        duration: "Permanent",
        salary: "₹7 LPA",
        location: "Hyderabad",
        jd: "Provide customer and technical support for cloud products.",
        recruiterName: "Alice Johnson",
        employerId: 1,
        applications: []
      },
      {
        id: 114,
        title: "Marketing Analyst",
        position: "Internship",
        company: "FinServe",
        duration: "6 months",
        salary: "₹15,000/month",
        location: "Remote",
        jd: "Analyze customer segments and performance metrics.",
        recruiterName: "Bob Smith",
        employerId: 2,
        applications: [{ userId: 5, status: "applied" }]
      },
      {
        id: 115,
        title: "Full Stack Developer",
        position: "Full-time",
        company: "GreenBuild",
        duration: "Permanent",
        salary: "₹17 LPA",
        location: "Bangalore",
        jd: "Develop full-stack applications using MERN stack.",
        recruiterName: "Clara Evans",
        employerId: 3,
        applications: [{ userId: 4, status: "applied" }]
      }
    ]
  };
}

function loadDB() {
  const stored = localStorage.getItem(DB_KEY);
  if (!stored) {
    const initialData = getInitialData();
    saveDB(initialData);
    return initialData;
  }
  return JSON.parse(stored);
}

function saveDB(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

const modelsFunc = {
  read: () => loadDB(),
  write: (newData) => saveDB(newData),
  reset: () => saveDB(getInitialData())
};

export default modelsFunc;
