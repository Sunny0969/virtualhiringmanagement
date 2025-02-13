import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import apiList from "../../lib/apiList";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../index.css";
import "./Sidebar.css";  

const Shortlist = (props) => {
  const [users, setUsers] = useState([]);
  const [applicationSkills, setApplicationSkills] = useState([]);
  const [jobSkills, setJobSkills] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState([]);
  

  useEffect(() => {
    // Fetch user data
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));

    // Fetch job data
    axios
      .get(apiList.jobs, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setJobSkills(response.data);
      })
      .catch((err) => console.log(err));
    
    // Fetch applicant skills
    axios
      .get(apiList.applicants, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setApplicationSkills(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
   <Sidebar></Sidebar>
   <div>
      <div>
        <h2>Application Skills:</h2>
        <ul>
          {applicationSkills.map((skill) => (
            <li key={skill.id}>{skill.skillsets}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Job Skills:</h2>
        <ul>
          {jobSkills.map((job) => (
            <li key={job.id}>{job.skillsets}</li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Shortlist;
