import { useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import { AdvancedChart } from "react-tradingview-embed";

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const TradingViewEmbeddedChart = (props) => {
  // ** Hook
  const theme = useTheme()
  const symbol = "( FRED:WALCL - ( FRED:WDTGAL + FRED:RRPONTSYD * 1000 ) )"

  useEffect(() => {
    const { TradingViewWidget, Themes, IntervalTypes } = require("react-tradingview-widget");
  }, [])

  return (
    <Card>
      <CardHeader title={props.title} titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }} />
      <CardContent>
        <div style={{overflow : "hidden"}} >
        {/* <TradingViewWidget
          width={600}
          height={600}
          symbol="( FRED:WALCL - ( FRED:WDTGAL + FRED:RRPONTSYD * 1000 ) )"
          theme={Themes.LIGHT}
          locale="en"
          interval={IntervalTypes.D}
          timezone="Etc/UTC"
          toolbar_bg="#f1f3f6"
          container_id="tradingview_b2733"
        /> */}

            {/* <TradingViewEmbed
              widgetType={widgetType.ADVANCED_CHART}
              widgetConfig={{
                interval: "1D",
                colorTheme: "dark",
                width: "100%",
                symbol: query + "USD",
                studies: [
                  "MACD@tv-basicstudies",
                  "StochasticRSI@tv-basicstudies",
                  "TripleEMA@tv-basicstudies"
                ]
              }}
            /> */}

          <AdvancedChart widgetProps={{
            "theme": "light", 
            "interval": "1D",
            "symbol": "( FRED:WALCL - ( FRED:WDTGAL + FRED:RRPONTSYD * 1000 ) )",
            "hide_top_toolbar": true,
            "hide_side_toolbar": true,

            }} />
        
        </div>
      </CardContent>
    </Card>
  )
}

export default TradingViewEmbeddedChart