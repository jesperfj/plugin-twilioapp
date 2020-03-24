const h = require('../../helpers');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const path = require('path');
const fs = require('fs');

class UninstallCommand extends TwilioClientCommand {
  async run() {
    try {
      await super.run();
      const appInfo = await h.getAppInfo.call(this)
      const projectInstaller = require(path.join(process.cwd(),"installer.js"))
      await projectInstaller.uninstall(this.twilioClient,appInfo)
      await this.twilioClient.serverless.services(appInfo.serviceSid).remove();
      fs.renameSync(".install",".install.deleted")
    }
    catch(error) {
      console.error(`Uninstall failed: ${error}`)
      return
    }
  }
}

UninstallCommand.flags = { ...TwilioClientCommand.flags };

UninstallCommand.description = 'Uninstall Twilio resources specified in ./installer.js';

UninstallCommand.examples = [
  `$ twilio installer:uninstall
Uninstalled app xyz`,
];

module.exports = UninstallCommand;
