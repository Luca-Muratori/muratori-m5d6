import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_APIKEY);

export const sendRegistrationEmail = async (recipientAddress) => {
  const msg = {
    to: recipientAddress,
    from: process.env.SENDER_EMAIL,
    subject: "this is an email send by sendgrid",
    text: "this is the text of the email",
    html: "<p>This is the  html version of the email</p>",
  };

  await sgMail.send(msg);
};
