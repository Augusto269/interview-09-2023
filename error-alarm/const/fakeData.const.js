const createFakeLogData = (errorMessage = 'Error on app', timestampParam) => {
  const timestamp = timestampParam || new Date().toISOString();

  const fakeLogData = {
    errorMessage,
    timestamp,
  };

  return fakeLogData;
};

const createNewFakeData = () => {
  const fakeData = [];
  const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  for (let i = 0; i < 9; i++) {
    fakeData.push(createFakeLogData('', yesterdayDate));
  }
  return fakeData;
};

module.exports = { createNewFakeData };
