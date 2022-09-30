const { PrismaClient } = require('@prisma/client');
require('dotenv').config()

const prisma = new PrismaClient()

export default async function handler(req, res) {

    console.log("getFedLiquidityIndex API called")

    const data = await prisma.usd_liquidity_conditions_index.findMany({
        orderBy: {
            date: 'asc'
        }
    })
    console.dir(data)
    res.send(data);
}
