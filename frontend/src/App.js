import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Grid,
  makeStyles,
  // Other Material-UI components...
} from "@material-ui/core";

// Import components
import {
  ErrorPage,
  Navbar,
  Login,
  Logout,
  Signup,
  Home,
  HomeJobs,
  Applications,
  Profile,
  CreateJobs,
  MyJobs,
  JobApplications,
  AcceptedApplicants,
  RecruiterProfile,
  AdminDashboard,
  MessagePopup,
  Body,
  Team,
  Shortlist,
  Calender,
  ForgotPasswordPage,
  Description,
  ContactUs,
  imagePage,
  Quizz,
  FaceMovementRecorder,
  InterviewForm,
} from "./component";

import isAuth, { userType } from "./lib/isAuth";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [loggedin, setLoggedin] = useState(isAuth());

  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  useEffect(() => {
    setLoggedin(isAuth());
  }, []);

  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={setPopup}>
        <>
          <Navbar />
          <Grid container direction="column">
            <Grid item className={classes.body}>
              <Switch>
                {loggedin ? (
                  <>
                    <Route exact path="/">
                      <HomeJobs />
                    </Route>
                    {/* Other logged-in routes... */}
                  </>
                ) : (
                  <>
                    <Route exact path="/signup">
                      <Signup />
                    </Route>
                    {/* Other non-logged-in routes... */}
                  </>
                )}
                <Route>
                  <ErrorPage />
                </Route>
              </Switch>
            </Grid>
          </Grid>
          <MessagePopup
            open={popup.open}
            setOpen={(status) =>
              setPopup({
                ...popup,
                open: status,
              })
            }
            severity={popup.severity}
            message={popup.message}
          />
        </>
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;
