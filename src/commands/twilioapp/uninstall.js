const h = require('../../helpers');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const path = require('path');
const fs = require('fs');

class UninstallCommand extends TwilioClientCommand {
  async run() {
    try {
      await super.run();
      const {argv} = this.parse()
      const twilioapp = await h.getTwilioAppFromFunctionsFile(this.twilioClient)
      const projectInstaller = require(path.join(process.cwd(),"twilioapp.js"))
      await projectInstaller.uninstall(twilioapp,argv)
      await this.twilioClient.serverless.services(twilioapp.serviceSid).remove();
      fs.renameSync(".twilio-functions",".twilio-functions.deleted")
    }
    catch(error) {
      console.error(`Uninstall failed: ${error}`)
      return
    }
  }
}

UninstallCommand.flags = { ...TwilioClientCommand.flags };

UninstallCommand.description = 'Uninstall Twilio resources specified in ./twilioapp.js';

UninstallCommand.examples = [
  `$ twilio twilioapp:uninstall
Uninstalled app xyz`,
];

module.exports = UninstallCommand;
