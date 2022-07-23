"use strict";
const { PrismaClient } = require('@prisma/client');

export default async function handler(req, res) {

    const prisma = new PrismaClient()

    try {

        const d = new Date()
        const currentYear = d.getFullYear()
        const currentMonth = ("0" + (d.getMonth() + 1)).slice(-2)
        const yesterday = d.getDate() - 1
        const timestamp = toTimestamp(currentYear,currentMonth,yesterday,'00','00','00')
        
        const data = await prisma.treasury_yield_curves.findUnique({
            where: {
                new_date: timestamp,
            },
        });

        const result = [
            {
                'timestamp' : data.new_date,
                'data' : [
                    {
                        'name' : '1M', 
                        'val' : data.bc_1month
                    },
                    {
                        'name' : '2M', 
                        'val' : data.bc_2month
                    },
                    {
                        'name' : '3M', 
                        'val' : data.bc_3month
                    },
                    {
                        'name' : '6M', 
                        'val' : data.bc_6month
                    },
                    {
                        'name' : '1Y', 
                        'val' : data.bc_1year
                    },
                    {
                        'name' : '2Y', 
                        'val' : data.bc_2year
                    },
                    {
                        'name' : '3Y', 
                        'val' : data.bc_3year
                    },
                    {
                        'name' : '5Y', 
                        'val' : data.bc_5year
                    },
                    {
                        'name' : '7Y', 
                        'val' : data.bc_7year
                    },
                    {
                        'name' : '10Y', 
                        'val' : data.bc_10year
                    },
                    {
                        'name' : '20Y', 
                        'val' : data.bc_20year
                    },
                    {
                        'name' : '30Y', 
                        'val' : data.bc_30year
                    }
                ]
            }
        ]
             
        res.send(result);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await prisma.$disconnect()
    }
}

function toTimestamp(year,month,day,hour,minute,second){
    var datum = new Date(year,month-1,day,hour,minute,second);

    return datum.getTime();
}
