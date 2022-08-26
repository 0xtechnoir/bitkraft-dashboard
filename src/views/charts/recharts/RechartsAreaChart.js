// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'
import BellOutline from 'mdi-material-ui/BellOutline'
import ChevronDown from 'mdi-material-ui/ChevronDown'

import { LINE_COLOURS, MONTH_NAMES, abbreviate, getDayOfYear, formatDate } from '../chartUtils'

const CustomTooltip = ({ payload }) => {
  console.log(`Payload: ${JSON.stringify(payload)}`)
  if (payload && payload.length) {
    return (
      <Card>
        <CardContent>
          <div className="custom-tooltip">
            <p className="label">{formatDate(payload[0].payload.date)}</p>
            <p className="label" style={{color:LINE_COLOURS[10]}}>{`${(payload?.[10]) ? payload[10].name : ""} : ${payload?.[10] ? (abbreviate(payload[10].value.toFixed(), 2)) : ""}`}</p>
            <p className="label" style={{color:LINE_COLOURS[9]}}>{`${(payload?.[9]) ? payload[9].name : ""} : ${payload?.[9] ? (abbreviate(payload[9].value.toFixed(), 2)) : ""}`}</p>
            <p className="label" style={{color:LINE_COLOURS[8]}}>{`${(payload?.[8]) ? payload[8].name : ""} : ${payload?.[8] ? (abbreviate(payload[8].value.toFixed(), 2)) : ""}`}</p>
            <p className="label" style={{color:LINE_COLOURS[7]}}>{`${(payload?.[7]) ? payload[7].name : ""} : ${payload?.[7] ? (abbreviate(payload[7].value.toFixed(), 2)) : ""}`}</p>
            <p className="label" style={{color:LINE_COLOURS[6]}}>{`${(payload?.[6]) ? payload[6].name : ""} : ${payload?.[6] ? (abbreviate(payload[6].value.toFixed(), 2)) : ""}`}</p>
            <p className="label" style={{color:LINE_COLOURS[5]}}>{`${(payload?.[5]) ? payload[5].name : ""} : ${payload?.[5] ? (abbreviate(payload[5].value.toFixed(), 2)) : ""}`}</p>
            <p className="label" style={{color:LINE_COLOURS[4]}}>{`${(payload?.[4]) ? payload[4].name : ""} : ${payload?.[4] ? (abbreviate(payload[4].value.toFixed(), 2)) : ""}`}</p>
            <p className="label" style={{color:LINE_COLOURS[3]}}>{`${(payload?.[3]) ? payload[3].name : ""} : ${payload?.[3] ? (abbreviate(payload[3].value.toFixed(), 2)) : ""}`}</p>
            <p className="label" style={{color:LINE_COLOURS[2]}}>{`${(payload?.[2]) ? payload[2].name : ""} : ${payload?.[2] ? (abbreviate(payload[2].value.toFixed(), 2)) : ""}`}</p>
            <p className="label" style={{color:LINE_COLOURS[1]}}>{`${(payload?.[1]) ? payload[1].name : ""} : ${payload?.[1] ? (abbreviate(payload[1].value.toFixed(), 2)) : ""}`}</p>
            <p className="label" style={{color:LINE_COLOURS[0]}}>{`${(payload?.[0]) ? payload[0].name : ""} : ${payload?.[0] ? (abbreviate(payload[0].value.toFixed(), 2)) : ""}`}</p>
          </div>
      </CardContent>
      </Card>
    );
  }
  return null;
};

const RechartsAreaChart = (props, {direction}) => {
  console.log(`${props.title} chart loaded`)
  console.dir(props.data)
  // ** States
  const [endDate, setEndDate] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [visibleData, setVisibleData] = useState()
  const [alignment, setAlignment] = useState('All');
  const [series, setSeries] = useState()

  useEffect(() => {
    if (props.data) {
      setSeries(props.data)
      setVisibleData(props.data)
      setLoaded(true)
    }  
  }, [props.data])

  const CustomInput = forwardRef((props, ref) => {
    const startDate = format(props.start, 'MM/dd/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <BellOutline />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <ChevronDown />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  function formatXAxis(value) {
    let date = new Date(value)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    return `${month}/${date.getFullYear()}`;
  }

  function formatYAxis(value) {
    return abbreviate(value, 2, false, false)
  }

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  
  const changePeriod = async (period) => {

    let tempArray = []

    switch(period) {
        case "30D":
            tempArray = series.slice(series.length - 30, series.length);
            break;
        case "90D":
            tempArray = series.slice(series.length - 90, series.length);
            break;
        case "YTD":
            const day = getDayOfYear()
            tempArray = series.slice(series.length - day, series.length);
            break;
        case "1Y":
            tempArray = series.slice(series.length - 365, series.length);
            break;
        case "ALL":
            tempArray = series
            break;
        default:
            tempArray = series
      }

      setVisibleData(tempArray)
  }

  if (!loaded) { 
    return (
      <Card>
        <CardHeader
          title='Aggregated Open Interest BTC Futures'
          titleTypographyProps={{ variant: 'h6' }}
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            '& .MuiCardHeader-action': { mb: 0 },
            '& .MuiCardHeader-content': { mb: [2, 0] }
          }}
        />
        <CardContent>
        <Box sx={{ height: 350 }}>
            <ResponsiveContainer>
          <div>
            <p>Loading</p>
          </div>
          </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Card>
        <CardHeader
          title='Aggregated Open Interest BTC Futures'
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
  
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
              >
                <ToggleButton size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => changePeriod('ALL')} value="All"> All </ToggleButton>
                <ToggleButton size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => changePeriod('1Y')} value="1Y"> 1Y</ToggleButton>
                <ToggleButton size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => changePeriod('YTD')} value="YTD"> YTD</ToggleButton>
                <ToggleButton size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => changePeriod('90D')} value="90D"> 90D</ToggleButton>
                <ToggleButton size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => changePeriod('30D')} value="30D"> 30D</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          }
        />
        <CardContent>
          <Box sx={{ height: 500 }}>
            <ResponsiveContainer>
              <AreaChart height={350} margin={{ left: -10 }} data={visibleData} >
                <CartesianGrid />
                <XAxis dataKey='date' tickFormatter={formatXAxis}  />
                <YAxis padding={{ left: 30 }} tickFormatter={formatYAxis}/>
                <Area dataKey={Object.keys(visibleData[0])[1]} stackId="1" stroke={LINE_COLOURS[0]} fill={LINE_COLOURS[0]} />
                <Area dataKey={Object.keys(visibleData[0])[2]} stackId="1" stroke={LINE_COLOURS[1]} fill={LINE_COLOURS[1]} />
                <Area dataKey={Object.keys(visibleData[0])[3]} stackId="1" stroke={LINE_COLOURS[2]} fill={LINE_COLOURS[2]} />
                <Area dataKey={Object.keys(visibleData[0])[4]} stackId="1" stroke={LINE_COLOURS[3]} fill={LINE_COLOURS[3]} />
                <Area dataKey={Object.keys(visibleData[0])[5]} stackId="1" stroke={LINE_COLOURS[4]} fill={LINE_COLOURS[4]} />
                <Area dataKey={Object.keys(visibleData[0])[6]} stackId="1" stroke={LINE_COLOURS[5]} fill={LINE_COLOURS[5]} />
                <Area dataKey={Object.keys(visibleData[0])[7]} stackId="1" stroke={LINE_COLOURS[6]} fill={LINE_COLOURS[6]} />
                <Area dataKey={Object.keys(visibleData[0])[8]} stackId="1" stroke={LINE_COLOURS[7]} fill={LINE_COLOURS[7]} />
                <Area dataKey={Object.keys(visibleData[0])[9]} stackId="1" stroke={LINE_COLOURS[8]} fill={LINE_COLOURS[8]} />
                <Area dataKey={Object.keys(visibleData[0])[10]} stackId="1" stroke={LINE_COLOURS[9]} fill={LINE_COLOURS[9]} />
                <Area dataKey={Object.keys(visibleData[0])[11]} stackId="1" stroke={LINE_COLOURS[10]} fill={LINE_COLOURS[10]} />
                <Area dataKey={Object.keys(visibleData[0])[12]} stackId="1" stroke={LINE_COLOURS[11]} fill={LINE_COLOURS[11]} />
                <Area dataKey={Object.keys(visibleData[0])[13]} stackId="1" stroke={LINE_COLOURS[12]} fill={LINE_COLOURS[12]} />
                <Tooltip content={<CustomTooltip />} offset={200}/>
                <Legend verticalAlign="bottom" height={36}/>
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    )

  }
}

export default RechartsAreaChart
