// const CoinGecko = require('coingecko-api');

// const CoinGeckoClient = new CoinGecko();
// const startDate = 1609462800 // Jan 1st 2021
// const endDate = Date.now() / 1000 
                                                                                                                               
// // const coinIds = [ "bitcoin", "ethereum", "yield-guild-games", "alethea-artificial-liquid-intelligence-token",
// //                   "immutable-x", "rainbow-token-2", "superfarm", "matic-network", "sipher", "blackpool-token"]

// const coinIds = [ "bitcoin", "ethereum", "yield-guild-games", "alethea-artificial-liquid-intelligence-token",
//                   "immutable-x", "rainbow-token-2"]

// async function main() {
       
//   let result = []

//   for (i = 0; i < coinIds.length; i++) {

//     console.log("starting loop")
//       const coinName = coinIds[i]
//       console.log(`coinName: ${coinName}`)
//       const data = await CoinGeckoClient.coins.fetchMarketChartRange(coinName, { from: startDate, to: endDate })
//       // console.log(`${coinIds[i]} data: ${JSON.stringify(data)}`)
//       const priceData = data.data.prices

//       const mappedData = priceData.map(x => {
//           return {
//               "time" : x[0],
//               "value" : parseFloat(x[1])
//           }
//       })

//       result[i] = {"name" : coinName, "data" : mappedData}
//       console.log(`Added ${coinIds[i]} data to results array`)
//   }
//   console.log(result)
// }

// main()


const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();
const startDate = 1609462800 // Jan 1st 2021
const endDate = Date.now() / 1000 
                                                                                                                               
const coinIds = [ "bitcoin", "ethereum", "yield-guild-games", "alethea-artificial-liquid-intelligence-token",
                  "immutable-x", "rainbow-token-2", "superfarm", "matic-network", "sipher", "blackpool-token"]

async function main() {
      

  const results = await Promise.all(coinIds.map( async (x) => {
      const coinName = x
      const data = await CoinGeckoClient.coins.fetchMarketChartRange(coinName, { from: startDate, to: endDate })
      const priceDataArray = data.data.prices
      
      const mappedPriceDataArray = priceDataArray.map(x => {
        return {
            "time" : x[0],
            "value" : parseFloat(x[1])
        }
      })

      return {
        "name" : coinName,
        "data" : mappedPriceDataArray
      }
  }))
  

  

  console.log(results)






  // for (i = 0; i < coinIds.length; i++) {

  //   console.log("starting loop")
  //     const coinName = coinIds[i]
  //     console.log(`coinName: ${coinName}`)
  //     const data = await CoinGeckoClient.coins.fetchMarketChartRange(coinName, { from: startDate, to: endDate })
  //     // console.log(`${coinIds[i]} data: ${JSON.stringify(data)}`)
  //     const priceData = data.data.prices

  //     const mappedData = priceData.map(x => {
  //         return {
  //             "time" : x[0],
  //             "value" : parseFloat(x[1])
  //         }
  //     })

  //     result[i] = {"name" : coinName, "data" : mappedData}
  //     console.log(`Added ${coinIds[i]} data to results array`)
  // }
  // console.log(result)
}

main()