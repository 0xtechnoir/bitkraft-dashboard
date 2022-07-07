import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Connect the client
  await prisma.$connect()

  // READ
  const ethereum = await prisma.ethereum.findMany()
  console.log(ethereum)

  // WRITE
//   await prisma.write_test.create({
//     data: {
//       name: 'Rich',
//       email: 'hello@prisma.com',
//       posts: {
//         create: {
//           title: 'My first post',
//           body: 'Lots of really interesting stuff',
//           slug: 'my-first-post',
//         },
//       },
//     },
//   })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })