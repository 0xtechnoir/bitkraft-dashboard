// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const EmbeddedChart = (props) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Card>
      <CardHeader title={props.title} titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }} />
      <CardContent>     
        <div style={{height: '620px'}}>
          <TradingViewWidget
            autosizing
            symbol="NASDAQ:AAPL"
            interval="D"
            timezone="Etc/UTC"
            theme={Themes.LIGHT}
            style="1"
            locale="en"
            toolbar_bg="#f1f3f6"
            container_id="tradingview_8ae47"
          />   
        </div>
      </CardContent>
    </Card>
  )
}

export default EmbeddedChart
