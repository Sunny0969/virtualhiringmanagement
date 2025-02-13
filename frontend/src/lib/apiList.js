// This could be loaded from an environment variable or configuration file
const server = process.env.SERVER || "http://localhost:4444";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/file`,
  jobs: `${server}/api/jobs`,
  homejobs: `${server}/api/homejobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  imageData: `${server}/api/recruiter`,
  saveDate: `${server}/api/calendar`,
  file: `${server}/api/file`,
};

export { server, apiList };
