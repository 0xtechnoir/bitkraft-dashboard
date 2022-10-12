const GSheetReader = require("g-sheets-api");
const axios = require("axios");
require('dotenv').config()

export default async function handler(req, res) {

    const googleAPIKey = "AIzaSyA77DVUraaq8TY-RU0KjexaKl9hrrAc_RU"
    const options = {
        apiKey: googleAPIKey,
        sheetId: "14-Z2EFnPCzj7xd7Xc7jjVrTe6jAq7u2fDg1Rv_ypTYA"        
      }

      let results = []

    GSheetReader(options, resp => {
        console.log(resp)
        res.send(resp);
      }).catch(err => {
        console.log(err)
      });
   
    
}
