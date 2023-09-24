const { LogError } = require('./helpers/logError');
const SolutionApp = (error) => {
    //to simplify the example, we are only going to log the error TypeError and Error
    if (error instanceof TypeError || error instanceof Error) {
        LogError(error);
    }
    //continue normal app flow
    return;
};

module.exports = { SolutionApp };
