const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const cors = require("cors");
const fs = require("fs");
const nodemailer = require('nodemailer');
// const userProfileRoutes = require('./db/resume');
const uploadRoutes = require('./routes/uploadRoutes.js')
require('./db/file')
const app = express();
const JobApplicantInfo = require("./db/JobApplicant")
// MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/JobPortal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

//Interview schema
const interviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
});
const Interview = mongoose.model('Interview', interviewSchema);
// Endpoint to schedule an interview
app.post('/schedule-interview', async (req, res) => {
  const { name, email, date } = req.body;

  try {
            const newInterview = new Interview({ name, email, date });
            await newInterview.save();

            // Send confirmation email
            sendConfirmationEmail(name, email, date);

            res.status(200).json({ message: 'Interview scheduled successfully' });
  } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
  }
});


// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}
const port = 4444;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());
// app.use(uploadRoutes)
// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));
// app.use('/api/user-profiles', userProfileRoutes);
app.post("/api/saveDate", async (req, res) => {
  const { date } = req.body;})
app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

// Function to send confirmation email
function sendConfirmationEmail(name, email, date) {
  const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                      user: 'suneelpirkash@gmail.com',
                      pass: 'rfco nmsm vijh xowc',
            },
  });

  const mailOptions = {
            from: 'suneelpirkash@gmail.com',
            to: email,
            subject: 'Online Interview Confirmation',
            text: `Dear ${name},

We are excited to confirm the scheduling of your upcoming online interview. Below are the details:

- Interview Date and Time: ${date}
- Virtual Meeting Link: [Meeting Link or Platform]
- Meeting ID: [Meeting ID, if applicable]

To join the online interview, simply click on the provided meeting link or use the meeting ID with the chosen virtual meeting platform. Please ensure that you have a stable internet connection and are in a quiet environment for the duration of the interview.

If you encounter any technical difficulties or have questions beforehand, don't hesitate to reach out to us.

We look forward to connecting with you online and discussing your qualifications in more detail. Best of luck with your interview!

Sincerely,
Virtual Hiring
virtualhiring.support@gmail.com`,
  };


  transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                      console.error(error);
            } else {
                      console.log('Email sent: ' + info.response);
            }
  });
}

