// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Link from 'mdi-material-ui/Link'
import CartPlus from 'mdi-material-ui/CartPlus'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import AnalyticsSessions from 'src/views/dashboards/analytics/AnalyticsSessions'
import AnalyticsOverview from 'src/views/dashboards/analytics/AnalyticsOverview'
import AnalyticsPerformance from 'src/views/dashboards/analytics/AnalyticsPerformance'
import AnalyticsWeeklySales from 'src/views/dashboards/analytics/AnalyticsWeeklySales'
import AnalyticsVisitsByDay from 'src/views/dashboards/analytics/AnalyticsVisitsByDay'
import AnalyticsTotalRevenue from 'src/views/dashboards/analytics/AnalyticsTotalRevenue'
import AnalyticsSalesCountry from 'src/views/dashboards/analytics/AnalyticsSalesCountry'
import AnalyticsCongratulations from 'src/views/dashboards/analytics/AnalyticsCongratulations'
import AnalyticsActivityTimeline from 'src/views/dashboards/analytics/AnalyticsActivityTimeline'
import EmbeddedChart from 'src/views/dashboards/analytics/EmbeddedChart'
import AnalyticsProjectStatistics from 'src/views/dashboards/analytics/AnalyticsProjectStatistics'
import AnalyticsTopReferralSources from 'src/views/dashboards/analytics/AnalyticsTopReferralSources'
import RechartsLineChart from 'src/views/charts/recharts/RechartsLineChart'
import PortfolioPerformanceTracker from 'src/views/charts/recharts/PortfolioPerformanceTracker'
import IndexChart from 'src/views/charts/recharts/IndexChart'
import RechartsAreaChart from 'src/views/charts/recharts/RechartsAreaChart'
import RechartsBarChart from 'src/views/charts/recharts/RechartsBarChart'

// ** React Imports
import { useEffect, useState } from 'react'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Other Imports
import axios from "axios";



const AnalyticsDashboard = () => {
  const { settings } = useSettings()
  const [exchangeOpenInterest, setExchangeOpenInterest] = useState()
  const [liquidatablePositions, setLiquidatablePositions] = useState()

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
 
  useEffect(() => {
    console.log("useEffect called for liquidations")
    axios.get(`/api/getLiquidatablePositions`)
    .then(response => {
      if (!response === 200) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        )
      }
      setLiquidatablePositions(response.data)
      console.log("liquidatablePositions: " + JSON.stringify(response.data))
    })
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        {/* <Grid item xs={12} md={8}>
          <AnalyticsCongratulations />
        </Grid>
        <Grid item xs={6} md={2}>
          <CardStatisticsVertical
            stats='155k'
            color='primary'
            trendNumber='+22%'
            icon={<CartPlus />}
            title='Total Orders'
            chipText='Last 4 Month'
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <AnalyticsSessions />
        </Grid> */}

        <Grid item xs={12} md={6}>
          <RechartsAreaChart 
            title='Aggregated Open Interest of Bitcoin Futures'
            data={exchangeOpenInterest}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <RechartsBarChart 
            title='Liquidatable Positions'
            data={liquidatablePositions}
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

        {/* <Grid item xs={12} md={6}>
          <PortfolioPerformanceTracker direction={settings.direction} />
        </Grid> */}

        <Grid item xs={12} md={12}>
          <IndexChart direction={settings.direction} />
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

        
        
        {/* <Grid item xs={12} sm={6} md={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <AnalyticsTotalRevenue />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVertical
                stats='$13.4k'
                color='success'
                trendNumber='+38%'
                title='Total Sales'
                icon={<CurrencyUsd />}
                chipText='Last Six Month'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVertical
                color='info'
                stats='142.8k'
                icon={<Link />}
                trendNumber='+62%'
                chipText='Last One Year'
                title='Total Impressions'
              />
            </Grid>
            <Grid item xs={6}>
              <AnalyticsOverview />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsSalesCountry />
        </Grid>
        <Grid item xs={12} md={8}>
          <AnalyticsTopReferralSources />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsWeeklySales />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsVisitsByDay />
        </Grid>
        <Grid item xs={12} md={8}>
          <AnalyticsActivityTimeline />
        </Grid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
