const { MongoClient } = require("mongodb");
const CoinGecko = require('coingecko-api');
const axios = require("axios")

const endDate = Date.now(); // expressed in milliseconds
const URL = "mongodb+srv://bkCryptoTeam:Vw01wuSjeNkyeZrj@cluster0.tmpq7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(URL);
const CoinGeckoClient = new CoinGecko();

async function main() {

    const coinIds = [ "bitcoin", "ethereum", "yield-guild-games", "alethea-artificial-liquid-intelligence-token",
                  "immutable-x", "rainbow-token-2", "superfarm", "matic-network", "sipher", "blackpool-token"]

    const maticPurchaseDate = 1651791600 * 1000 // Epoch Unix Timestamp for 6th May 2022, converted to milliseconds
    await client.connect()
    const db = client.db("historical_price_data")

    const startDate = 1609462800 // Jan 1st 2021
    const endDate = Date.now() / 1000 

    for (let i = 0; i < coinIds.length; i++) {
        await createPosition(coinIds[i], db, startDate, endDate)
    }
    
    
    // const maticPosition = await createPosition("MATICUSDT", "matic_position", db, maticPurchaseDate, 3000000)
    // const btcPosition = await createBenchmark("BTCUSDT", "btc_position", db, maticPurchaseDate, 3000000)
    // const ethPosition = await createBenchmark("ETHUSDT", "eth_position", db, maticPurchaseDate, 3000000)
}

// async function createPosition(_pair, _collectionName, _db, _startDate, _purchasePrice) {
//     const col = _db.collection(_collectionName);
//     const data = await getData(_pair, "1d", _startDate)
//     const mappedData = mapData(data, 3333333)
//     mappedData[0].position_value_usd = _purchasePrice // change the initial value from market price to TWAP price
//     col.createIndex( { "close_time": 1 }, { unique: true } )
//     const docsToWrite = await writeDocs(mappedData, col, _pair)
//     if (docsToWrite.length) {
//         await col.insertMany(docsToWrite, { ordered : false});
//     }
// }

async function createPosition(_coinName, _db, _startDate, _endDate) {
    console.log(`Creating dataset for ${_coinName}`)
    const col = _db.collection(_coinName);
    const data = await CoinGeckoClient.coins.fetchMarketChartRange(_coinName, { from: _startDate, to: _endDate })
    const priceDataArray = data.data.prices

    const mappedPriceDataArray = priceDataArray.map(x => {
        return {
            "time" : x[0],
            "value" : parseFloat(x[1])
        }
    })

    col.createIndex( { "time": 1 }, { unique: true } )
    
    const docsToWrite = await writeDocs(mappedPriceDataArray, col, _coinName)
    if (docsToWrite.length) {
        await col.insertMany(docsToWrite, { ordered : false});
    }
}

async function writeDocs(mappedData, col) {   
    const docsToAdd = [];
    for (const x of mappedData){
        const count = await col.countDocuments( { close_time: x.close_time })
        if(!count) {
            docsToAdd.push(x);
        }
    }
    return docsToAdd
}

// function mapData(data, tokensHeld) {
//     const mappedData = data.map(x => {
//         return {
//             "close_time": parseFloat(x[6]),
//             "close_price": parseFloat(x[4]),
//             "tokens_held": parseFloat(tokensHeld),
//             "position_value_usd": parseFloat(tokensHeld * x[4])
//         };
//     });
//     return mappedData;
// }

// async function getData(pair, interval, startDate) {
//     const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${pair}&interval=${interval}&startTime=${startDate}&endTime=${endDate}&limit=1000`)
//     if (!response.status === 200) {
//         throw new Error(
//             `This is an HTTP error: The status is ${response.status}`
//         );
//     }
//     return response.data;
// }




// async function createBenchmark(_pair, _collectionName, db, _startDate, _purchasePrice) {
//     const col = db.collection(_collectionName);
//     const data = await getData(_pair, "1d", _startDate)
//     const benchmarkEquavalent = _purchasePrice / parseFloat(data[0][4])
//     const mappedData = mapData(data, benchmarkEquavalent)
//     col.createIndex( { "close_time": 1 }, { unique: true } )
//     const docsToWrite = await writeDocs(mappedData, col, _pair)
//     if (docsToWrite.length) {
//         return await col.insertMany(docsToWrite, { ordered : false});
//     }
// }





main()
  .catch((e) => {
    // throw e
    console.log("An error occurred: " + e)
  })
  .finally(async () => {
    await client.close()
  })

/* example response from Binance
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