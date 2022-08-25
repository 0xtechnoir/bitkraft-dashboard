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

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'
import BellOutline from 'mdi-material-ui/BellOutline'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const lineColours = ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6" , "#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6" ]

const data = [
  {
    name: '7/12',
    Sales: 20,
    Clicks: 60,
    Visits: 100
  },
  {
    name: '8/12',
    Sales: 40,
    Clicks: 80,
    Visits: 120
  },
  {
    name: '9/12',
    Sales: 30,
    Clicks: 70,
    Visits: 90
  },
  {
    name: '10/12',
    Sales: 70,
    Clicks: 110,
    Visits: 170
  },
  {
    name: '11/12',
    Sales: 40,
    Clicks: 80,
    Visits: 130
  },
  {
    name: '12/12',
    Sales: 60,
    Clicks: 80,
    Visits: 160
  },
  {
    name: '13/12',
    Sales: 50,
    Clicks: 100,
    Visits: 140
  },
  {
    name: '14/12',
    Sales: 140,
    Clicks: 90,
    Visits: 240
  },
  {
    name: '15/12',
    Sales: 120,
    Clicks: 180,
    Visits: 220
  },
  {
    name: '16/12',
    Sales: 100,
    Clicks: 160,
    Visits: 180
  },
  {
    name: '17/12',
    Sales: 140,
    Clicks: 140,
    Visits: 270
  },
  {
    name: '18/12',
    Sales: 180,
    Clicks: 200,
    Visits: 280
  },
  {
    name: '19/12',
    Sales: 220,
    Clicks: 220,
    Visits: 375
  }
]

const CustomTooltip = data => {
  const { active, payload } = data
  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography>{data.label}</Typography>
        <Divider />
        {data &&
          data.payload &&
          data.payload.map(i => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }} key={i.dataKey}>
                <Circle sx={{ color: i.fill, mr: 2.5, fontSize: '0.6rem' }} />
                <span>
                  {i.dataKey} : {i.payload[i.dataKey]}
                </span>
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}

const RechartsAreaChart = (props, {direction}) => {
  console.log(`${props.title} chart loaded`)
  console.dir(props.data)
  // ** States
  const [endDate, setEndDate] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [startDate, setStartDate] = useState(new Date())

  useEffect(() => {
    if (props.data) {
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

  function abbreviate(number, maxPlaces, forcePlaces, forceLetter) {
    number = Number(number)
    forceLetter = forceLetter || false
    if(forceLetter !== false) {
      return annotate(number, maxPlaces, forcePlaces, forceLetter)
    }
    var abbr
    if(number >= 1e12) {
      abbr = 'T'
    }
    else if(number >= 1e9) {
      abbr = 'B'
    }
    else if(number >= 1e6) {
      abbr = 'M'
    }
    else if(number >= 1e3) {
      abbr = 'K'
    }
    else {
      abbr = ''
    }
    return annotate(number, maxPlaces, forcePlaces, abbr)
  }
  
  function annotate(number, maxPlaces, forcePlaces, abbr) {
    // set places to false to not round
    var rounded = 0
    switch(abbr) {
      case 'T':
        rounded = number / 1e12
        break
      case 'B':
        rounded = number / 1e9
        break
      case 'M':
        rounded = number / 1e6
        break
      case 'K':
        rounded = number / 1e3
        break
      case '':
        rounded = number
        break
    }
    if(maxPlaces !== false) {
      var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$')
      if(test.test(('' + rounded))) {
        rounded = rounded.toFixed(maxPlaces)
      }
    }
    if(forcePlaces !== false) {
      rounded = Number(rounded).toFixed(forcePlaces)
    }
    return rounded + abbr
  }

  if (loaded) {

    return (
      <Card>
        <CardHeader
          title='Aggregated Open Future Interest of Bitcoin Futures'
          titleTypographyProps={{ variant: 'h6' }}
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            '& .MuiCardHeader-action': { mb: 0 },
            '& .MuiCardHeader-content': { mb: [2, 0] }
          }}
        />
        <CardContent>
          <Box sx={{ height: 500 }}>
            <ResponsiveContainer>
              <AreaChart height={350} margin={{ left: -20 }} data={props.data} >
                <CartesianGrid />
                <XAxis dataKey='date' tickFormatter={formatXAxis} type="catagory" allowDuplicatedCategory={false}/>
                <YAxis tickFormatter={formatYAxis}/>
                <Area dataKey={Object.keys(props.data[0])[1]} stackId="1" stroke={lineColours[0]} fill={lineColours[0]} />
                <Area dataKey={Object.keys(props.data[0])[2]} stackId="1" stroke={lineColours[1]} fill={lineColours[1]} />
                <Area dataKey={Object.keys(props.data[0])[3]} stackId="1" stroke={lineColours[2]} fill={lineColours[2]} />
                <Area dataKey={Object.keys(props.data[0])[4]} stackId="1" stroke={lineColours[3]} fill={lineColours[3]} />
                <Area dataKey={Object.keys(props.data[0])[5]} stackId="1" stroke={lineColours[4]} fill={lineColours[4]} />
                <Area dataKey={Object.keys(props.data[0])[6]} stackId="1" stroke={lineColours[5]} fill={lineColours[5]} />
                <Area dataKey={Object.keys(props.data[0])[7]} stackId="1" stroke={lineColours[6]} fill={lineColours[6]} />
                <Area dataKey={Object.keys(props.data[0])[8]} stackId="1" stroke={lineColours[7]} fill={lineColours[7]} />
                <Area dataKey={Object.keys(props.data[0])[9]} stackId="1" stroke={lineColours[8]} fill={lineColours[8]} />
                <Area dataKey={Object.keys(props.data[0])[10]} stackId="1" stroke={lineColours[9]} fill={lineColours[9]} />
                <Area dataKey={Object.keys(props.data[0])[11]} stackId="1" stroke={lineColours[10]} fill={lineColours[10]} />
                <Area dataKey={Object.keys(props.data[0])[12]} stackId="1" stroke={lineColours[11]} fill={lineColours[11]} />
                <Area dataKey={Object.keys(props.data[0])[13]} stackId="1" stroke={lineColours[12]} fill={lineColours[12]} />
                <Tooltip content={CustomTooltip}/>
                <Legend verticalAlign="bottom" height={36}/>
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    )

  } else {
    <Card>
        <CardHeader
          title='Aggregated Open Future Interest of Bitcoin Futures'
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
  }
}

export default RechartsAreaChart
