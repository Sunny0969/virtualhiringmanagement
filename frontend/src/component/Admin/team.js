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
  import 'bootstrap/dist/css/bootstrap.min.css'
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
  
  const Team = (props) => {
    const [users, setUsers] = useState([]);
    const [jobs, setjobs] = useState([]);

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
            setjobs(response.data);
            if (response.data.length > 0) {
              const latestJobs = response.data.slice(-3);
              setNotification(latestJobs);
              setShowNotification(true);
            }
          })
          .catch((err) => console.log(err));
      }, []);
  
    return (
    <>
        <Sidebar></Sidebar>
      
      <div className="w-100 d-flex justify-content-center align-items-center">
        <div className="w-50">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
  <tr>
    <td>      
      {users.name}
        {/* {
          users.length > 0 ? (
            users.map(            users.name
              )
            )
            : null
            } */}
      </td>
  </tr>
</tbody>
          </table>
        </div>
      </div>
    </>
  );
  };
  
  export default Team;
  