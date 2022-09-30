// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts'
import { LINE_COLOURS, changePeriodSimple, formatXAxis, formatDate } from '../chartUtils'
import { TimeToggleButtonsLight } from '../../components/TimeToggleButtonsLight'

const RechartsSingleLineChart = (props) => {

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
  }, [props.data])

  const CustomTooltip = ({ payload }) => {
    if (payload && payload.length) {
      return (
        <Card>
          <CardContent>
            <div className="custom-tooltip">
              <p className="label">{formatDate(payload[0].payload.date)}</p>
              <p className="label" style={{color:'#8884d8'}}>{`${payload?.[0] ? formatYAxis(payload[0].value.toFixed(0)) : ""}`}</p>
            </div>
        </CardContent>
        </Card>
      );
    }
    return null;
  };
  
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
                  right: 85,
                  left: 30,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={Object.keys(visibleData[0])[1]} tickFormatter={formatXAxis} minTickGap={30} />
                <YAxis padding={{ left: 60 }} tickFormatter={formatYAxis}/>
                <ReferenceLine y={visibleData[visibleData.length-1]["liquidity_index"]} stroke="black" strokeDasharray= "3 3" alwaysShow>
                  <Label value={formatYAxis(visibleData[visibleData.length-1]["liquidity_index"])} position="right" fill="red" />
                </ReferenceLine>
                <Line type="monotone" dataKey={Object.keys(visibleData[0])[2]} stroke={LINE_COLOURS[0]} dot={false} />
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    )
  }
}

export default RechartsSingleLineChart
