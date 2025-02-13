import { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
  MenuItem,
  Input,
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
  },
  inputBox: {
    width: "400px",
  },
  submitButton: {
    width: "400px",
  },
}));
const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [showNotification, setShowNotification] = useState(false);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    name: "",
    contactNumber: "",
    confirmPassword: "",
  });

  const [signupDetailsAdmin, setSignupDetailsAdmin] = useState({
    type: "admin",
    email: "",
    password: "",
    name: "",
  });
  //const [signupDetails, setSignupDetails]=useState({

  //})
  const [phone, setPhone] = useState("");

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    confirmPassword: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
  });
  const handleSignup = () => {
    const newNotification = {
      id: showNotification.length + 1,
      type: "signup",
      title: "Thank you for signing up!",
      dateOfPosting: new Date().toISOString(),
    };
    setShowNotification([newNotification, ...showNotification]);
    // Additional logic for handling user signup...
  };
  const handleInput = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    });
  };
  
  const handleLogin = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    console.log(education);

    let updatedDetails = {
      ...signupDetails,
      signupDetailsAdmin,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };
    // setSignupDetailsAdmin(updatedDetails);
    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  const handleLoginRecruiter = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      ...signupDetails,
    };
    if (phone !== "") {
      updatedDetails = {
        ...signupDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...signupDetails,
        contactNumber: "",
      };
    }

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    console.log(updatedDetails);

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };
  //Admin....................................................

  const handleLoginAdmin = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      ...signupDetailsAdmin,
    };
    setSignupDetailsAdmin(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });
    console.log(updatedDetails);

    if (verified) {
      axios
        .post(apiList.signupDetailsAdmin, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  //.........................................................

  return loggedin ? (
    <Redirect to="/login" />
  ) : (
    <Paper elevation={3} className={classes.body} class="loginformback">
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h2" class="title">
            Signup
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            select
            label="Category"
            variant="outlined"
            className={classes.inputBox}
            value={signupDetails.type}
            onChange={(event) => {
              handleInput("type", event.target.value);
            }}
          >
            <MenuItem value="applicant">Applicant</MenuItem>
            <MenuItem value="recruiter">Company</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
        <TextField
  label="Full Name"
  value={signupDetails.name}
  onChange={(event) => handleInput("name", event.target.value)}
  className={classes.inputBox}
  error={inputErrorHandler.name.error}
  helperText={inputErrorHandler.name.message}
  onBlur={(event) => {
    const inputValue = event.target.value;
    if (inputValue === "") {
      handleInputError("name", true, "Name is required");
    } else if (/^[A-Za-z]*$/.test(inputValue)) {
      handleInput("name", inputValue);
      handleInputError("name", false, "");
    } else {
      handleInputError("name", true, "Only alphabetic characters are allowed");
    }
  }}
  variant="outlined"
/>

{/* <InputControl
  label="Full Name"
  value={signupDetails.name}
  onChange={(event) => {
    const inputValue = event.target.value;
    // Use a regular expression to check if the input consists of only alphabetic characters
    if (/^[A-Za-z]*$/.test(inputValue) || inputValue === '') {
      handleInput("name", inputValue);
    }
  }}
  className={classes.inputBox}
  error={inputErrorHandler.name.error}
  helperText={inputErrorHandler.name.message}
  onBlur={(event) => {
    if (event.target.value === "") {
      handleInputError("name", true, "Name is required");
    } else {
      handleInputError("name", false, "");
    }
  }}
  variant="outlined"
/>
 */}

        </Grid>
        <Grid item>
          <EmailInput
            label="Email"
            value={signupDetails.email}
            onChange={(event) => handleInput("email", event.target.value)}
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
            className={classes.inputBox}
            required={true}
          />
        </Grid>
        <Grid>
          <PasswordInput
            label="Password"
            value={signupDetails.password}
            onChange={(event) => handleInput("password", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.password.error}
            helperText={inputErrorHandler.password.message}
            onBlur={(event) => {
              const password = event.target.value;
              if (password === "") {
                handleInputError("password", true, "Password is required");
              } else if (password.length < 6) {
                handleInputError(
                  "password",
                  true,
                  "Password must be at least 6 characters long"
                );
              } else {
                handleInputError("password", false, "");
              }
            }}
          />
        </Grid>{" "}
        &nbsp;
        <Grid>
          <PasswordInput
            label="Confirm Password"
            value={signupDetails.confirmPassword}
            onChange={(event) =>
              handleInput("confirmPassword", event.target.value)
            }
            className={classes.inputBox}
            error={inputErrorHandler.confirmPassword.error}
            helperText={inputErrorHandler.confirmPassword.message}
            onBlur={(event) => {
              const confirmPassword = event.target.value;
              const password = signupDetails.password;
              if (confirmPassword === "") {
                handleInputError(
                  "confirmPassword",
                  true,
                  "Confirm Password is required"
                );
              } else if (confirmPassword !== password) {
                handleInputError(
                  "confirmPassword",
                  true,
                  "Passwords do not match"
                );
              } else {
                handleInputError("confirmPassword", false, "");
              }
            }}
          />
        </Grid>
        {signupDetails.type === "applicant" ? (
          <>
            {/* <MultifieldInput
              education={education}
              setEducation={setEducation}
            /> */}
            {/* <Grid item>
              <ChipInput
                className={classes.inputBox}
                label="Skills"
                variant="outlined"
                helperText="Press enter to add skills"
                onChange={(chips) =>
                  setSignupDetails({ ...signupDetails, skills: chips })
                }
              />
            </Grid> */}
            {/* <Grid item>
              <FileUploadInput
                className={classes.inputBox}
                label="Resume (.pdf)"
                icon={<DescriptionIcon />}
                uploadTo={apiList.uploadResume}
                handleInput={handleInput}
                identifier={"resume"}
                
              />
            </Grid> */}
            {/* <Grid item>
              <FileUploadInput
                className={classes.inputBox}
                label="Profile Photo (.jpg/.png)"
                icon={<FaceIcon />}
                uploadTo={apiList.uploadProfileImage}
                handleInput={handleInput}
                identifier={"profile"}
              />
            </Grid> */}
          </>
        ) : signupDetails.type === "recruiter" ? (
          <>
            <Grid item style={{ width: "100%" }}>
              <TextField
                label="Bio (upto 250 words)"
                multiline
                rows={8}
                style={{ width: "100%" }}
                variant="outlined"
                value={signupDetails.bio}
                onChange={(event) => {
                  if (
                    event.target.value.split(" ").filter(function (n) {
                      return n != "";
                    }).length <= 250
                  ) {
                    handleInput("bio", event.target.value);
                  }
                }}
              />
            </Grid>
            <Grid item>
              <PhoneInput
                country={"pk"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            class="signupbutton"
            onClick={() => {
              signupDetails.type === "applicant"
                ? handleLogin()
                : setSignupDetailsAdmin.type === "admin"
                ? handleLoginAdmin()
                : handleLoginRecruiter();
            }}
            className={classes.submitButton}
          >
            Signup
          </Button>
        </Grid>
        <p>
          Already have an acount ?<a href="/login"> Sign in </a>
        </p>
      </Grid>
    </Paper>
  );
};

export default Login;