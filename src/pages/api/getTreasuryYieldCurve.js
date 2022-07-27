"use strict";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

export default async function handler(req, res) {

    const weekDaysInAYear = 260
    const weekDaysInAMonth = Math.round(weekDaysInAYear/12)
    const weekDaysInSixMonths = Math.round(weekDaysInAYear/2)

    try {
        const currentCurve = await getData(1, "Today") 
        const oneWeekAgoCurve = await getData(5, "-1W")
        const oneMonthAgoCurve = await getData(weekDaysInAMonth, "-1M") 
        const sixMonthsAgoCurve = await getData(weekDaysInSixMonths, "-6M")
        const oneYearAgoCurve = await getData(weekDaysInAYear, "-1Yr") 
        const result = [currentCurve, oneWeekAgoCurve, oneMonthAgoCurve, sixMonthsAgoCurve, oneYearAgoCurve]

        res.send(result);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await prisma.$disconnect()
    }
}

async function getData(_take, _label) {

    const data = await prisma.treasury_yield_curves.findMany({
        take: -_take
    });

    let result = {
        'timestamp' : data[0].new_date,
        'label' : _label,
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

    return result;
}