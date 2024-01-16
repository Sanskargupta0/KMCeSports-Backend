const nademailer = require("nodemailer");
const { google } = require("googleapis");

const ClientId =process.env.ClientId;
const ClientSecret =process.env.ClientSecret
const RedirectUrl =process.env.RedirectUrl;
const RefreshToken =process.env.RefreshToken;

const oAuth2Client = new google.auth.OAuth2(
  ClientId,
  ClientSecret,
  RedirectUrl
);

oAuth2Client.setCredentials({ refresh_token: RefreshToken });

async function sendMail(to, tamplate,  name , otp) {
  try {
    const date = new Date().toLocaleDateString();
    const accessToken = await oAuth2Client.getAccessToken();
    if (tamplate == "user") {
      subject = "User Email Verification OTP for KMCeSports";
      text = `
      Your OTP

Hey ${name},
${date}

Thank you for choosing KMCeSports. Use the following OTP to complete the procedure to verify your email address. OTP is valid for 1 hour, and you will get 3 attempts. Do not share this code with others, including KMCeSports employees.

OTP: ${otp}

Need help? Ask at KMCeSports.help@gmail.com

KMCeSports
Sitapur, Hardoi Bypass Rd, Lucknow, Uttar Pradesh 226013.
Copyright © 2024. All rights reserved.

      `;
      html = `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>KMCeSports</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%;">
          <tbody>
            <tr style="height: 0;">
              <td>
                <img
                  alt=""
                  src="https://i.postimg.cc/5tDr1NhP/kmcesports.png"
                  height="100px"
                />
              </td>
              <td style="text-align: right;">
                <span
                  style="font-size: 16px; line-height: 30px; color: #ffffff;"
                  >${date}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 60px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              Your OTP
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey ${name},
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Thank you for choosing KMCeSports . Use the following OTP
              to complete the procedure to Verify your email address. OTP is
              valid for
              <span style="font-weight: 600; color: #1f1f1f;">1 hour, You will get 3 attempt</span>.
              Do not share this code with others, including KMCeSports
              employees.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #ba3d4f;
              "
            >
              ${otp}
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Ask at
          <a
            href="mailto:KMCeSports.help@gmail.com"
            style="color: #499fb6; text-decoration: none;"
            >KMCeSports.help@gmail.com</a
          >
          
          
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          KMCeSports 
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343;">
          Sitapur, Hardoi Bypass Rd, Lucknow, Uttar Pradesh 226013.
        </p>

        <p style="margin: 0; margin-top: 16px; color: #434343;">
          Copyright © 2024 . All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>
      `;
    } else if (tamplate == "reset") {
      subject = "Your Password Reset OTP for KMCeSports";
      text = `
Your Password Reset OTP

Hello ${name},
${date}

Thank you for choosing KMCeSports. To reset your password, 
please use the following One-Time Password (OTP). 
The OTP is valid for 1 hour, and you have 3 attempts
to complete the verification.
Please do not share this code with others,
including KMCeSports employees.

Password Reset OTP: ${otp}

If you didn't request a password reset, please ignore this email.

Need help? Contact us at KMCeSports.help@gmail.com.

Best regards,
KMCeSports Team
      `;
      html = `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>KMCeSports</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%;">
          <tbody>
            <tr style="height: 0;">
              <td>
                <img
                  alt=""
                  src="https://i.postimg.cc/5tDr1NhP/kmcesports.png"
                  height="100px"
                />
              </td>
              <td style="text-align: right;">
                <span
                  style="font-size: 16px; line-height: 30px; color: #ffffff;"
                  >${date}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 60px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              Password Reset OTP
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hello ${name},
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Thank you for choosing KMCeSports. To reset your password, please use the following OTP to complete the verification. The OTP is valid for
              <span style="font-weight: 600; color: #1f1f1f;">1 hour, and you have 3 attempts</span>. Do not share this code with others, including KMCeSports employees.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 40px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #ba3d4f;
              "
            >
              ${otp}
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Ask at
          <a
            href="mailto:KMCeSports.help@gmail.com"
            style="color: #499fb6; text-decoration: none;"
            >KMCeSports.help@gmail.com</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          KMCeSports
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343;">
          Sitapur, Hardoi Bypass Rd, Lucknow, Uttar Pradesh 226013.
        </p>

        <p style="margin: 0; margin-top: 16px; color: #434343;">
          Copyright © 2024. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>

      `;
    }
    else{
      err = {
        status: 400,
        msg: "Invalid tamplate",
        extraD: "tamplate must be user or reset",
      }
      next(err);
    }

    const transport = nademailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "kmcesports.help@gmail.com",
        clientId: ClientId,
        clientSecret: ClientSecret,
        refreshToken: RefreshToken,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "KMCeSports🎮<kmcesports.help@gmail.com>",
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = sendMail;

// sendMail("sanskar362002@gmail.com", "reset", "test", 2222)
//   .then((result) => console.log("Email sent...", result))
//   .catch((error) => console.log(error.message));
