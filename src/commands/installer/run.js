const h = require('../../helpers');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const path = require('path');
const fs = require('fs');

class RunCommand extends TwilioClientCommand {
  static strict = false

  async run() {
    try {
      await super.run();
      const {argv} = this.parse()
      const twilioapp = await h.getTwilioAppFromFunctionsFile(this.twilioClient)
      const projectInstaller = require(path.join(process.cwd(),"twilioapp.js"))
      await projectInstaller[argv[0]](twilioapp,argv)
    }
    catch(error) {
      console.error(`Run failed: ${error}`)
      return
    }
  }
}

RunCommand.flags = { ...TwilioClientCommand.flags };

RunCommand.description = 'Uninstall Twilio resources specified in ./twilioapp.js';

RunCommand.examples = [
  `$ twilio installer:run dbsetup`,
];

module.exports = RunCommand;
