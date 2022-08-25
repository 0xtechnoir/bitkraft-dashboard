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
import iAnalyticsTopReferralSources from 'src/views/dashboards/analytics/AnalyticsTopReferralSources'
import TreasuryYieldCurve from 'src/views/charts/recharts/TreasuryYieldCurve'
import TreasuryYieldCurveSpread from 'src/views/charts/recharts/TreasuryYieldCurveSpread'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

const AnalyticsDashboard = () => {
  
  const { settings } = useSettings()

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        
        <Grid item xs={12} md={12}>
          <TreasuryYieldCurveSpread direction={settings.direction} />
        </Grid>
       
        <Grid item xs={12} md={6}>
          <TreasuryYieldCurve direction={settings.direction} />
        </Grid>

        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='S&P 500'
            chartSrc="https://app.koyfin.com/share/4d937a406b/simple"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='FTSE 100'
            chartSrc="https://app.koyfin.com/share/63b871f5e7/simple"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='NASDAQ 100'
            chartSrc="https://app.koyfin.com/share/33a4ffb4f0/simple"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='Hang Seng China Enterprises Index'
            chartSrc=" https://app.koyfin.com/share/88fb45f96d/simple"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='Oil'
            chartSrc="https://app.koyfin.com/share/cec15aa75e/simple"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='Gold'
            chartSrc="https://app.koyfin.com/share/0e18aaa53a/simple"
          />
        </Grid> 

        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='Gaming Equities'
            chartSrc="https://app.koyfin.com/share/0f74e38dd1/simple"
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