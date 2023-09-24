const { SolutionApp } = require('./index');
const { createNewFakeData } = require('./const/fakedata.const');
const fs = require('fs');
describe('notification alerts app', () => {
  const error = new TypeError('The value must be a array');
  afterEach(() => {
    deleteFileLog('./logData.txt');
    deleteFileLog('./notificationLogs.txt');
  });
  test('we dont send and error and we not create a log', () => {
    SolutionApp('error');
    const logData = fs.existsSync('./logData.txt', 'utf8');
    expect(logData).toBe(false);
  });
  test('we send a error and we create a logData with the error', () => {
    SolutionApp(error);
    const logData = fs.readFileSync('./logData.txt', 'utf8');
    const logDataParse = JSON.parse(logData);
    expect(logDataParse[0]).toMatchObject({
      errorMessage: 'The value must be a array',
      timestamp: expect.any(String),
    });
  });
  describe('Send notification ', () => {
    test('If there are 10 errors in less than 1 minute, we send the email to the user, create logs notification', () => {
      for (let i = 0; i < 10; i++) {
        SolutionApp(error);
      }
      const logData = fs.readFileSync('./logData.txt', 'utf8');
      const logDataParse = JSON.parse(logData);
      expect(logDataParse.length).toBe(10);
      const notificationLogs = fs.readFileSync('./notificationLogs.txt', 'utf8');
      const notificationLogsParse = JSON.parse(notificationLogs);
      expect(notificationLogsParse.length).toBe(1);
      expect(notificationLogsParse[0]).toMatchObject({
        errorMessage: 'The value must be a array',
        timestamp: expect.any(String),
      });
    });

    test('If there are 12 errors in less than 1 minute, we send the 1 emails notification and create log for that ', () => {
      for (let i = 0; i < 12; i++) {
        SolutionApp(error);
      }
      const logData = fs.readFileSync('./logData.txt', 'utf8');
      const logDataParse = JSON.parse(logData);
      expect(logDataParse.length).toBe(12);
      const notificationLogs = fs.readFileSync('./notificationLogs.txt', 'utf8');
      const notificationLogsParse = JSON.parse(notificationLogs);
      expect(notificationLogsParse.length).toBe(1);
      expect(notificationLogsParse[0]).toMatchObject({
        errorMessage: 'The value must be a array',
        timestamp: expect.any(String),
      });
    });
  });

  describe('Not send notification ', () => {
    test('If there are 9 errors in less than 1 minute, we dont send  the email to the user and not create log notification', () => {
      for (let i = 0; i < 9; i++) {
        SolutionApp(error);
      }
      const logData = fs.readFileSync('./logData.txt', 'utf8');
      const logDataParse = JSON.parse(logData);
      expect(logDataParse.length).toBe(9);
      const notificationLogs = fs.existsSync('./notificationLogs.txt', 'utf8');
      expect(notificationLogs).toBe(false);
    });
  });
  test('If there are 9 errors in log data in the log file and we send another with more than 1 minutes of different , we dont send notification', () => {
    const dataLog = createNewFakeData();
    fs.writeFileSync('./logData.txt', JSON.stringify(dataLog));
    SolutionApp(error);
    const logData = fs.readFileSync('./logData.txt', 'utf8');
    const logDataParse = JSON.parse(logData);
    expect(logDataParse.length).toBe(10);
    const notificationLogs = fs.existsSync('./notificationLogs.txt', 'utf8');
    expect(notificationLogs).toBe(false);
  });
});

// Function to delete the logData.txt file
const deleteFileLog = (logFile) => {
  try {
    if (fs.existsSync(logFile)) {
      fs.unlinkSync(logFile);
    }
  } catch (error) {
    console.error(`Error ${logFile}: ${error.message}`);
  }
};
