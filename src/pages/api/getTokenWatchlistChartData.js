const { PrismaClient } = require('@prisma/client');
require('dotenv').config()

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const data = await prisma.historical_token_watchlist_price_data.findMany();
    res.send(data);
}
