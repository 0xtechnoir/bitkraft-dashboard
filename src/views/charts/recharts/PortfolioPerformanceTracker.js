// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import axios from 'axios'

const RechartsLineChart = ({ direction }) => {

  const [series, setSeries] = useState()
  const [loading, setLoading] = useState(true);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  useEffect(() => {
    axios.get(`/api/retrieveLiqPortfolioData`)
      .then(response => {
        if (!response === 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          )
        }
        // console.log(`Performance Response data: ${JSON.stringify(response.data)}`)
        setSeries(response.data)
        setLoading(false)
      })
  }, []);

  function formatYAxis(value) {
    return abbreviate(value, 2, false, false)
  }

  function formatXAxis(value) {
    // console.log(`X Axis value: ${value}`)
    let date = new Date(value)
    return `${monthNames[date.getMonth()]}/${date.getYear()-100}`;
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

  const formatDate = (timestamp) => {
    let date = new Date(timestamp)
    return `${date.getDate()}/${monthNames[date.getMonth()]}/${date.getYear()-100}`
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card>
          <CardContent>
            <div className="custom-tooltip">
              <p className="label">{formatDate(payload[0].payload.time)}</p>
              <p className="label" style={{color:'#8884d8'}}>{`${payload[0].name} : $${payload[0].value.toLocaleString('en-US')}`}</p>
              <p className="label" style={{color:'#82ca9d'}}>{`${payload[1].name} : $${payload[1].value.toLocaleString('en-US')}`}</p>
              <p className="label" style={{color:'#d884cb'}}>{`${payload[2].name} : $${payload[2].value.toLocaleString('en-US')}`}</p>

            </div>
        </CardContent>
        </Card>
      );
    }
    return null;
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader
          title='Liquid Portfolio Performance'
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
            </Box>
          }
        />
        <CardContent>
          <Box sx={{ height: 400, width: 600 }}>
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
        title='Liquid Portfolio Performance'
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
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ height: 400, width: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={500} >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="time" tickFormatter={formatXAxis} minTickGap={150} allowDuplicatedCategory={false}/>
              <YAxis tickFormatter={formatYAxis}/>
              <Line dataKey="value" data={series[0].data} name={series[0].name} key={series[0].name} dot={false} stroke="#8884d8" />
              <Line dataKey="value" data={series[1].data} name={series[1].name} key={series[1].name} dot={false} stroke="#82ca9d" />
              <Line dataKey="value" data={series[2].data} name={series[2].name} key={series[2].name} dot={false} stroke="#d884cb" strokeWidth={3} />

              <Tooltip content={<CustomTooltip />} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsLineChart
