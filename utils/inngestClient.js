const {Inngest} = require("inngest")
require("dotenv").config();

exports.inngest = new Inngest({
    id: "splash-app",
    name: "Splash App",
    eventKey: process.env.INNGEST_EVENT_KEY
})
