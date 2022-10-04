const { PrismaClient } = require('@prisma/client');
require('dotenv').config()

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const data = await prisma.top_20_projects_by_market_cap.findMany();
    res.send(data);
}
