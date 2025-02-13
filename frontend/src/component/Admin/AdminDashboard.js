import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  makeStyles,
  Link,
  useTheme,
  Paper,
  Toolbar,
} from "@material-ui/core";
import GroupIcon from "@mui/icons-material/Group";
import Sidebar from "./sidebar";
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
  const classes = useStyles();
  const theme = useTheme();
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  

  return (
    <Toolbar>
      <Sidebar></Sidebar>
      {/* <section>
        <Paper elevation={3} className="dashboard-box">
          <div className="row">
            <div className="column">
              <div className="dashboard-box-icon">
                <GroupIcon fontSize="large" />
              </div>
              <h3>Total Candidates</h3>
              <p >{totalCandidates}</p>
            </div>
           
            <div className="column">
              <div className="dashboard-box-icon">
                <GroupIcon fontSize="large" />
              </div>
              <h3>Total Applications</h3>
              <p className="total">{totalApplications}</p>
            </div>
          </div>
        </Paper>
      </section> */}
    </Toolbar>
  );
};

export default AdminDashboard;
