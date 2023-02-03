// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Components
import RechartsWrapper from 'src/@core/styles/libs/recharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import RechartsBarChart from 'src/views/charts/recharts/RechartsBarChart'
import RechartsPieChart from 'src/views/charts/recharts/RechartsPieChart'
import RechartsLineChart from 'src/views/charts/recharts/RechartsLineChart'
import RechartsAreaChart from 'src/views/charts/recharts/RechartsAreaChart'
import RechartsRadarChart from 'src/views/charts/recharts/RechartsRadarChart'
import RechartsScatterChart from 'src/views/charts/recharts/RechartsScatterChart'



import TreasuryYieldCurves from 'src/views/charts/recharts/TreasuryYieldCurve'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Recharts = () => {
  // ** Hooks
  const { settings } = useSettings()

  return (
    <RechartsWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <TreasuryYieldCurves direction={settings.direction} />
          </Grid>
        </Grid>
    </RechartsWrapper>
  )
}

export default Recharts
