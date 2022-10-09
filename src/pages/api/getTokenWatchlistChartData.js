const { PrismaClient } = require('@prisma/client');
require('dotenv').config()

const prisma = new PrismaClient()

export default async function handler(req, res) {

    console.log("getTokenWatchlistChartData API called")
    const data = await prisma.historical_token_watchlist_price_data.findMany();
    console.dir(data[0].data)
    res.send(data);
}
