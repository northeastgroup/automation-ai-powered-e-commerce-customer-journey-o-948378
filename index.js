```javascript
const zapier = require('zapier-platform-core');
const { version } = require('./package.json');

const authentication = require('./authentication');
const fetchActiveCampaigns = require('./triggers/fetchActiveCampaigns');
const evaluateCampaignPerformance = require('./triggers/evaluateCampaignPerformance');
const reduceBid = require('./triggers/reduceBid');
const pauseCampaign = require('./triggers/pauseCampaign');
const sendAlertToMarketingTeam = require('./triggers/sendAlertToMarketingTeam');
const increaseBudget = require('./triggers/increaseBudget');
const sendDailySummaryReport = require('./triggers/sendDailySummaryReport');
const compileReport = require('./triggers/compileReport');
const emailReport = require('./triggers/emailReport');
const logChangesInHubSpot = require('./triggers/logChangesInHubSpot');
const alertTechTeam = require('./triggers/alertTechTeam');
const createBackupTask = require('./triggers/createBackupTask');

const App = {
  version,
  platformVersion: zapier.version,
  authentication,
  triggers: {
    fetchActiveCampaigns,
    evaluateCampaignPerformance,
    reduceBid,
    pauseCampaign,
    sendAlertToMarketingTeam,
    increaseBudget,
    sendDailySummaryReport,
    compileReport,
    emailReport,
    logChangesInHubSpot,
    alertTechTeam,
    createBackupTask,
  },
  beforeRequest: [
    (request) => {
      request.headers['X-App-Version'] = version;
      return request;
    },
  ],
  afterResponse: [
    (response) => {
      if (response.status >= 400) {
        throw new Error(`Unexpected status code ${response.status}`);
      }
      return response;
    },
  ],
};

module.exports = App;
```

Please note that this is the main `index.js` file for the Zapier CLI application. Each of the required actions and triggers (like `fetchActiveCampaigns`, `evaluateCampaignPerformance`, `reduceBid`, etc.) should be implemented in separate files in the `triggers` directory. These files should export a function that performs the required action or trigger. The `authentication` module should also be implemented in a separate file in the root directory.