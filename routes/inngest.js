const {serve} = require("inngest/express")
const { helloWorld } = require("../jobs/helloWorld");
const {weeklyDigestEmail} = require("../jobs/weeklyDigestEmail")
const { inngest } = require("../utils/inngestClient");


module.exports = serve(inngest, [helloWorld, weeklyDigestEmail]);