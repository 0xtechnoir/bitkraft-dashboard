// $1,000,000 position in IMX
// At time if purchase that will equate to a certain number of IMX tokens and will equal $1,000,000
// each day the dollar value of those token should be calculated and displayed on the chart.

const { MongoClient } = require("mongodb");
const axios = require("axios")
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://bkCryptoTeam:Vw01wuSjeNkyeZrj@cluster0.tmpq7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "historical_price_data";


/* example response from coin market cap
[ 
  [
    1499040000000,      // Open time
    "0.01634790",       // Open
    "0.80000000",       // High
    "0.01575800",       // Low
    "0.01577100",       // Close
    "148976.11427815",  // Volume
    1499644799999,      // Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "17928899.62484339" // Ignore.
  ]
]
*/

// MATIC Token Details

// 6th May 1651407301
// $3,000,000
// 3,333,333 Matic tokens
// $0.90 per token

const endDate = Date.now(); // expressed in milliseconds
const maticPurchaseDate = 1651791600 * 1000 // Epoch Unix Timestamp for 6th May 2022, converted to milliseconds
                          
// const interval = "1d"
// const pair = "MATICUSDT"
// const tokensHeld = 3333333
const initialMaticPositionSize = 3000000

async function run() {

    // create matic position
    try {
      getData("MATICUSDT", "1d", maticPurchaseDate, 3333333)
      .then((data) => mapData(data, 3333333))
      .then((mappedData) => {
            mappedData[0].close_price = 0.9 // change the initial price from market price to TWAP price
            writeData(mappedData, "matic_position")
       })
      
    } catch (err) {
        console.log(err)
    }

    // create corresponding Bitcoin position
    try {
        getData("BTCUSDT", "1d", maticPurchaseDate)
        .then((data) => {
            const btcEquivalent = 3000000 / data[0][4]
            console.log(`$3,000,000 on ${new Date(maticPurchaseDate)} will buy ${btcEquivalent} BTC`)
            return mapData(data, btcEquivalent)
        })
        .then((mappedData) => console.log("Mapped data: " + JSON.stringify(mappedData)))
        .then((mappedData) => writeData(mappedData, "btc_position"))
    } catch (err) {
        console.log(err)
    }
}

// need to programmatically calculate how many BTC would equate to $3000000 woth of MATIC

async function mapData(data, tokensHeld) {
    const mappedData = data.map(x => {
        return {
            "close_time": x[6],
            "close_price": x[4],
            "tokens_held": tokensHeld,
            "position_value_usd": tokensHeld * x[4]
        };
    });
    return mappedData;
}

async function getData(pair, interval, startDate) {
    return axios.get(`https://api.binance.com/api/v3/klines?symbol=${pair}&interval=${interval}&startTime=${startDate}&endTime=${endDate}&limit=1000`)
    .then(response => {
        if (!response === 200) {
            throw new Error(
                `This is an HTTP error: The status is ${response.status}`
            );
        }
        return response.data;
    })
}

async function writeData(data, collectionName) {
    try {
        // insert into database
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection(collectionName);
        col.createIndex( { "close_time": 1 }, { unique: true } )
        await col.insertMany(data, { ordered: false });
    }
    catch (err) {
        // console.log(err.stack);
    }
    finally {
        await client.close();
        console.log("Disconnected from server");
    }
}

run().catch(console.dir);