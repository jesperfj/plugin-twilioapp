const h = require('../../helpers');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const path = require('path');
const fs = require('fs');

class SetVarCommand extends TwilioClientCommand {
  static args = [
    {name: 'key'},
    {name: 'value'}
  ]

  async run() {
    try {
      await super.run();
      const arginfo = this.parse(SetVarCommand)

      const twilioapp = await h.getTwilioAppFromFunctionsFile(this.twilioClient)
      let v = {}
      v[arginfo.args.key] = arginfo.args.value
      console.log(await twilioapp.setVariables(v))
    }
    catch(error) {
      console.error(`Failed: ${error}`)
      return
    }
  }
}

SetVarCommand.flags = { ...TwilioClientCommand.flags };

SetVarCommand.description = 'Set serverless function variable for this app';

SetVarCommand.examples = [
  `$ twilio installer:setvar KEY VALUE`,
];

module.exports = SetVarCommand;
