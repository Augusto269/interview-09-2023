const { readLogsFile, createOrWriteLog } = require('./files');
const { sendNotification } = require('./notification');
const maxErrorForNotification = 10;

const LogError = (error) => {
  const timestamp = new Date();
  const newLog = { errorMessage: error.message, timestamp };
  if (readLogsFile()) {
    const logs = JSON.parse(readLogsFile());
    logs.push(newLog);
    createOrWriteLog(logs);
    alarmError(logs, newLog);
  } else {
    createOrWriteLog(newLog);
  }
};
const alarmError = (errorData, newLog) => {
  if (errorData.length <= maxErrorForNotification - 1) return;
  const matchingErrors = errorData.filter((error) => error.errorMessage === newLog.errorMessage);
  if (matchingErrors.length >= maxErrorForNotification - 1) {
    const lastErrorTime = new Date(
      matchingErrors[matchingErrors.length - maxErrorForNotification].timestamp
    ).getTime();
    const currentTime = new Date();
    if (currentTime.getTime() - lastErrorTime <= 60000) {
      sendNotification(newLog, currentTime);
      return;
    }
  }
};

module.exports = { LogError };
