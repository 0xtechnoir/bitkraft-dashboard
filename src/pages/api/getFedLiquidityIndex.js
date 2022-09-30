const { PrismaClient } = require('@prisma/client');
require('dotenv').config()

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const data = await prisma.usd_liquidity_conditions_index.findMany({
        orderBy: {
            date: 'asc'
        }
    })

    res.send(data);
}
