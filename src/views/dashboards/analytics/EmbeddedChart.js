// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

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
      <Grid container>
        <StyledGrid item xs={12} sm={'auto'}>
          <CardHeader title={props.title} titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }} />
          <CardContent>
            <iframe width="600" height="420" src={props.chartSrc} frameBorder="0"></iframe>
          </CardContent>
        </StyledGrid>
      </Grid>
    </Card>
  )
}

export default EmbeddedChart
