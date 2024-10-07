const { getAllUsers } = require("../controllers/userController");
const { inngest } = require("../utils/inngestClient");

exports.weeklyDigestEmail = inngest.createFunction(
  { id: "weekly-digest-email" },
  { cron: "* * * * *" },
  async ({ event, step }) => {
    //get all users
    const users = await step.run("Get Users", async () => getAllUsers());
  }
);

const events = users.map((user)=>({
    name: "mailers/weekly-digest-mailer",
    data: {
        user
    },
    user
}))

await step.sendEvent(events);

return {count: users.length};