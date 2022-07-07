// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Third Party Imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import axios from 'axios'

const RechartsLineChart = ({ direction }) => {

  const [series, setSeries] = useState()
  const [visibleData, setVisibleData] = useState()
  const [loading, setLoading] = useState(true);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  useEffect(() => {
    axios.get(`/api/getIndexedAssetData`)
      .then(response => {
        if (!response === 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          )
        }
        setSeries(response.data)
        setVisibleData(response.data)
        setLoading(false)
      })
  }, []);

  function formatYAxis(value) {
    return abbreviate(value, 2, false, false)
  }

  function formatXAxis(value) {
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
              <p className="label" style={{color:'#8884d8'}}>{`${(payload?.[0]) ? payload[0].name : ""} : Ξ ${payload?.[0] ? (payload[0].value.toFixed(6)) : ""}`}</p>
              <p className="label" style={{color:'#8884d8'}}>{`${(payload?.[1]) ? payload[1].name : ""} : Ξ ${payload?.[1] ? (payload[1].value.toFixed(6)) : ""}`}</p>
              <p className="label" style={{color:'#8884d8'}}>{`${(payload?.[2]) ? payload[2].name : ""} : Ξ ${payload?.[2] ? (payload[2].value.toFixed(6)) : ""}`}</p>
              <p className="label" style={{color:'#8884d8'}}>{`${(payload?.[3]) ? payload[3].name : ""} : Ξ ${payload?.[3] ? (payload[3].value.toFixed(6)) : ""}`}</p>
              <p className="label" style={{color:'#8884d8'}}>{`${(payload?.[4]) ? payload[4].name : ""} : Ξ ${payload?.[4] ? (payload[4].value.toFixed(6)) : ""}`}</p>
              <p className="label" style={{color:'#8884d8'}}>{`${(payload?.[5]) ? payload[5].name : ""} : Ξ ${payload?.[5] ? (payload[5].value.toFixed(6)) : ""}`}</p>
              <p className="label" style={{color:'#8884d8'}}>{`${(payload?.[6]) ? payload[6].name : ""} : Ξ ${payload?.[6] ? (payload[6].value.toFixed(6)) : ""}`}</p>
              <p className="label" style={{color:'#8884d8'}}>{`${(payload?.[7]) ? payload[7].name : ""} : Ξ ${payload?.[7] ? (payload[7].value.toFixed(6)) : ""}`}</p>
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
          title='BIT1 Token Assets (Eth Denominated)'
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

  const changePeriod = async (period) => {
    
    const DAY_MS = 86400000
    const YEAR_MS = 31536000000
    let startTime

    switch(period) {
        case "30D":
            startTime = Date.now() - (30 * DAY_MS);
            break;
        case "90D":
            startTime = Date.now() - (90 * DAY_MS);
            break;
        case "180D":
            startTime = Date.now() - (180 * DAY_MS);
            break;
        case "YTD":
            const currentYear = new Date().getFullYear() // 2022
            const date = new Date(`${currentYear}-01-01`) // first day of current year
            startTime = date.getTime(); // timestamp in ms
            break;
        case "1Y":
            startTime = Date.now() - YEAR_MS;
            break;
        case "ALL":
            startTime = 1609539760000 // 1st Jan 2021
            break;
        default:
            startTime = 1609539760000 // 1st Jan 2021
      }
    
    let tempArray = []
    series.forEach((element, index, arr) => {
      const dataArray = element.data
      const filteredArray = dataArray.filter(index => index.time > startTime)

      tempArray[index] = {
        "name" : element.name,
        "data" : filteredArray
      }
    })
    setVisibleData(tempArray)
  }
  
  return (
    <Card>
      <CardHeader
        title='BIT1 Token Assets (Eth Denominated)'
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
            <div>
                <Button size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => changePeriod('ALL')}> All</Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('1Y')}> 1Y </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('YTD')}> YTD </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('180D')}> 180D </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('90D')}> 90D </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('30D')}> 30D </Button>
            </div>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ height: 400, width: 1250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ top: 15, right: 30, left: 30, bottom: 5 }} width={500} height={500} >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="time" tickFormatter={formatXAxis} minTickGap={150} allowDuplicatedCategory={false} type="number" domain={['dataMin', 'dataMax']}/>
              <YAxis label={{ value: 'ETH', angle: -90, position: 'insideLeft', offset: -20}}/>
              <Line dataKey="eth_value" data={visibleData[0].data} name={visibleData[0].name} key={visibleData[0].name} dot={false} stroke="#e6194B" strokeWidth={2}/>
              <Line dataKey="eth_value" data={visibleData[1].data} name={visibleData[1].name} key={visibleData[1].name} dot={false} stroke="#3cb44b" strokeWidth={2}/>     
              <Line dataKey="eth_value" data={visibleData[2].data} name={visibleData[2].name} key={visibleData[2].name} dot={false} stroke="#ffe119" strokeWidth={2}/>     
              <Line dataKey="eth_value" data={visibleData[3].data} name={visibleData[3].name} key={visibleData[3].name} dot={false} stroke="#4363d8" strokeWidth={2}/>
              <Line dataKey="eth_value" data={visibleData[4].data} name={visibleData[4].name} key={visibleData[4].name} dot={false} stroke="#f58231" strokeWidth={2}/> 
              <Line dataKey="eth_value" data={visibleData[5].data} name={visibleData[5].name} key={visibleData[5].name} dot={false} stroke="#911eb4" strokeWidth={2}/>
              <Line dataKey="eth_value" data={visibleData[6].data} name={visibleData[6].name} key={visibleData[6].name} dot={false} stroke="#42d4f4" strokeWidth={2}/>
              <Line dataKey="eth_value" data={visibleData[7].data} name={visibleData[7].name} key={visibleData[7].name} dot={false} stroke="#f032e6" strokeWidth={2}/>
              <Tooltip content={<CustomTooltip />} offset={200}/>
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsLineChart
