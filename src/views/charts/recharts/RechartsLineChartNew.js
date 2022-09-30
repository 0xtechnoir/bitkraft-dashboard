// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// ** Third Party Imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import axios from 'axios'

import { LINE_COLOURS, MONTH_NAMES, changePeriodSimple, formatXAxis, abbreviate } from '../chartUtils'
import { TimeToggleButtonsLight } from '../../components/TimeToggleButtonsLight'

const RechartsLineChart = (props) => {

  const [visibleData, setVisibleData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [series, setSeries] = useState()

  const handleClick = (_period, _series) => {
    setVisibleData(changePeriodSimple(_period, _series, 7))
  }

  const formatYAxis = (value) => {
    return new Intl.NumberFormat().format(value)
  }

  useEffect(() => {
    if (props.data) {
      setSeries(props.data)
      setVisibleData(props.data)
      setLoaded(true)
    }  
    console.log(`Data: ${JSON.stringify(props.data)}`)
  }, [props.data])
  
  if(!loaded) {
    return (
      <Card>
        <CardHeader
          title={props.title}
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
              <p>Loading...</p>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    )
  } else {

    return (
      <Card>
        <CardHeader
          title={props.title}
          titleTypographyProps={{ variant: 'h6' }}
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            '& .MuiCardHeader-action': { mb: 0 },
            '& .MuiCardHeader-content': { mb: [2, 0] }
          }}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='h6' sx={{ mr: 5 }}>
               
              </Typography>

              <TimeToggleButtonsLight 
                data={series} 
                handleClick={handleClick}>
              </TimeToggleButtonsLight>
            </Box>
          }
        />
        <CardContent>
          <Box sx={{ height: 400, width: 600 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                width={500}
                height={300} 
                data={visibleData} 
                margin={{
                  top: 5,
                  right: 30,
                  left: 40,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={Object.keys(visibleData[0])[1]} tickFormatter={formatXAxis} interval="preserveStartEnd" allowDuplicatedCategory={false}/>
                <YAxis padding={{ left: 60 }} tickFormatter={formatYAxis}/>
                <Line type="monotone" dataKey={Object.keys(visibleData[0])[2]} stroke={LINE_COLOURS[0]} dot={false} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    )
  }
  
}

export default RechartsLineChart
