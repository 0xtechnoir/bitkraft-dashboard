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

const AnalyticsDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        
        <Grid item xs={12} md={12}>
          <EmbeddedChart
            chartSrc="https://www.footprint.network/public/chart/30-Day-Gaming-Volume-by-Chain-fp-d12a48da-4766-4b61-86c4-93a6a47523e6"
            height="550"
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <EmbeddedChart
            chartSrc="https://www.footprint.network/public/chart/GameFi-Monthly-Volume-fp-33a2e714-008a-4599-8594-a98e29178fba"
            height="550"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <EmbeddedChart
            chartSrc="https://www.footprint.network/public/chart/Monthly-GameFi-Users-fp-8003b8ec-17f0-48a9-be3b-291977977053"
            height="550"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <EmbeddedChart
            chartSrc="https://www.footprint.network/public/chart/New-users-by-chain-over-past-30-days-fp-ab95d5ea-a90f-432c-a38e-c6d849cf2032"
            height="500"
            width="650"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <EmbeddedChart
            chartSrc="https://www.footprint.network/public/chart/Unique-Users-by-Chain-Over-Past-30-Days-fp-f16eb47a-15e6-4933-afd9-9bb11d5ad2e1"
            height="500"
            width="650"
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <EmbeddedChart
            chartSrc="https://www.footprint.network/public/chart/Transaction-Numbers-Per-Chain-Over-Past-30-Days-fp-57338142-3b34-4f95-a354-09ac93f6ff55"
            height="600"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <EmbeddedChart
            chartSrc="https://www.footprint.network/public/chart/Crypto-Unicorns-Total-Users-Vs-Active-Users-fp-fe30de5f-11b1-40dd-be6b-cb879ca1abb3"
            height="500"
            width="650"
          />
        </Grid>   
      </Grid> 
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard

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