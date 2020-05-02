const h = require('../../helpers');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const path = require('path');
const { getListOfFunctionsAndAssets } = require('@twilio-labs/serverless-api/dist/utils/fs');
const { TwilioServerlessApiClient } = require('@twilio-labs/serverless-api');
const TwilioApp = require('../../twilioapp')


class InstallCommand extends TwilioClientCommand {
  static strict = false

  async run() {
    try {
      await super.run();
      if(h.getInstallInfo()) {
        console.log("App already installed. Run uninstall first.")
        return
      }

      const {argv} = this.parse()
      const serviceName = h.getServiceName()
      console.log(`Install app with service name ${serviceName}`)

      const deployResult = await h.deploy.call(this);
      console.log(deployResult)
      deployResult.serviceName = serviceName
      const appInfo = h.appInfoFromDeployResult.call(this,deployResult)

      h.writeInstallInfo(appInfo)
      const twilioapp = new TwilioApp(this.twilioClient, appInfo)

      const projectInstaller = require(path.join(process.cwd(),"twilioapp.js"))
      await projectInstaller.install(twilioapp,argv)
  

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
