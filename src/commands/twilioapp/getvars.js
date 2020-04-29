const h = require('../../helpers');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const path = require('path');
const fs = require('fs');

class GetVarsCommand extends TwilioClientCommand {
  async run() {
    try {
      await super.run();
      const twilioapp = await h.getTwilioAppFromFunctionsFile(this.twilioClient)
      console.log(await twilioapp.getVariables())
    }
    catch(error) {
      console.error(`Failed: ${error}`)
      return
    }
  }
}

GetVarsCommand.flags = { ...TwilioClientCommand.flags };

GetVarsCommand.description = 'Get serverless function variables for this app';

GetVarsCommand.examples = [
  `$ twilio installer:getvars`,
];

module.exports = GetVarsCommand;
