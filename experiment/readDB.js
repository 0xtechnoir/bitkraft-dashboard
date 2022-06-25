const { MongoClient } = require("mongodb");

const url = "mongodb+srv://bkCryptoTeam:Vw01wuSjeNkyeZrj@cluster0.tmpq7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "historical_price_data";

async function run() {
    try {
  
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      const col = db.collection("BTCUSD");
      const cursor = col.find()
      await cursor.forEach(console.dir);
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