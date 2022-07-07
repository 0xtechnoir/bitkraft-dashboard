const { PrismaClient } = require('@prisma/client');

export default async function handler(req, res) {
    // Endpoint is no longer used but keeping for future reference

    const prisma = new PrismaClient()
    // get the period passed in the request - should make it an enum
    const { period } = req.query
    console.log(`getIndexedAssetData [period] endpoint invoked with following period: ${period}`)
    // calculate how many ms in the period and subtract it from date.now()

    const DAY_MS = 86400000
    const YEAR_MS = 31536000000
    let startTime

    switch(period) {
        case "30D":
            startTime = Date.now() - (30 * DAY_MS);
            break;
        case "90D":
            startTime = Date.now() - (90 * DAY_MS);
            break;
        case "180D":
            startTime = Date.now() - (180 * DAY_MS);
            break;
        case "YTD":
            const currentYear = new Date().getFullYear() // 2022
            const date = new Date(`${currentYear}-01-01`) // first day of current year
            startTime = date.getTime(); // timestamp in ms
            break;
        case "1Y":
            startTime = Date.now() - YEAR_MS;
            break;
        case "ALL":
            startTime = 1609539760000 // 1st Jan 2021
            break;
        default:
            startTime = 1609539760000 // 1st Jan 2021
      }

    try {

        const coinIds = [ "yield_guild_games", "alethea_artificial_liquid_intelligence_token",
                  "immutable_x", "rainbow_token_2", "superfarm", "matic_network", "sipher", "blackpool_token"]

        let results = []

        for (let i = 0; i < coinIds.length; i++) {
            console.log(`Getting: ${coinIds[i]}`)
            const coinData = await prisma[coinIds[i]].findMany({
                where: { 
                    time : {
                        gte: startTime,
                     },
                }, orderBy : {
                    time : 'asc'
                }
            })
            
            const resultsObj = {
                name: coinIds[i],
                data: coinData,
            }

            results[i] = resultsObj
        }
        
        res.send(results);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await prisma.$disconnect()
    }
}
