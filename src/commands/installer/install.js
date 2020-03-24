const h = require('../../helpers');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const path = require('path');
const { getListOfFunctionsAndAssets } = require('@twilio-labs/serverless-api/dist/utils/fs');
const { TwilioServerlessApiClient } = require('@twilio-labs/serverless-api');


class InstallCommand extends TwilioClientCommand {
  async run() {
    try {
      await super.run();
      if(h.getInstallInfo()) {
        console.log("App already installed. Run uninstall first.")
        return
      }

      const serviceName = h.getServiceName()
      console.log(`Install app with service name ${serviceName}`)

      const deployResult = await h.deploy.call(this);
      const appInfo = h.appInfoFromDeployResult(deployResult)

      h.writeInstallInfo(appInfo)

      const projectInstaller = require(path.join(process.cwd(),"installer.js"))
      await projectInstaller.install(this.twilioClient,appInfo)
  

    }
    catch(error) {
      console.log(`Command failed: ${error}`)
    }
  }

}

InstallCommand.flags = { ...TwilioClientCommand.flags };

InstallCommand.description = 'Install Twilio resources specified in ./install.js';

InstallCommand.examples = [
  `$ twilio installer:install
Installed app xyz`,
];

module.exports = InstallCommand;
