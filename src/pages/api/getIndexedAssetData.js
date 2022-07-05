const CoinGecko = require('coingecko-api');
const { MongoClient } = require('mongodb');

const url = "mongodb+srv://bkCryptoTeam:Vw01wuSjeNkyeZrj@cluster0.tmpq7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "historical_price_data";

const CoinGeckoClient = new CoinGecko();
const startDate = 1609462800 // Jan 1st 2021
const endDate = Date.now() / 1000 
                                                                                                                               
const coinIds = [ "bitcoin", "ethereum", "yield-guild-games", "alethea-artificial-liquid-intelligence-token",
                  "immutable-x", "rainbow-token", "superfarm", "polygon", "sipher", "blackpool-token"]

export default async function handler(req, res) {

    try {
        // connect to mongodb cloud database
        await client.connect();
        const db = client.db(dbName);

        console.log("getIndexedAssetData endpoint invoked")

        const col = db.collection("bitcoin");
        const cursor = col.find().sort( { time : 1 } ) // sort by time (oldest first)
    
        // map result set into a format readable by the charting library (recharts)
        let values = cursor.map(index => {
            return { 
                "value" : index.value, 
                "time": index.time
            }
        });
    
        const arr = await values.toArray()
    
        const btcResults = {
            name: "Bitcoin",
            data: arr,
        }

        console.dir(btcResults)
        const results = [ btcResults ]
        res.send(results);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }

   
        
    
    // const results = await Promise.all(coinIds.map( async (x) => {
    //     const coinName = x
    //     const data = await CoinGeckoClient.coins.fetchMarketChartRange(coinName, { from: startDate, to: endDate })
    //     const priceDataArray = data.data.prices
        
    //     const mappedPriceDataArray = priceDataArray.map(x => {
    //         return {
    //             "time" : x[0],
    //             "value" : parseFloat(x[1])
    //         }
    //     })
    
    //     return {
    //         "name" : coinName,
    //         "data" : mappedPriceDataArray
    //     }
    // }))

    
}
            

        
        // let data = []
  
        // for (let i = 0; i < coinIds.length; i++) {
    
        //     const coinName = coinIds[i]
        //     const data = await CoinGeckoClient.coins.fetchMarketChartRange(coinIds[i], { from: startDate, to: endDate })
        //     const priceData = data.data.prices
        //     const mappedData = priceData.map(x => {
        //         return {
        //             "time" : x[0],
        //             "value" : x[1]
        //         }
        //     })
    
        //     data[i] = {"name" : coinName, "data" : mappedData}
        // }

            // console.log(JSON.stringify(data))
            
        //     coinIds.map(async _coin => {
        //     let data = await CoinGeckoClient.coins.fetchMarketChartRange(_coin, { from: startDate, to: endDate })
        //     let prices = parseFloat(data.data.prices)
        //     return {
        //         "coin" : _coin,
        //         "data" : prices
        //     }
        //   })