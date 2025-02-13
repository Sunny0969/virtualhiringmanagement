const { connect } = require("mongoose");
const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
  // connect with the smtp
  let transportor = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "micaela.mosciski@ethereal.email",
      pass: "YDDzKxyx1R6RGyKpCz",
    },
  });
  // send mail with defined transport object
  let info = await transportor.sendMail({
    from: '"Virtual Hiring" <virtual@gmail.com>', // sender address
    to: "f190911@nu.edu.pk", // list of receivers
    subject: "Nice Sir",
    text: "Raees Sir, Nice to meet with you",
    html: "<b>Awoseme</b>", 
  });
  console.log("Message sent: %s", info.messageId);
  res.json("info");
};
module.exports=sendMail;