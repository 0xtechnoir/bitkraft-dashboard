import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import EmbeddedChart from 'src/views/charts/EmbeddedChart'
import TreasuryYieldCurve from 'src/views/charts/recharts/TreasuryYieldCurve'
import TreasuryYieldCurveSpread from 'src/views/charts/recharts/TreasuryYieldCurveSpread'
import RechartsSingleLineChart from 'src/views/charts/recharts/RechartsSingleLineChart'
import { useSettings } from 'src/@core/hooks/useSettings'
import axios from "axios";
import { Route, Routes, Link } from "react-router-dom";
import { Button } from '@mui/material';


const AnalyticsDashboard = () => {
  
  const { settings } = useSettings()
  const [fedLiquidityIndex, setFedLiquidityIndex] = useState()
  

  useEffect(() => {
    axios.get(`/api/getFedLiquidityIndex`)
    .then(response => {
      if (!response === 200) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        )
      }
      setFedLiquidityIndex(response.data)
    })
  }, [])

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
          <RechartsSingleLineChart
            title='FED Liquidity Index'
            data={fedLiquidityIndex} 
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <EmbeddedChart 
            title='S&P 500'
            chartSrc="https://app.koyfin.com/share/4d937a406b/simple"
          />
          <></>
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