const basePath = './notificationLogs.txt';
const fs = require('fs');
const diffTimeNotifications = 60000;
const timeBetweenNotifications = new Date().getTime() - diffTimeNotifications;

const sendNotification = (error, currentTime) => {
  const newLog = { errorMessage: error.errorMessage, timestamp: currentTime };

  if (!fs.existsSync(basePath)) {
    const newLogsNotification = JSON.stringify([newLog]);
    fs.writeFileSync(basePath, newLogsNotification, (err) => {
      if (err) throw err;
    });
  }

  try {
    const notificationLogs = fs.readFileSync(basePath, 'utf8');
    let jsonParseNotificationLogs = JSON.parse(notificationLogs);
    const notificationLogFound = jsonParseNotificationLogs.filter(
      (log) => log.errorMessage === newLog.errorMessage
    );
    if (
      notificationLogFound.length &&
      new Date(notificationLogFound[notificationLogFound.length - 1].timestamp).getTime() <
        timeBetweenNotifications
    ) {
      jsonParseNotificationLogs.push(newLog);
      const logsNotifications = JSON.stringify(jsonParseNotificationLogs);
      const to = 'recipient@example.com';
      const subject = 'Error Notification';
      const message = `Error message: ${error.errorMessage}\nTimestamp: ${currentTime}`;
      sendNotificationEmail(to, subject, message);
      fs.writeFileSync(basePath, logsNotifications);
    }

    return;
  } catch (err) {
    throw err;
  }
};

const sendNotificationEmail = (to, subject, message) => {
  // In a real application, you'd use a proper email sending library like Nodemailer
  // This is a dummy function just for demonstration purposes
  console.log(`Sending notification email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  console.log('Notification email sent successfully.');
};

module.exports = { sendNotification , basePath};
