import {
    Grid,
    makeStyles,
    Link,
    useTheme,
    Paper,
  } from "@material-ui/core";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import isAuth, { userType } from "../../lib/isAuth";
  import Sidebar from "./sidebar";
  import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
  import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
  import GroupIcon from '@mui/icons-material/Group';
  import HomeIcon from "@material-ui/icons/Home";
  import { useHistory } from "react-router-dom";
  import { SetPopupContext } from "../../App";
  import LiveHelpIcon from '@mui/icons-material/LiveHelp';
  import apiList from "../../lib/apiList";
  import "../../index.css";
  import "./Sidebar.css";
  
  const useStyles = makeStyles((theme) => ({
    body: {
      height: "inherit",
    },
    popupDialog: {
      height: "100%",
      display: "flex",
    },
  }));
  const AdminDashboard = (props) => {
    const [totalCandidates, setTotalCandidates] = useState(0);
  
    const [information, setInformation] = useState({
      name: "",
      email: "",
    });
  
    useEffect(() => {
      axios
        .get(apiList.user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setInformation(response.data);
          if (userType() === "recruiter" || userType() === "applicant") {
            return axios.get(apiList.jobs, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
          }
        })
        .then((response) => {
          setInformation(response.data);
    })
        .catch((err) => {if (err.response) {
          console.log(err.response.data);
          
        } else {
          console.log(err); // Handle other errors
        }});
    }, []);
  
    return (
      <div class="sidebar">
        <img src="1.jpg" class="adminimage"></img>
          <p class ="name">Welcome <br></br>{information.name}</p>
          <ul>
            <ui>
            <a href="/admindashboard"class="icons"><HomeIcon></HomeIcon> Dashboard</a>
            </ui>
            <ui>
            <p class ="data1">Data</p>
            </ui>
            <ui>
              <a href="/team"class="icons"><GroupIcon></GroupIcon> Manage Team</a>
            </ui>
            <ui>
            <a href="/contactus"class="icons"><PermContactCalendarIcon></PermContactCalendarIcon> Contact Us</a>
            </ui>
            <ui>
            <a href="/shortlistcandidates"class="icons"><PermContactCalendarIcon></PermContactCalendarIcon> Shortlist Candidates</a>
            </ui>
            <ui>
            <p class ="data1">Pages</p>
            </ui>
            <ui>
              <a href="/calender"class="icons"><CalendarMonthIcon> </CalendarMonthIcon> Calender</a>
            </ui>
            <ui>
            <a href="#clients"class="icons"><LiveHelpIcon></LiveHelpIcon> FAQ</a>
            </ui>
          </ul>
  </div>
      );
  };
  export default AdminDashboard;
  