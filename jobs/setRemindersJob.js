const { inngest } = require("../utils/inngestClient");

exports.setReminders = inngest.createFunction(
  { id: "course-enrolled" },
  { event: "course/enrolled" },
  async ({ event, step }) => {
    
  }
);
