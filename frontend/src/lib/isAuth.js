const getToken = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(Boolean(token));
  return token;
};

export const userType = () => {
  return localStorage.getItem("type");
};

export default getToken;
