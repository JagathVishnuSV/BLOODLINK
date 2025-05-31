const cron = require("node-cron");
const User = require("../models/User");
const Notification = require("../models/Notification");

const sendDonationReminders = async () => {
  const users = await User.find();

  const now = new Date();

  for (let user of users) {
    const donations = user.donationHistory;
    if (donations.length === 0) continue;

    const lastDonation = new Date(donations[donations.length - 1].date);
    const threeMonthsLater = new Date(lastDonation);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    if (now >= threeMonthsLater) {
      await Notification.create({
        recipient: user._id,
        type: "Time to Donate Again!",
        message: "It's been 3 months since your last donation. You can now donate again and save more lives!",
        link: "/donate"
      });

      // Optionally: Emit real-time push via Socket.io
    }
  }

  console.log("✅ Donation reminders sent");
};

// Run every day at midnight
cron.schedule("0 0 * * *", sendDonationReminders);
