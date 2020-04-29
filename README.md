# TwilioApp CLI Plugin

This Twilio CLI plugin is a fully functional "concept" plugin that explores the idea of a "Twilio App" as a collection of assets along with an installation and uninstallation recipe that makes it quick and easy to share, evolve, deploy and remove Communications "apps" built on Twilio. Examples of apps can be a Video browser app, an interactive voice response (IVR) service, a softphone, a PBX-style call routing service, a voice mail service, etc. Anything you can do with code on Twilio can be packaged as an "app".

The "reference" implementation using this plugin right now is github.com/jesperfj/twilio-ivr-inbound. If you want to see this plugin in action, start with that project.

## Installing the plugin

[Sign up for a Twilio account](https://www.twilio.com/try-twilio) if you don't have one. Your computer must have [Node.js v10](https://nodejs.org/en/download/) or higher. Install Twilio CLI with

    $ npm install -g twilio-cli

Install this plugin with:

    $ twilio plugins:install https://github.com/jesperfj/plugin-twilioapp

## Using the plugin

The commands implemented by this plugin are meant to be run from the root of an application directory. It expects this directory to contain a `twilioapp.js` Javascript file that implements an `install` and `uninstall` function.

`twilio twilioapp:install` does the following:

1. Run the equivalent of [`twilio serverless:deploy`](https://github.com/twilio-labs/plugin-serverless) to create a new Twilio Serverless service and deploy functions and assets from the current directory to this new serverless service. This places a `.twilio-functions` file in the current directory with service SID and other metadata about the installation.
2. Run the `install` function in `twilioapp.js`

`twilio twilioapp:uninstall` does the following:

1. Run the `uninstall` function in `twilioapp.js`
2. Remove the serverless service installed during install.
3. Delete the `.twilio-functions` file in the current directory.

In addition, the plugin offers the following commands:

`setvar`: Set a variable in the serverless function context

`getvars`: Get all variables in the serverless function context

`run`: Run a function defined in `twilioapp.js` within the context of the app.

### The TwilioApp class

The TwilioApp class is the main interface between this plugin and the app being installed.

TODO: Document TwilioApp class.
