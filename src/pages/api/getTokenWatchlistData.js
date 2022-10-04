const { PrismaClient } = require('@prisma/client');
require('dotenv').config()

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const data = await prisma.token_watchlist.findMany();
    res.send(data);
}
