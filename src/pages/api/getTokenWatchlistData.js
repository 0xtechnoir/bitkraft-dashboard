const axios = require("axios");
const CoinGecko = require('coingecko-api');
require('dotenv').config()
const { abbreviate } = require('src/views/charts/chartUtils')

const CoinGeckoClient = new CoinGecko();

export default async function handler(req, res) {

    // What tokens do we want to watch
    const watchList = ["illuvium", "gala", "axie-infinity"]

    // what data do we want to extract?
    // price change ($ and %) over 1D, 7D, 30D, YTD, 1Y
    // Market cap
    // Volumes over different time periods
    // circulating vs total supply
    let result = []

    for(let i=0; i < watchList.length; i++) {

        await CoinGeckoClient.coins.fetch(watchList[i], {
            tickers: true, 
            market_data: true, 
            community_data: false,
            developer_data: false,
            localization: false,
            sparkline: false 
        })
        .then(response => {
            if (!response === 200) {
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
            }

            const percChange24h = response.data.market_data.price_change_percentage_24h > 0 ? response.data.market_data.price_change_percentage_24h.toFixed(2) : `(${Math.abs(response.data.market_data.price_change_percentage_24h.toFixed(2))})`
            const percChange7d = response.data.market_data.price_change_percentage_7d > 0 ? response.data.market_data.price_change_percentage_7d.toFixed(2) : `(${Math.abs(response.data.market_data.price_change_percentage_7d.toFixed(2))})`
            const percChange30d = response.data.market_data.price_change_percentage_30d > 0 ? response.data.market_data.price_change_percentage_30d.toFixed(2) : `(${Math.abs(response.data.market_data.price_change_percentage_30d.toFixed(2))})`
            const percChange60d = response.data.market_data.price_change_percentage_60d > 0 ? response.data.market_data.price_change_percentage_60d.toFixed(2) : `(${Math.abs(response.data.market_data.price_change_percentage_60d.toFixed(2))})`
            const percChange1y = response.data.market_data.price_change_percentage_1y > 0 ? response.data.market_data.price_change_percentage_1y.toFixed(2) : `(${Math.abs(response.data.market_data.price_change_percentage_1y.toFixed(2))})`
               
            const mappedData = {
                "id": i,
                "Token": response.data.symbol.toUpperCase(),
                "Price ($)": Intl.NumberFormat().format(response.data.market_data.current_price.usd),
                "Price change 24hr (%)": percChange24h,
                "Price change 7d (%)": percChange7d,
                "Price change 30d (%)": percChange30d,
                "Price change 60d (%)": percChange60d,
                "Price change 1y (%)": percChange1y,
                "24 hr Volume": Intl.NumberFormat().format(response.data.market_data.total_volume.usd.toFixed(2)),
                "ATH ($)": Intl.NumberFormat().format(response.data.market_data.ath.usd.toFixed(2)),
                "ATH (%)": response.data.market_data.ath_change_percentage.usd.toFixed(0),
                "Market Cap ($)": abbreviate(response.data.market_data.market_cap.usd, 2, false, false).substring(1),
                "FDV ($)": abbreviate(response.data.market_data.fully_diluted_valuation.usd, 2, false, false).substring(1),
                "Circulating Supply": abbreviate(response.data.market_data.circulating_supply, 2, false, false).substring(1),
                "Total Supply": abbreviate(response.data.market_data.total_supply, 2, false, false).substring(1),
                "% circulating": ((response.data.market_data.circulating_supply / response.data.market_data.total_supply) * 100).toFixed(0)
            }
            result.push(mappedData)
        })
    }
    
    console.dir(result)
    res.send(result);
}
