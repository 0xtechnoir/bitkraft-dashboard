const { PrismaClient } = require('@prisma/client');

export default async function handler(req, res) {

    const prisma = new PrismaClient()
    console.log(`getIndexedAssetData endpoint invoked`)

    try {

        const coinIds = [ "yield_guild_games", "alethea_artificial_liquid_intelligence_token",
                  "immutable_x", "rainbow_token_2", "superfarm", "matic_network", "sipher", "blackpool_token"]

        let results = []

        for (let i = 0; i < coinIds.length; i++) {
            console.log(`Getting: ${coinIds[i]}`)
            const coinData = await prisma[coinIds[i]].findMany({
                where: { 
                    time : {
                        gte: 1609539760, // 01.01.2021
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
