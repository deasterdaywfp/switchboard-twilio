require('dotenv').config()
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

module.exports = async (args) => {
  if(args.phone_number){
    client.incomingPhoneNumbers
      .each({
        phoneNumber: `+1${args.phone_number}`
      }, (incomingPhoneNumbers) => {
        client.incomingPhoneNumbers(incomingPhoneNumbers.sid)
          .remove()
          .then(() => incomingPhoneNumbers.sid)
          .done()
      }
      )
  }
}
