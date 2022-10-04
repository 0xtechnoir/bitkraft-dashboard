import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import EmbeddedChart from 'src/views/charts/EmbeddedChart'
import RechartsLineChart from 'src/views/charts/recharts/RechartsLineChart'
import IndexChart from 'src/views/charts/recharts/IndexChart'
import RechartsAreaChart from 'src/views/charts/recharts/RechartsAreaChart'
import TokenWatchlistTable from 'src/views/table/data-grid/TokenWatchlistTable'
import { useEffect, useState } from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'
import axios from "axios";

const AnalyticsDashboard = () => {
  const { settings } = useSettings()
  const [exchangeOpenInterest, setExchangeOpenInterest] = useState()

  useEffect(() => {
    axios.get(`/api/getExchangeOpenInterest`)
    .then(response => {
      if (!response === 200) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        )
      }
      setExchangeOpenInterest(response.data)
    })
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} md={6}>
          <RechartsAreaChart 
            title='Aggregated Open Interest of Bitcoin Futures'
            data={exchangeOpenInterest}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='Bitcoin Dominance'
            chartSrc="https://embed.theblockcrypto.com/data/crypto-markets/prices/bitcoin-dominance/embed"
          />
        </Grid>       
        <Grid item xs={12} md={6}>
          <RechartsLineChart direction={settings.direction} />
        </Grid>
        <Grid item xs={12} md={12}>
          <IndexChart direction={settings.direction} />
        </Grid>     
        <Grid item xs={12} md={12}>
          <TokenWatchlistTable direction={settings.direction} 
            title='Token Watchlist'
            endpoint='getTokenWatchlistData'
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TokenWatchlistTable direction={settings.direction} 
            title='Top 20 by Market Cap'
            endpoint='getTop20ByMarketCap'
            height={800}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='Daily New Unique Addresses for EVM-Chains'
            chartSrc="https://embed.theblockcrypto.com/data/scaling-solutions/evm-chains-stats/daily-new-unique-addresses-for-evm-chains/embed"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='Transaction Count (Daily, 7DMA)'
            chartSrc="https://embed.theblockcrypto.com/data/scaling-solutions/evm-chains-stats/transaction-count-for-evm-chains/embed"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='Solana - Non-Vote Transactions (Daily, 7DMA)'
            chartSrc="https://embed.theblockcrypto.com/data/on-chain-metrics/solana/non-vote-transactions-on-the-solana-network-daily-7dma/embed"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='Ethereum Bridge TVL'
            chartSrc="https://dune.com/embeds/915736/1601441/ef723fa3-2e84-489a-889d-29b3223cbb81"
          />
        </Grid>     
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
