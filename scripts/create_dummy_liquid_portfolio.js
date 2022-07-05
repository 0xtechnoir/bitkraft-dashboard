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
async function createPosition(_coinName, _db, _startDate, _endDate) {
    console.log(`Creating dataset for ${_coinName}`)
    const col = _db.collection(_coinName);
    const data = await CoinGeckoClient.coins.fetchMarketChartRange(_coinName, { from: _startDate, to: _endDate })
    const priceDataArray = data.data.prices
    const mappedPriceDataArray = priceDataArray.map((element, index, array) => {

        let indexedValue
        let currentValue = element[1]
        let lastValue

        if (index < 1) {
            indexedValue = 100
        } else {
            lastValue = array[index-1][1]
            indexedValue = 100 * ( currentValue / lastValue)
        }        
        return {
            "time" : element[0],
            "value" : parseFloat(element[1]),
            "indexed_value": indexedValue
        }
    })
    
    col.createIndex( { "time": 1 }, { unique: true } )
    const docsToWrite = await writeDocs(mappedPriceDataArray, col, _coinName)
    if (docsToWrite.length) {
        console.log(`Inserting ${docsToWrite.length} records`)
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

main()
  .catch((e) => {
    // throw e
    console.log("An error occurred: " + e)
  })
  .finally(async () => {
    await client.close()
  })