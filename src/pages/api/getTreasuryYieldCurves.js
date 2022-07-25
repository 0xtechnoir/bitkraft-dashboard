"use strict";
const { PrismaClient } = require('@prisma/client');

export default async function handler(req, res) {

    const prisma = new PrismaClient()

    try {

        // get the latest record
        const data = await prisma.treasury_yield_curves.findMany({
            take: -1
        });

        const result = [
            {
                'timestamp' : data[0].new_date,
                'data' : [
                    {
                        'name' : '1M', 
                        'val' : data[0].bc_1month
                    },
                    {
                        'name' : '2M', 
                        'val' : data[0].bc_2month
                    },
                    {
                        'name' : '3M', 
                        'val' : data[0].bc_3month
                    },
                    {
                        'name' : '6M', 
                        'val' : data[0].bc_6month
                    },
                    {
                        'name' : '1Y', 
                        'val' : data[0].bc_1year
                    },
                    {
                        'name' : '2Y', 
                        'val' : data[0].bc_2year
                    },
                    {
                        'name' : '3Y', 
                        'val' : data[0].bc_3year
                    },
                    {
                        'name' : '5Y', 
                        'val' : data[0].bc_5year
                    },
                    {
                        'name' : '7Y', 
                        'val' : data[0].bc_7year
                    },
                    {
                        'name' : '10Y', 
                        'val' : data[0].bc_10year
                    },
                    {
                        'name' : '20Y', 
                        'val' : data[0].bc_20year
                    },
                    {
                        'name' : '30Y', 
                        'val' : data[0].bc_30year
                    }
                ]
            }
        ]

        res.send(result);

    } catch (err) {
        console.log("Error occured during API logic")
        console.log(err.stack);
    }
    finally {
        await prisma.$disconnect()
    }
}