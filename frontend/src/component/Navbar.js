import { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React from "react";
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import LogoutIcon from '@mui/icons-material/Logout';
// import InfoIcon from '@mui/icons-material/Info';
import { useHistory } from "react-router-dom";
import { SetPopupContext } from "../App";
import axios from "axios";
import isAuth, { userType } from "../lib/isAuth";
import apiList from "../lib/apiList";
import "../index.css";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [notification, setNotification] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const setPopup = useContext(SetPopupContext);
  const [jobDetails, setJobDetails] = useState({
    name: "",
    title: "",
    dateofposting: "",
    jobtype: "",
  });
  const [profileDetails, setProfileDetails] = useState({
    name: "",
  });
  const newNotificationCount = notification.filter(notification => notification.isNew).length;
  
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
        // if (userType() === "recruiter" || userType() === "applicant") {
          return axios.get(apiList.jobs, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        }
      //}
        )
      .then((response) => {
        //if (response) {
          setJobDetails(response.data);
          if (response.data.length > 0) {
            const latestJobs = response.data.slice(-3);
            setNotification(latestJobs);
            setShowNotification(true);
          }
        //}
      })
    .catch((err) => console.log(err.response.data));
  }, []);

  const toggle = () => {
    let subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu");
  };
  const toggle1 = () => {
    let noti = document.getElementById("noti");
    noti.classList.toggle("open-menu");
  };
  const handleClick = (location) => {
    history.push(location);
  };
  return (
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" style={{ color: "inherit" }}>
            <img src="logo.png" class="mainlogo"></img>
          </Link>
        </Typography>
        {isAuth() ? (
          userType() === "recruiter" ? (
            <>
              <Button color="inherit" onClick={() => handleClick("/home")}>
                Home
              </Button>
              <Button color="inherit" onClick={() => handleClick("/addjob")}>
                Add Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/myjobs")}>
                My Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/employees")}>
                Employees
              </Button>
              <img
                src="virtual.jpg"
                alt="Virtual Hiring"
                className="user-pic"
                onClick={toggle}
              />
              <div class="sub-menu-wrap" id="subMenu">
                <div class="sub-menu">
                  <div class="user-info">
                    <img
                      src="virtual.jpg"
                      alt="Virtual Hiring"
                      class="user-pic"
                    />
                    <h2>
                      <p>Welcome {profileDetails.name}!</p>
                    </h2>
                  </div>
                  <hr />
                  <a href="/profile" class="sub-menu-link">
                    <img src="logout.jpg" class="user-pic-inside" />
                    Profile
                  </a>
                  <span></span>
                  <a href="#" class="sub-menu-link">
                    <img src="about.jpg" class="user-pic-inside" />
                    About us
                  </a>
                  <span></span>
                  <a href="/logout" class="sub-menu-link">
                    <img src="profile.jpg" class="user-pic-inside" />
                    Logout
                  </a>
                  <span></span>
                </div>
              </div>
            </>
          ) : userType() === "Admin" ? (
            <>
              <Button color="inherit" onClick={() => handleClick("/adminDashboard")}>
                Admin Home
              </Button>
              <img
                src="virtual.jpg"
                alt="Virtual Hiring"
                className="user-pic"
                onClick={toggle}
              />
              <div class="sub-menu-wrap" id="subMenu">
                <div class="sub-menu">
                  <div class="user-info">
                    <img
                      src="virtual.jpg"
                      alt="Virtual Hiring"
                      class="user-pic"
                    />
                    <h4>Welcome {profileDetails.name}!</h4>
                  </div>
                  <hr />
                  <a href="/profile" class="sub-menu-link">
                    <img src="logout.jpg" class="user-pic-inside" />
                    Profile
                  </a>
                  <span></span>
                  <a href="#" class="sub-menu-link">
                    <img src="about.jpg" class="user-pic-inside" />
                    About us
                  </a>
                  <span></span>
                  <a href="/logout" class="sub-menu-link">
                    <img src="profile.jpg" class="user-pic-inside" />
                    Logout
                  </a>
                  <span></span>
                </div>
              </div>
            </>
          ) : (
            <>
              <button className="notificationbutton" onClick={toggle1}>
                <svg viewBox="0 0 448 512" class="bell">
                  <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
                </svg>
              </button>
              <div className="sub-menu-wrap1" id="noti">
  
  {notification.map((notification) => (
    <div className="sub-menu1" key={notification.id}>
      <img src="1.jpg" alt="img" className="user-pic" />
      <div className="user-info1">
        <h4 onClick={() => (window.location.href = "/home")}>
          {notification.title}
        </h4>
        <p>
          {new Date(notification.dateOfPosting).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  ))}
</div>
              <Button color="inherit" onClick={() => handleClick("/home")}>
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => handleClick("/applications")}
              >
                Applications
              </Button>
              <Button
                color="inherit"
                onClick={() => handleClick("/resumebuilder")}
              >
                Resume Builder
              </Button>
              {/* <Button
                color="inherit"
                onClick={() => handleClick("/quizz")}
              >
                Attempt Test
              </Button> */}
              <img
                src="virtual.jpg"
                alt="Virtual Hiring"
                className="user-pic"
                onClick={toggle}
              />
              <div class="sub-menu-wrap" id="subMenu">
                <div class="sub-menu">
                  <div class="user-info">
                    <img
                      src="virtual.jpg"
                      alt="Virtual Hiring"
                      class="user-pic"
                    />
                    <h4>Welcome {profileDetails.name}!</h4>
                  </div>
                  <hr />
                  <a href="/profile" class="sub-menu-link">
                    <img src="logout.jpg" class="user-pic-inside" />
                    Profile
                  </a>
                  <span></span>
                  <a href="#" class="sub-menu-link">
                    <img src="about.jpg" class="user-pic-inside" />
                    About us
                  </a>
                  <span></span>
                  <a href="/logout" class="sub-menu-link">
                    <img src="profile.jpg" class="user-pic-inside" />
                    Logout
                  </a>
                  <span></span>
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <Button color="inherit" onClick={() => handleClick("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
