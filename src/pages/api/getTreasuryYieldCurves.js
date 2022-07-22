"use strict";
const { PrismaClient } = require('@prisma/client');

export default async function handler(req, res) {

    const prisma = new PrismaClient()
    console.log(`getTreasuryYieldCurves endpoint invoked`)

    try {

        const data = await prisma.treasury_yield_curves.findMany();

        // const series1 = data.map((element, index, array) => {
        //     if (element["bc_10year"] == undefined || element["bc_3month"] == undefined) {
        //         const val = parseFloat(array[index-1]["bc_10year"]) - parseFloat(array[index-1]["bc_3month"]) 

        //         return {
        //             "time" : element["new_date"],
        //             "val" : val,
        //         }
        //     } else {
        //         const val = parseFloat(element["bc_10year"]) - parseFloat(element["bc_3month"]) 

        //         return {
        //             "time" : element["new_date"],
        //             "val" : val,
        //         }
        //     }  
        // })

        
       
        const series1 = data.map((element, index, array) => {

            // console.log(`Series 1 - Mapping Element: ${JSON.stringify(element)}`)
            Object.hasOwnProperty.bind(element)

            if (element.hasOwnProperty('bc_10year') || element.hasOwnProperty('bc_3month')) {
                
                const val = parseFloat(element["bc_10year"]) - parseFloat(element["bc_3month"]) 

                return {
                    "time" : element["new_date"],
                    "val" : val,
                }
              
            } 

                // const val = parseFloat(array[index-1]["bc_10year"]) - parseFloat(array[index-1]["bc_3month"]) 

                return
            
        })

        const series2 = data.map((element, index, array) => {
            // console.log(`Series 2 - Mapping Element: ${JSON.stringify(element)}`)
            Object.hasOwnProperty.bind(element)
            if (element.hasOwnProperty('bc_10year') || element.hasOwnProperty('bc_2year')) {
                const val = parseFloat(element["bc_10year"]) - parseFloat(element["bc_2year"])

                return {
                    "time" : element["new_date"],
                    "val" : val,
                }
            } 
                // const val = parseFloat(array[index-1]["bc_10year"]) - parseFloat(array[index-1]["bc_2year"])

                return 
            
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
