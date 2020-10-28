const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const {
    NODEMAILER_SERVICE,
    NODEMAILER_HOST,
    NODEMAILER_PORT,
    NODEMAILER_USER,
    NODEMAILER_PASS,
} = require("./dev");

app.use(express.json());
app.use(express.static("public"));

app.get("/mailtest", async (req, res) => {
    let email = req.body.email;
    let subject = req.body.subject;
    let text = req.body.text;
    //let email = NODEMAILER_USER;

    let transporter = nodemailer.createTransport({
        service: NODEMAILER_SERVICE,
        host: NODEMAILER_HOST,
        port: NODEMAILER_PORT,
        auth: {
            user: NODEMAILER_USER,
            pass: NODEMAILER_PASS,
        },
    });

    let mailOptions = {
        from: NODEMAILER_USER,
        to: email, // 수신 메일 주소
        //subject: "TEST MAIL ", // 제목
        subject: subject,
        //text: "nodemailer test", // 내용
        text: text,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({ error });
        } else {
            console.log("Email sent: " + info.response);
            res.json({ mail: "sending" });
        }
    });
});

const PORT = 9999;
// 서버 기동
app.listen(PORT, () => console.log(`server is running localhost:${PORT}`));
