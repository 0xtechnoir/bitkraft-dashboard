const { MongoClient } = require('mongodb');

const url = "mongodb+srv://bkCryptoTeam:Vw01wuSjeNkyeZrj@cluster0.tmpq7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "historical_price_data";

export default async function handler(req, res) {

    try {
        // connect to mongodb cloud database
        await client.connect();
        const db = client.db(dbName);

        const coinIds = [ "yield-guild-games", "alethea-artificial-liquid-intelligence-token",
                  "immutable-x", "rainbow-token-2", "superfarm", "matic-network", "sipher", "blackpool-token"]

        console.dir(req)
        // console.log(`getIndexedAssetData endpoint invoked with following params: ${req.query}`)

        let results = []

        for (let i = 0; i < coinIds.length; i++) {
            const col = db.collection(coinIds[i]);
            const cursor = col.find().sort( { time : 1 } ) // sort by time (oldest first)
        
            // map result set into a format readable by the charting library (recharts)
            let values = cursor.map(index => {
                return { 
                    "time": index.time,
                    "value" : index.value, 
                    "indexed_value" : index.indexed_value
                }
            });
        
            const arr = await values.toArray()
        
            const resultsObj = {
                name: coinIds[i],
                data: arr,
            }

            results[i] = resultsObj
        }
        
        res.send(results);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
