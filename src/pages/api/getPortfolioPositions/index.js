import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const url = "mongodb+srv://bkCryptoTeam:Vw01wuSjeNkyeZrj@cluster0.tmpq7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "historical_price_data";
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];


export default async function handler(req, res) {

    try {
        await prisma.$connect()
        const maticPositions = await prisma.matic_position.findMany()
    
        // map result set into a format readable by the charting library (recharts)
        let values = maticPositions.map(index => {
            let date = new Date(index.close_time);
            return { 
              "value" : parseInt(index.position_value_usd), 
              "time": `${date.getDate()}/${monthNames[date.getMonth()]}/${date.getYear()-100}` 
            }
        });
        const results = await values.toArray()
        // return data
        res.send(results);
    }
    catch (err) {
        console.log(err.stack);
    }
    finally {
        await prisma.$disconnect();
    }
    

    // try {
    //     // connect to mongodb cloud database
    //     await client.connect();
    //     const db = client.db(dbName);
    //     const col = db.collection("BTCUSD");
    //     const cursor = col.find().sort( { close_time : 1 } ) // sort by time (oldest first)

    //     // map result set into a format readable by the charting library (recharts)
    //     let values = cursor.map(index => {
    //           let date = new Date(index.close_time);
    //           return { 
    //             "price" : parseInt(index.close_price), 
    //             "time": `${date.getDate()}/${monthNames[date.getMonth()]}/${date.getYear()-100}` 
    //           }
    //     });
    //     const results = await values.toArray()

    //     // return data
    //     res.send(results);
    //   }
    //   catch (err) {
    //       console.log(err.stack);
    //   }
    //   finally {
    //       await client.close();
    //   }
}