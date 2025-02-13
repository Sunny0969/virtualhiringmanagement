import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
} from "@material-ui/core";
import reactRouterDom, { useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";
import "../../index.css";
import React from "react";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundImage: "/frontend/public/virtual.jpg",
    backgroundColor: "#",
    height: "inherit",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  jobTileOuter: {
    padding: "25px",
    // alignContent: "center",
    // textAlign: "center",
    margin: "4px 0",
    // boxSizing: "border-box",
    width: "80%",
    // borderStyle:'solid',
    // borderWidth: '1px'
    marginLeft: "150px",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
}));

//.........................................................
//Selection Tags
const AnimatedTagsInput = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const options = ["UI/UX", "React", "DevOps", "Backend"];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
      setInputValue("");
    }
  };

  const handleTagRemove = (option) => {
    setSelectedOptions(
      selectedOptions.filter((selectedOption) => selectedOption !== option)
    );
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="animated-tags-input-container">
      <div className="tags-container">
        {selectedOptions.map((option) => (
          <div key={option} className="tag">
            {option}
            <button onClick={() => handleTagRemove(option)}>X</button>
          </div>
        ))}
        <input
          type="text"
          placeholder="Select Tags"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleDropdownToggle}
        />
        {dropdownVisible && (
          <div className="options-container">
            {options.map((option) => (
              <div
                key={option}
                className="option"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

//.........................................................

const JobTile = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const { job, getData } = props;
  const setPopup = useContext(SetPopupContext);

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [jobDetails, setJobDetails] = useState(job);

  console.log(jobDetails);

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleClick = (location) => {
    history.push(location);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleDelete = () => {
    console.log(job._id);
    axios
      .delete(`${apiList.jobs}/${job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
        handleClose();
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  const handleJobUpdate = () => {
    axios
      .put(`${apiList.jobs}/${job._id}`, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
        handleCloseUpdate();
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        handleCloseUpdate();
      });
  };

  const postedOn = new Date(job.dateOfPosting);

  return (
    // <div class="categories">
    //     <span class="sub-heading">Categories work waiting for you</span>
    //     <h2 class="mb-4"><span>Current </span>Job Posts</h2>
    // </div>
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container>
        <Grid container item xs={9} direction="column">
          <Grid item>
            <Typography variant="h5">
              {job.title}
              <label item className="job-type">
                {job.jobType}
              </label>
            </Typography>
          </Grid>

          {/* <Grid item>
            <Rating value={job.rating !== -1 ? job.rating : null} readOnly />
          </Grid> */}

          {/* <Grid item>Salary: ${job.salary} per month</Grid> */}
          {/* <Grid item>
            Duration :{" "}
            {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
          </Grid> */}
          {/* <Grid item>Date Of Posting: {postedOn.toLocaleDateString()}</Grid> */}
          {/* <Grid item>Number of Applicants: {job.maxApplicants}</Grid> */}
          {/* <Grid item>
            Remaining Number of Positions:{" "}
            {job.maxPositions - job.acceptedCandidates}
          </Grid> */}
          <Grid item>
            <img src="skill.png" alt="mage" class="skillimage" />

            {job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <button id="applybutton" onClick={() => handleClick("/description")}>
            {" "}
            Description
          </button>{" "}
        </Grid>
        {/* <Grid item container direction="column" xs={3}>
          <Grid item xs>
            <Button
              variant="contained"
              color="primary"
              className={classes.statusBlock}
              onClick={() => handleClick(`/job/applications/${job._id}`)}
            >
              View Applications
            </Button>
          </Grid>
          <Grid item>
              <Button
              variant="contained"
              className={classes.statusBlock}
              onClick={() => {
                setOpenUpdate(true);
              }}
              style={{
                background: "#FC7A1E",
                color: "#fff",
              }}
            >
              Update Details 
            </Button> 
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.statusBlock}
              onClick={() => {
                setOpen(true);
              }}
            >
              Delete Job
            </Button>
          </Grid>
            </Grid> */}
      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Are you sure?
          </Typography>
          <Grid container justify="center" spacing={5}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        className={classes.popupDialog}
      >
        <Paper
          style={
            {
              // padding: "20px",
              // outline: "none",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // minWidth: "30%",
              // alignItems: "center",
            }
          }
        >
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Update Details
          </Typography>
          <Grid
            container
            direction="column"
            spacing={3}
            style={{ margin: "10px" }}
          >
            <Grid item>
              <TextField
                label="Application Deadline"
                type="datetime-local"
                value={jobDetails.deadline.substr(0, 16)}
                onChange={(event) => {
                  handleInput("deadline", event.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Maximum Number Of Applicants"
                type="number"
                variant="outlined"
                value={jobDetails.maxApplicants}
                onChange={(event) => {
                  handleInput("maxApplicants", event.target.value);
                }}
                InputProps={{ inputProps: { min: 1 } }}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Positions Available"
                type="number"
                variant="outlined"
                value={jobDetails.maxPositions}
                onChange={(event) => {
                  handleInput("maxPositions", event.target.value);
                }}
                InputProps={{ inputProps: { min: 1 } }}
                fullWidth
              />
            </Grid>
          </Grid>
          {/* <Grid container justify="center" spacing={5}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleJobUpdate()}
              >
                Update
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleCloseUpdate()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid> */}
        </Paper>
      </Modal>
    </Paper>
  );
};

const FilterPopup = (props) => {
  const classes = useStyles();
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
  return (
    <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
      <Paper
        style={{
          padding: "50px",
          outline: "none",
          minWidth: "50%",
        }}
      >
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Job Type
            </Grid>
            <Grid
              container
              item
              xs={9}
              justify="space-around"
              // alignItems="center"
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="fullTime"
                      checked={searchOptions.jobType.fullTime}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Full Time"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="partTime"
                      checked={searchOptions.jobType.partTime}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Part Time"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="wfh"
                      checked={searchOptions.jobType.wfh}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Work From Home"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Salary
            </Grid>
            <Grid item xs={9}>
              <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => {
                  return value * (100000 / 100);
                }}
                marks={[
                  { value: 0, label: "0" },
                  { value: 100, label: "100000" },
                ]}
                value={searchOptions.salary}
                onChange={(event, value) =>
                  setSearchOptions({
                    ...searchOptions,
                    salary: value,
                  })
                }
              />
            </Grid>
          </Grid>
          {/* <Grid container item alignItems="center">
            <Grid item xs={3}>
              Duration
            </Grid>
            <Grid item xs={9}>
              <TextField
                select
                label="Duration"
                variant="outlined"
                fullWidth
                value={searchOptions.duration}
                onChange={(event) =>
                  setSearchOptions({
                    ...searchOptions,
                    duration: event.target.value,
                  })
                }
              >
                <MenuItem value="0">All</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
              </TextField>
            </Grid>
          </Grid> */}
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Sort
            </Grid>
            <Grid item container direction="row" xs={9}>
              <Grid
                item
                container
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="salary"
                    checked={searchOptions.sort.salary.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          salary: {
                            ...searchOptions.sort.salary,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="salary"
                  />
                </Grid>
                <Grid item>
                  <label for="salary">
                    <Typography>Salary</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.salary.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          salary: {
                            ...searchOptions.sort.salary,
                            desc: !searchOptions.sort.salary.desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort.salary.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="duration"
                    checked={searchOptions.sort.duration.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          duration: {
                            ...searchOptions.sort.duration,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="duration"
                  />
                </Grid>
                <Grid item>
                  <label for="duration">
                    <Typography>Duration</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.duration.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          duration: {
                            ...searchOptions.sort.duration,
                            desc: !searchOptions.sort.duration.desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort.duration.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="rating"
                    checked={searchOptions.sort.rating.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          rating: {
                            ...searchOptions.sort.rating,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="rating"
                  />
                </Grid>
                <Grid item>
                  <label for="rating">
                    <Typography>Rating</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.rating.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          rating: {
                            ...searchOptions.sort.rating,
                            desc: !searchOptions.sort.rating.desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort.rating.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() => getData()}
              >
                Apply
              </Button>
            </Grid>
          }
        </Grid>
      </Paper>
    </Modal>
  );
};

const MyJobs = (props) => {
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
      duration: {
        status: false,
        desc: false,
      },
      rating: {
        status: false,
        desc: false,
      },
    },
  });

  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [`myjobs=1`];
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`];
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [...searchParams, `jobType=Full%20Time`];
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [...searchParams, `jobType=Part%20Time`];
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, `jobType=Work%20From%20Home`];
    }
    // eslint-disable-next-line eqeqeq
    if (searchOptions.salary[0] != 0) {
      searchParams = [
        ...searchParams,
        `salaryMin=${searchOptions.salary[0] * 1000}`,
      ];
    }
    // eslint-disable-next-line eqeqeq
    if (searchOptions.salary[1] != 100) {
      searchParams = [
        ...searchParams,
        `salaryMax=${searchOptions.salary[1] * 1000}`,
      ];
    }
    // eslint-disable-next-line eqeqeq
    if (searchOptions.duration != "0") {
      searchParams = [...searchParams, `duration=${searchOptions.duration}`];
    }

    let asc = [],
      desc = [];

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });
    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");
    console.log(queryString);
    let address = apiList.homejobs;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    console.log(address);

    axios
      .get(address)
      .then((response) => {
        console.log("Myjobs:  ", response.data);
        setJobs(response.data);
      })
      .catch((err) => {
        // console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };
  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{
          padding: "0px",
          minHeight: "93vh",
          backgroundColor: "#f8f8f8",
        }}
      >
        <div class="bg-img-container">
  <img src="1.jpg" class="bg-img" />
  <div class="heading">
    <h4>
      <strong> Largest Job</strong>
    </h4>
    <p>
      {" "}
      Site <br></br>on the Net
    </p>
  </div>
  <div class="search-bar-container">
    <TextField
      label="Search Jobs"
      value={searchOptions.query}
      onChange={(event) =>
        setSearchOptions({
          ...searchOptions,
          query: event.target.value,
        })
      }
      onKeyPress={(ev) => {
        if (ev.key === "Enter") {
          getData();
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton onClick={() => getData()}>
              <SearchIcon style={{ color: "#4caf50" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      style={{
        width: "100%", /* Adjust the width to 100% for responsiveness */
        borderRadius: "5px",
      }}
      variant="outlined"
    />
    <IconButton onClick={() => setFilterOpen(true)}>
      <FilterListIcon style={{ color: "#4caf50" }} />
    </IconButton>
  </div>
</div>
<section class="DisplaySearchInformation">

</section>
        <section class="data">
          <div class="column">
            <img src="resume.PNG" class="img1"></img>
            <div class="media_body">
              <h3 class="heading_mb3">Search Millions of Jobs</h3>
              <p>
                {" "}
                Explore endless opportunities <br></br> find your dream job on
                our Virtual Hiring System!
              </p>
            </div>
          </div>
          <div class="column">
            <img src="collaboration.PNG" class="img1"></img>
            <div class="media_body">
              <h3 class="heading_mb3">Easy to Manage Jobs</h3>
              <p>
                {" "}
                Simplify job management with our user-friendly Virtual Hiring
                System.
              </p>
            </div>
          </div>
          <div class="column">
            <img src="promotion.PNG" class="img1"></img>
            <div class="media_body">
              <h3 class="heading_mb3">Top Careers</h3>
              <p>
                {" "}
                Discover the path to Top Careers with our Virtual Hiring system.{" "}
              </p>
            </div>
          </div>
          <div class="column">
            <img src="employee.PNG" class="img1"></img>
            <div class="media_body">
              <h3 class="heading_mb3">Search Expert Candidates</h3>
              <p>
                {" "}
                Find expert candidates at your fingertips with our Virtual
                Hiring system.
              </p>
            </div>
          </div>
        </section>

        <section class="Jobsdata">
          <div class="categories">
            <span class="sub-heading">Categories work waiting for you</span>
            <h2 class="mb-4">
              <span>Current </span>Job Posts
            </h2>
          </div>
          <div class="row">
            <div class="col-md-3">
              <ul class="category">
                <li>
                  <button
                    class="btn1"
                    onClick={() => {
                      window.location.href = "/Home";
                    }}
                  >
                    Accounting and Finance
                  </button>
                </li>
                <li>
                  <button
                    class="btn1"
                    onClick={() => {
                      window.location.href = "/Home";
                    }}
                  >
                    Software Development
                  </button>
                </li>
                <li>
                  <button
                    class="btn1"
                    onClick={() => {
                      window.location.href = "/Home";
                    }}
                  >
                    Mechanical Enginner
                  </button>
                </li>
              </ul>
            </div>
            <div class="col-md-3">
              <ul class="category">
                <li>
                  <button
                    class="btn1"
                    onClick={() => {
                      window.location.href = "/Home";
                    }}
                  >
                    Graphics Designer
                  </button>
                </li>
                <li>
                  <button
                    class="btn1"
                    onClick={() => {
                      window.location.href = "/Home";
                    }}
                  >
                    Project Management
                  </button>
                </li>
                <li>
                  <button
                    class="btn1"
                    onClick={() => {
                      window.location.href = "/Home";
                    }}
                  >
                    Technical Engineering
                  </button>
                </li>
              </ul>
            </div>
            <div class="col-md-3">
              <ul class="category">
                <li>
                  <button
                    class="btn1"
                    onClick={() => {
                      window.location.href = "/Home";
                    }}
                  >
                    PHP Programming
                  </button>
                </li>
                <li>
                  <button
                    class="btn1"
                    onClick={() => {
                      window.location.href = "/Home";
                    }}
                  >
                    Software Engineer
                  </button>
                </li>
                <li>
                  <button
                    class="btn1"
                    onClick={() => {
                      window.location.href = "/Home";
                    }}
                  >
                    Python Developer
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section class="Jobsdata1">
          <div class="categories1">
            <span class="sub-heading1">Recently Added Jobs</span>
            <h2 class="mb-41">
              <span>Recent </span>Jobs
            </h2>
          </div>
        </section>

        <FilterPopup
          open={filterOpen}
          searchOptions={searchOptions}
          setSearchOptions={setSearchOptions}
          handleClose={() => setFilterOpen(false)}
          getData={() => {
            getData();
            setFilterOpen(false);
          }}
        />
        <Grid
          container
          item
          xs
          direction="column"
          alignItems="left"
          justify="left"
        >
          {jobs.length > 0 ? (
            jobs.map((job) => {
              return <JobTile job={job} getData={getData} />;
            })
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No jobs
            </Typography>
          )}
        </Grid>
      </Grid>

      <footer class="footer-distributed">
        <div class="footer-left">
          <h3>Virtual Hiring </h3>

          <p class="footer-links">
            <a href="/Home">Home</a>&nbsp;
            <a href="/Applications">Applications</a>&nbsp;
            <a href="/Profile">Profile</a>&nbsp;
            <a href="/Login">Login</a>
          </p>
          <a class="footer__btn" href="suneelpirkash@gmail.com">
            Email Us
          </a>
        </div>
        <div class="social-container">
          <div class="col">
            <a
              class="social-inner"
              href="https://www.linkedin.com/"
              target="_blank"
            >
              <span class="icon mdi mdi-linkdin"></span>
              <span>linkedin</span>
            </a>
          </div>
          <div class="col">
            <a class="social-inner" href="https://twitter.com/">
              <span class="icon mdi mdi-twitter" target="_blank"></span>
              <span>twitter</span>
            </a>
          </div>
          <div class="col">
            <a class="social-inner" href="https://github.com/">
              <span class="icon mdi mdi-github" target="_blank"></span>
              <span>Github</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
export default MyJobs;
//export default AnimatedTagsInput;
