import nodemailer from "nodemailer";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fromEmail = "info@russworld.com";
const adminEmail = "info@russworld.com";
const templateIdVoted = process.env.SENDGRID_TEMPLATE_ID_VOTED;
const templateIdLive = process.env.SENDGRID_TEMPLATE_ID_CAMPAIGN_LIVE;

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,

  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});
const URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "http://localhost:5173/";
console.log(URL)
const sendMagicLink = async (email, token, action) => {
  let subj, body;

  const actionText =
    action === "signup" ? "Confirm Your Account" : "Sign In to Your Account";
  const buttonText = action === "signup" ? "Confirm Account" : "Sign In";

  subj = actionText;
  body = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>${actionText}</h2>
      <p>Hello${action === "signup" ? " there" : " again"},</p>
      <p>Welcome to our website. Please click the button below to ${
        action === "signup" ? "confirm" : "sign in"
      }:</p>
      <p style="margin-top: 20px;"><a href="${URL}?token=${token}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">${buttonText}</a></p>
      <p>Remember, keep this link safe and don't share it with anyone!</p>
    </div>
  `;

  // const mailOptions = {
  //   to: email,
  //   from: process.env.NODEMAILER_EMAIL,
  //   subject: subj,
  //   html: body,
  // };
  const msg = {
    to: email,
    from: "info@russworld.com",
    subject: subj,

    html: body,
  };
  return new Promise((resolve, reject) => {
    sgMail.send(msg).then(
      () => {
        resolve({ ok: true, message: "email sent" });
      },
      (error) => {
        console.error(error);
        reject({ ok: false, message: error.message });
      }
    );
  });
};

export async function sendAdminEmail() {
  const msg = {
    to: adminEmail,
    from: fromEmail, // must be a verified sender
    template_id: templateIdLive,
  };

  const result = await sgMail
    .send(msg)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      console.error(error);
      return "error";
    });

  return result;
}
export async function sendUserEmail(email, firstName, songName) {
  const msg = {
    to: email,
    from: fromEmail, // must be a verified sender
    template_id: templateIdVoted,
    dynamic_template_data: {
      first_name: firstName,
      song_name: songName,
    },
  };

  const result = await sgMail
    .send(msg)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      console.error(error);
      return "error";
    });

  return result;
}

export default sendMagicLink;
