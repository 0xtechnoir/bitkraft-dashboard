const { MongoClient } = require("mongodb");
const axios = require("axios")
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://bkCryptoTeam:Vw01wuSjeNkyeZrj@cluster0.tmpq7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "historical_price_data";

const oneYearInMS = 31556952000;
const endDate = Date.now();
const startDate = endDate - oneYearInMS
const interval = "1d"
const pair = "BTCUSDT"

// example response
// [ 
//     [
//       1499040000000,      // Open time
//       "0.01634790",       // Open
//       "0.80000000",       // High
//       "0.01575800",       // Low
//       "0.01577100",       // Close
//       "148976.11427815",  // Volume
//       1499644799999,      // Close time
//       "2434.19055334",    // Quote asset volume
//       308,                // Number of trades
//       "1756.87402397",    // Taker buy base asset volume
//       "28.46694368",      // Taker buy quote asset volume
//       "17928899.62484339" // Ignore.
//     ]
//   ]

async function run() {

    try {
      axios.get(`https://api.binance.com/api/v3/klines?symbol=${pair}&interval=${interval}&startTime=${startDate}&endTime=${endDate}&limit=1000`)
      .then(response => {
        if (!response === 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.data;
      })
      .then((actualData) => {
        const map1 = actualData.map(x => {
            return {
                "close_time": x[6],
                "close_price": x[4]
            }
        });
        return map1
      })
      .then((map1) => {
        writeData(map1)  
      })
    } catch (err) {

    } finally {

    }
    
}

async function writeData(data) {
    try {
        // insert into database
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection("BTCUSD");
        col.createIndex( { "close_time": 1 }, { unique: true } )
        await col.insertMany(data);
    }
    catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
        console.log("Disconnected from server");
    }
}

run().catch(console.dir);