const { PrismaClient } = require('@prisma/client');

export default async function handler(req, res) {

    const prisma = new PrismaClient()
    console.log(`getTreasuryYieldCurves endpoint invoked`)

    try {

        
        const data = await prisma.treasury_yield_curves.findMany();
        // console.log(`data: ${JSON.stringify(data)}`)

        const series1 = data.map((element) => {
            if (element["bc_10year"] == undefined || element["bc_3month"] == undefined) {
                return
            } else {
                const val = element["bc_10year"] - element["bc_3month"] 
                return {
                    "time" : element["new_date"],
                    "val" : val,
                }
            }  
        })

        const series2 = data.map((element) => {
            if (element["bc_10year"] == undefined || element["bc_2year"] == undefined) {
                return
            } else {
                const val = element["bc_10year"] - element["bc_2year"] 
                return {
                    "time" : element["new_date"],
                    "val" : val,
                }
            } 
        })

        const resultsObj = {
            name: "3mo-10yr",
            data: series1,
        }

        const resultsObj2 = {
            name: "2yr-10yr",
            data: series2,
        }

        const result = [resultsObj, resultsObj2]
        res.send(result);
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await prisma.$disconnect()
    }
}
