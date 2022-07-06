const { MongoClient } = require("mongodb");
const CoinGecko = require('coingecko-api');
const axios = require("axios")

const endDate = Date.now(); // expressed in milliseconds
const URL = "mongodb+srv://bkCryptoTeam:Vw01wuSjeNkyeZrj@cluster0.tmpq7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(URL);
const CoinGeckoClient = new CoinGecko();
let ethereumPriceData = []

async function main() {

    const coinIds = [ "yield-guild-games", "alethea-artificial-liquid-intelligence-token",
                  "immutable-x", "rainbow-token-2", "superfarm", "matic-network", "sipher", "blackpool-token"]
    
    await client.connect()
    const db = client.db("historical_price_data")

    const startDate = 1609462800 // Jan 1st 2021
    const endDate = Date.now() / 1000 

    // First pull ethereum prices
    await createPosition("ethereum", db, startDate, endDate)
    // console.log(`ethereumPriceData:    ${JSON.stringify(ethereumPriceData)}`)

    for (let i = 0; i < coinIds.length; i++) {
        await createPosition(coinIds[i], db, startDate, endDate)
    }
}

function calculateEthPrice(tokenElement) {
    const timestamp = tokenElement[0]
    // console.log(`time:       ${time}`)
    // find correct element in ethereumPriceData array
    const ethElement = ethereumPriceData.find(x => x.time == timestamp)

    // console.log(`timestamp: ${timestamp}`)
    // console.log(`ethElement: ${ethElement}`)
    // console.log(`value in USD: ${tokenElement[1]}`)
    // console.log(`value in Eth: ${tokenElement[1] / ethElement.usd_value}`)
    // return the token price in terms of ETH
    return tokenElement[1] / ethElement.usd_value


}

async function createPosition(_coinName, _db, _startDate, _endDate) {
    console.log(`Creating dataset for ${_coinName}`)
    const col = _db.collection(_coinName);
    const data = await CoinGeckoClient.coins.fetchMarketChartRange(_coinName, { from: _startDate, to: _endDate })
    const priceDataArray = data.data.prices
    const mappedPriceDataArray = priceDataArray.map((element, index, array) => {

        let indexedValue
        let currentValue = element[1]
        let firstValue = array[0][1]

        // calculate indexed USD value 
        if (index < 1) {
            indexedValue = 100
        } else {
            indexedValue = 100 * ( currentValue / firstValue)
        } 

        const eth_value = (_coinName == "ethereum") ? 1 : calculateEthPrice(element)

        return {
            "time" : element[0],
            "usd_value" : parseFloat(element[1]),
            "indexed_usd_value": indexedValue,
            "eth_value" : eth_value
        }
    })

    if (_coinName == "ethereum") {
        ethereumPriceData = [...mappedPriceDataArray]
    }
    
    col.createIndex( { "time": 1 }, { unique: true } )
    const docsToWrite = await writeDocs(mappedPriceDataArray, col, _coinName)
    if (docsToWrite.length) {
        console.log(`Inserting ${docsToWrite.length} records`)
        await col.insertMany(docsToWrite, { ordered : false});
    }
}

// async function createPosition(_coinName, _db, _startDate, _endDate) {
//     console.log(`Creating dataset for ${_coinName}`)
//     const col = _db.collection(_coinName);
//     const data = await CoinGeckoClient.coins.fetchMarketChartRange(_coinName, { from: _startDate, to: _endDate })
//     const priceDataArray = data.data.prices
//     const mappedPriceDataArray = priceDataArray.map((element, index, array) => {

//         let indexedValue
//         let currentValue = element[1]
//         let firstValue = array[0][1]

//         if (index < 1) {
//             indexedValue = 100
//         } else {
//             indexedValue = 100 * ( currentValue / firstValue)
//         }        
//         return {
//             "time" : element[0],
//             "value" : parseFloat(element[1]),
//             "indexed_value": indexedValue
//         }
//     })
    
//     col.createIndex( { "time": 1 }, { unique: true } )
//     const docsToWrite = await writeDocs(mappedPriceDataArray, col, _coinName)
//     if (docsToWrite.length) {
//         console.log(`Inserting ${docsToWrite.length} records`)
//         await col.insertMany(docsToWrite, { ordered : false});
//     }
// }

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