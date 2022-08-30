import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(request, res) {
    try {
        console.log("getLiquidatablePositions endpoint called...")
        const prisma = new PrismaClient()

        console.dir(prisma)


        const ethereumLiquidationData = await prisma["etheruem_liqudation_positions"].findMany()
        console.log(`ethereumLiquidationData: ${ethereumLiquidationData}`)

        const results = ethereumLiquidationData
        res.send(results)
    } 
    catch (err) {
        console.log(err.stack);
    }
    finally {
        await prisma.$disconnect()
        console.log("disconnected")
    }
}

export const config = {
    api: {
      responseLimit: false,
    },
  }
