const nodemailer = require("nodemailer")
const config = require("../config/mailer")

///creating or building the transport
const transport = nodemailer.createTransport({
    service: "Gmail",  //defining transport service
    //authentification
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS
    },
    // transport layer security
    tls:{
        rejectUnauthorized: false
    }
})

//making use of the transport object
module.exports = {
    sendEmail(from, to, subject, html){
        return new Promise((resolve, reject)=>{
            transport.sendMail({from, subject,html, to}, (err,info)=>{
                if(err) reject(err);
                resolve(info)
            })
        })
    }
}