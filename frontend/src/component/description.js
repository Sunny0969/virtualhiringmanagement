import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SetPopupContext } from "../App";
import axios from "axios";
import isAuth, { userType } from "../lib/isAuth";
import apiList from "../lib/apiList";
import "../index.css";
import "../jobDetailStyles.css";

function calculateDaysDifference(dateOfPosting) {
  const currentDate = new Date();
  const postingDate = new Date(dateOfPosting);
  const timeDifference = currentDate - postingDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}
const JobDetailComponent = () => {
  const [jobDes, setjobDes] = useState({
    name: "",
    title: "",
    jobType: "",
    salary: "",
    dateOfPosting: "",
    maxPositions: "",
    rating: "",
    skillsets: [],
    deadline: "",
  });
  const [profileDetails, setProfileDetails] = useState({
    name: "",
  });
  useEffect(() => {
    // Fetch user data
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setProfileDetails(response.data);
        if (userType() === "recruiter" || userType() === "applicant") {
          return axios.get(apiList.jobs, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        }
      })
      .then((response) => {
        if (response) {
          setjobDes(response.data);
        }
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  const handleClick = () => {
    console.log("Button clicked!");
    window.location.href = "/home";
  };
  return (
    //component code...

    <div>
      <div class="jobHistory">
        <div className="curved-section">
          <h1 class="jobdetailshead">Job Detail</h1>
        </div>
        <section className="section">
          <div className="column">
            <img className="column_img" src="job_detail.jpeg" alt="Image" />
            <br></br>
            <label className="para1">
              {" "}
              {jobDes.length > 0 ? jobDes[0].title : ""}
            </label>
            <br></br>
            <div class="vacancydiv">
              <img src="employee.png" id="vacanyimg"></img>
              <label className="vacancy">
                {" "}
                {jobDes.length > 0 ? jobDes[0].maxPositions : ""} Vacancy
              </label>
              <br></br>
            </div>
          </div>
          <div className="column form">
            <h2 class="jobOverview">Job Overview</h2>
            <div class="details" id="circle">
              <div className="sub-menu1">
                <img src="employee.png" alt="img" className="user-pic" />
                <div className="user-info1">
                  <h4>Job tittle:</h4>
                  <label className="para">
                    {jobDes.length > 0 ? jobDes[0].title : ""}
                  </label>
                </div>
              </div>
            </div>
            <div class="details" id="circle">
              <div className="sub-menu1">
                <img src="job-type.PNG" alt="img" className="user-pic" />
                <div className="user-info1">
                  <h4>Job Type:</h4>
                  <label className="para">
                    {jobDes.length > 0 ? jobDes[0].jobType : ""}
                  </label>
                </div>
              </div>
            </div>
            <div class="details" id="circle">
              <div className="sub-menu1">
                <img src="salary.png" alt="img" className="user-pic" />
                <div className="user-info1">
                  <h4> Salary:</h4>
                  <label className="para">
                    {jobDes.length > 0 ? jobDes[0].salary : ""} $/month
                  </label>
                </div>
              </div>
            </div>
            <div class="details" id="circle">
              <div className="sub-menu1">
                <img src="schedule.png" alt="img" className="user-pic" />
                <div className="user-info1">
                  <h4> Posting Date:</h4>
                  <label className="para">
                    {jobDes.length > 0
                      ? new Date(jobDes[0].dateOfPosting).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : ""}
                  </label>
                </div>
              </div>
            </div>
            <div class="details" id="circle">
              <div className="sub-menu1">
                <img src="location.png" alt="img" className="user-pic" />
                <div className="user-info1">
                  <h4>Location:</h4>
                  <label className="para">Pakistan</label>
                </div>
              </div>
            </div>
            <div class="details" id="circle">
              <div className="sub-menu1">
                <img src="deadline.png" alt="img" className="user-pic" />
                <div className="user-info1">
                  <h4> Deadline:</h4>
                  <label className="para">
                    {jobDes.length > 0
                      ? new Date(jobDes[0].deadline).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : ""}
                  </label>
                </div>
              </div>
            </div>
            <button className="submit-button" type="submit">
              Apply
            </button>
          </div>
        </section>
      </div>

      <div class="mb-5">
        <h3 class="mb-3">Job description</h3>
        <p class="paragraph">
          We are seeking a highly skilled and motivated Software Engineer to
          join our dynamic development team. As a Software Engineer, you will be
          responsible for designing, implementing, and maintaining high-quality
          software solutions. You will work closely with cross-functional teams
          to understand requirements, develop efficient code, and ensure the
          overall success of our software projects. This is an excellent
          opportunity to contribute to cutting-edge technology in a fast-paced
          and collaborative environment.
        </p>
        <div class="mb-3">
          <span>
            <b>Skills Required</b>
          </span>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.5em" }}>
            {jobDes.length > 0
              ? jobDes[0].skillsets.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))
              : ""}
          </ul>
        </div>

        <section className="section_main">
          <div className="column_left">
            <h4 class="mb-3">Qualification</h4>
            <ul class="list-unstyled">
              <li>
                <i></i>Bachelor's or Master's degree in Computer Science,
                Software Engineering,AI Engineering,Robotics or a related field.
              </li>
              <li>
                <i></i>Proven experience in software development, preferably in
                a fast-paced and agile environment.
              </li>
              <li>
                <i></i>Strong programming skills in one or more programming
                languages such as Java, C++, Python, or JavaScript.
              </li>
              <li>
                <i></i>Proficiency in software development tools, such as IDEs,
                version control systems, and bug tracking systems.
              </li>
              <li>
                <i></i>Familiarity with web development technologies and
                frameworks (e.g., HTML, CSS, JavaScript, React, Angular) is a plus.
              </li>
              <li>
                <i></i>Strong communication and collaboration skills, with the
                ability to work effectively in a team environment.
              </li>
            </ul>
          </div>

          <div className="column_right1">
            <h2>Comapny info</h2>
            <br></br>
            <form>
              <label htmlFor="field1">Phone: </label>
              <br></br>
              <input type="text" id="field1" name="field1" />
              <br />
              <br />

              <label htmlFor="field2">Email: </label>
              <br></br>
              <input type="text" id="field2" name="field2" />
              <br />
              <br />

              <label htmlFor="field3">Website: </label>
              <br></br>
              <input type="text" id="field3" name="field3" />
              <br />
              <br />

              <label htmlFor="field4">Location: </label>
              <br></br>
              <input type="text" id="field4" name="field4" />
              <br />
              <br />

              <input type="submit" value="view profile" />
            </form>
          </div>
        </section>
        <div class="jobrequirements">
          <h3>Job Requirements:</h3>
          <ol class="jobrequirements">
            <li>
              <h4>Education</h4>{" "}
              <ul>
                <li>
                  Bachelor's or Master's degree in Computer Science, Software
                  Engineering,AI Engineering,Robotics or a related field.
                </li>
              </ul>
            </li>
            <li>
              <h4>Experience:</h4>
              <ul>
                <li>
                  Proven experience in software development, preferably in a
                  fast-paced and agile environment.
                </li>
                <li>
                  Demonstrated ability to design, develop, and maintain software
                  applications.
                </li>
              </ul>
            </li>
            <li>
              <h4>Programming Skills:</h4>
              <ul>
                <li>
                  Strong proficiency in one or more programming languages such
                  as Java, C++, Python, or JavaScript.
                </li>
                <li>
                  Familiarity with modern software development frameworks and
                  libraries.
                </li>
              </ul>
            </li>
            <li>
              <h4>Technical Knowledge:</h4>
              <ul>
                <li>
                  Solid understanding of software engineering principles,
                  algorithms, and data structures.
                </li>
                <li>
                  Proficiency in software development tools, such as IDEs,
                  version control systems, and bug tracking systems.
                </li>
                <li>Experience with database systems and SQL.</li>
              </ul>
            </li>
            <li>
              <h4>Web Development:</h4>
              <ul>
                <li>
                  Familiarity with web development technologies and frameworks
                  (e.g., HTML, CSS, JavaScript, Angular, React).
                </li>
                <li>
                  Experience with front-end frameworks (e.g., React, Angular,
                  Vue.js) is a plus.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <div class="rowbutton">
        <span class="label">Share this job:</span>
        <button class="socialIconsButton">Facebook</button>
        <button class="socialIconsButton">Google</button>
        <button class="socialIconsButton">Linkedin</button>
      </div>
    </div>
  );
};

export default JobDetailComponent;
