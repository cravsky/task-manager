const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'cravsky@gmail.com',
        subject: 'Welcome to the Task Manager',
        text: `Welcome to the app, ${name}. Enjoy!`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'cravsky@gmail.com',
        subject: 'Farewell',
        text: `Sorry to hear that you are leaving. Bye, ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}