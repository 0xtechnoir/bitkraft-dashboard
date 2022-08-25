const axios = require("axios");
require('dotenv').config()

export default async function handler(req, res) {

    const apiKey = process.env.COINGLASS_API_KEY;
    const data = await axios.get('https://open-api.coinglass.com/api/pro/v1/futures/openInterest/chart?interval=0&symbol=BTC', {
        headers: {
          'coinglassSecret': apiKey
        }
      })
    .then(response => {
        if (!response === 200) {
            throw new Error(
                `This is an HTTP error: The status is ${response.status}`
            );
        }
        return response.data;
    })

    const dateList = data.data.dateList

    const dataMap = data.data.dataMap

    let result = dateList.map((day, index) => {
        return {
            "date": day,
            "Binance": dataMap["Binance"][index],
            "Bitmex": dataMap["Bitmex"][index],
            "Bybit": dataMap["Bybit"][index],
            "CME": dataMap["CME"][index],
            "Okex": dataMap["Okex"][index],
            "FTX": dataMap["FTX"][index],
            "Deribit": dataMap["Deribit"][index],
            "Kraken": dataMap["Kraken"][index],
            "Bitfinex": dataMap["Bitfinex"][index],
            "Huobi": dataMap["Huobi"][index],
            "Bitget": dataMap["Bitget"][index],
            "dYdX": dataMap["dYdX"][index],
            "CoinEx": dataMap["CoinEx"][index],
        }
    })

    res.send(result);

    // let result = []
    // for (const exchange in dataMap) {
    //     console.log(`Exchange: ${JSON.stringify(exchange)}`)

    //     const mappedArray = dataMap[exchange].map((element, index) => {
            
    //         return {
    //             'date': dateList[index],
    //             'openInterest': element
    //         }
    //     })
    //     result.push(mappedArray)
    // }
    // res.send(result);
}
