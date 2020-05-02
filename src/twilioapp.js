
class TwilioApp {

  constructor(client, props) {
    this.twilioClient = client
    this.serviceSid  = props.serviceSid
    this.serviceName = props.serviceName
    this.environmentSid = props.environmentSid
    this.domain = props.domain
  }

  get prefix() { return `${this.serviceName}-${this.serviceSid}` }
  get accountSid() { return this.twilioClient.accountSid }

  async setVariables(vars) {
    for(const [k,v] of Object.entries(vars)) {
      await this.twilioClient.serverless
        .services(this.serviceSid)
        .environments(this.environmentSid)
        .variables.create({key: k, value: v})
    }
  }

  async getVariables() {
    const res = await this.twilioClient.serverless
        .services(this.serviceSid)
        .environments(this.environmentSid)
        .variables.list()
    let props = {}
    res.forEach((elem) => { 
      props[elem.key] = elem.value
    })
    return props
  }
}

module.exports = TwilioApp
