const sendEmail = require('sendmail')()

const mailOptions = (emailContent) => {
    return {
        from: 'no-reply@yourdomain.com',
        to: 'k.zhang@ceridian.com',
        subject: 'test sendmail#2',
        html: `your email content is ${emailContent}`
    }
}

const testMail = (emailContent) => {
    sendEmail(mailOptions(emailContent), (err, reply) => {
            console.log(err && err.stack);
            console.dir(reply);
        }
    );
}

module.exports = testMail