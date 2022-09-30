import { MongoClient } from 'mongodb'

const url = "mongodb+srv://bkCryptoTeam:Vw01wuSjeNkyeZrj@cluster0.tmpq7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "historical_price_data";

export default async function handler(req, res) {

    try {
        // connect to mongodb cloud database
        await client.connect();
        const db = client.db(dbName);

      // =================================================

        const col = db.collection("btc_position");
        const cursor = col.find().sort( { close_time : 1 } ) // sort by time (oldest first)

        // map result set into a format readable by the charting library (recharts)
        let values = cursor.map(index => {

              return { 
                "value" : parseInt(index.position_value_usd), 
                "time": index.close_time
              }
        });
        const arr = await values.toArray()

        const btcResults = {
          name: "BTC Benchmark",
          data: arr,
        }
        
        // =================================================
        const ethCol = db.collection("eth_position");
        const ethCursor = ethCol.find().sort( { close_time : 1 } ) // sort by time (oldest first)

        // map result set into a format readable by the charting library (recharts)
        let ethValues = ethCursor.map(index => {
            
              return { 
                "value" : parseInt(index.position_value_usd), 
                "time": index.close_time
              }
        });
        const ethArr = await ethValues.toArray()

        const ethResults = {
          name: "ETH Benchmark",
          data: ethArr,
        }

        // =================================================

        const maticCol = db.collection("matic_position");
        const maticCursor = maticCol.find().sort( { close_time : 1 } ) // sort by time (oldest first)

        // map result set into a format readable by the charting library (recharts)
        let maticValues = maticCursor.map(index => {

              return { 
                "value" : parseInt(index.position_value_usd), 
                "time": index.close_time
              }
        });
        const maticArr = await maticValues.toArray()

        const maticResults = {
          name: "Liquid Portfolio Value",
          data: maticArr,
        }

         // =================================================

        const results = [ btcResults, ethResults, maticResults]
        res.send(results);
      }
      catch (err) {
          console.log(err.stack);
      }
      finally {
          await client.close();
      }
}