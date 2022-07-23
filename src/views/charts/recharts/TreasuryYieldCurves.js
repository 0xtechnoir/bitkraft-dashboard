// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import _ from 'lodash';

// ** Third Party Imports
import { LineChart, Line, Label, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Surface, Symbols } from 'recharts'
import axios from 'axios'

const TreasuryYieldCurves = ({ direction }) => {

  const [series, setSeries] = useState()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/getTreasuryYieldCurves`)
      .then(response => {
        if (!response === 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          )
        }
        console.log(JSON.stringify(response.data))
        setSeries(response.data)
        setLoading(false)
      })
  }, []);

  function formatYAxis(value) {
      return `${value.toFixed(1)}%`
  }
  
  if (loading) {
    return (
      <Card>
        <CardHeader
          title='Treasury Yield Curves'
          titleTypographyProps={{ variant: 'h6' }}
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            '& .MuiCardHeader-action': { mb: 0 },
            '& .MuiCardHeader-content': { mb: [2, 0] }
          }}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6' sx={{ mr: 5 }}></Typography>
            </Box>
          }
        />
        <CardContent>
          <Box sx={{ height: 400, width: 1250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <div><p>Loading...</p></div>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card>
      <CardHeader
        title={`US Treasury Yield Curve - ${new Date(series[0].timestamp).toDateString()}`}
        titleTypographyProps={{ variant: 'h6' }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <Box sx={{ height: 400, width: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ top: 15, right: 30, left: 40, bottom: 20 }} data={series[0].data}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name" data={series[0].data}>
                <Label value="Residual Maturity" offset={0} position="bottom" />
              </XAxis>
              <YAxis type="number" axisLine={false} domain={[1.5, 3.5]} tickFormatter={formatYAxis}/>       
              <Line dataKey="val" type="monotone" dot={false} stroke="#e6194B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TreasuryYieldCurves
