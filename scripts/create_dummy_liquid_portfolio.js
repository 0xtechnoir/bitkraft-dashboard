const { MongoClient } = require("mongodb");
const axios = require("axios")

const endDate = Date.now(); // expressed in milliseconds
const URL = "mongodb+srv://bkCryptoTeam:Vw01wuSjeNkyeZrj@cluster0.tmpq7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(URL);

async function main() {

    // a function that can be fed an array of tickers


    try {
        const maticPurchaseDate = 1651791600 * 1000 // Epoch Unix Timestamp for 6th May 2022, converted to milliseconds
        await client.connect()
        const db = client.db("historical_price_data")
    
        const data = await getData("MATICUSDT", "1d", maticPurchaseDate, 3333333)  // create matic position
        const mappedData = await mapData(data, 3333333)
        mappedData[0].position_value_usd = 3000000 // change the initial value from market price to TWAP price
        const col = db.collection("matic_position");
        col.createIndex( { "close_time": 1 }, { unique: true } )
        await col.insertMany(mappedData, { ordered: false });
    
        // createBenchmark("BTCUSDT", )
        // create corresponding Bitcoin position
        const btcData = await getData("BTCUSDT", "1d", maticPurchaseDate) 
        const btcEquivalent = 3000000 / parseFloat(btcData[0][4])
        const btcMappedData = await mapData(btcData, btcEquivalent)
        const col2 = db.collection("btc_position");
        col2.createIndex( { "close_time": 1 }, { unique: true } )
        await col2.insertMany(btcMappedData, { ordered: false });
        
    } catch (err) {
        if(err.toString().includes("E11000 duplicate key error")) {
            //do nothing
        } else {
            throw err
        }
    }
    
}

async function createBenchmark(_pair, _startDate, ) {

}

async function mapData(data, tokensHeld) {
    const mappedData = data.map(x => {
        return {
            "close_time": parseFloat(x[6]),
            "close_price": parseFloat(x[4]),
            "tokens_held": parseFloat(tokensHeld),
            "position_value_usd": parseFloat(tokensHeld * x[4])
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

main()
  .catch((e) => {
    // throw e
    console.log("An error occurred: " + e)
  })
  .finally(async () => {
    await client.close()
  })

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

// MATIC liquid Token Purchase Details
// 6th May 1651407301
// $3,000,000
// 3,333,333 Matic tokens
// $0.90 per token