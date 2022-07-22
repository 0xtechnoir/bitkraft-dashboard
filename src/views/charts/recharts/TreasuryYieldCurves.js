// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import _ from 'lodash';

// ** Third Party Imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Surface, Symbols } from 'recharts'
import axios from 'axios'

const TreasuryYieldCurves = ({ direction }) => {

  const [series, setSeries] = useState()
  const [visibleData, setVisibleData] = useState()
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState([""])
  const lineColours = ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6" ]

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
        setVisibleData(response.data)
        setLoading(false)
      })
  }, []);

  function formatYAxis(value) {
    if (value > 0) {
      return `${value * 100}.0bps`
    } else if (value < 0) {
      return `(${Math.abs(value) * 100}.0)bps`
    } else {
      return `0.0bps`
    }
  }

  function formatXAxis(value) {
    let date = new Date(value)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    return `${month}/${date.getFullYear()}`;
  }

  const handleClick = dataKey => {
    if (_.includes(disabled, dataKey)) {
      setDisabled(disabled.filter(obj => obj !== dataKey));
    } else {
      setDisabled([...disabled, dataKey]);
    }
  };

  const renderLegend = ({payload}) => {
    return (
      <div>
        {payload.map(entry => {
          const dataKey = entry.data.name
          const colour = entry.colour;
          const active = _.includes(disabled, dataKey);
          const style = {
            color: active ? "#AAA" : "#000",
            display: "inline"
          };

          return (
            <ul
              onClick={() => handleClick(dataKey)}
              style={style}
            >
              <Surface width={10} height={10} viewBox="0 0 10 10">
                <Symbols cx={5} cy={5} type="circle" size={50} fill={colour} />
                {active && (
                  <Symbols
                    cx={5}
                    cy={5}
                    type="circle"
                    size={25}
                    fill={"#FFF"}
                  />
                )}
              </Surface>
              <span>{dataKey}</span>
            </ul>
          )
        })}
      </div>
    );
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

  const changePeriod = async (period) => {
    
    const YEAR_MS = 31536000000
    const MONTH_MS = 2629800000
    let startTime

    switch(period) {
        case "3M":
            startTime = Date.now() - (3 * MONTH_MS);
            break;
        case "6M":
            startTime = Date.now() - (6 * MONTH_MS);
            break;
        case "1Y":
            startTime = Date.now() - (1 * YEAR_MS);
            break;
        case "2Y":
            startTime = Date.now() - (2 * YEAR_MS);
            break;
        case "3Y":
            startTime = Date.now() - (3 * YEAR_MS);
            break;
        case "5Y":
            startTime = Date.now() - (5 * YEAR_MS);;
            break;
        case "7Y":
            startTime = Date.now() - (7 * YEAR_MS);;
            break;
        case "10Y":
            startTime = Date.now() - (10 * YEAR_MS);;
            break;
        case "30Y":
            startTime = Date.now() - (30 * YEAR_MS);;
            break;
        case "ALL":
            startTime = 631238400000 // 2nd Jan 1990
            break;
        default:
            startTime = 631238400000 // 2nd Jan 1990
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
            <Typography variant='h6' sx={{ mr: 5 }}>
            </Typography>
            <div>
                <Button size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => changePeriod('ALL')}> All</Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('30Y')}> 30Y </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('10Y')}> 10Y </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('7Y')}> 7Y </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('5Y')}> 5Y </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('3Y')}> 3Y </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('2Y')}> 2Y </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('1Y')}> 1Y </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('6M')}> 6M </Button>
                <Button size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('3M')}> 3M </Button>
            </div>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ height: 400, width: 1350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ top: 15, right: 30, left: 40, bottom: 5 }} width={500} height={500} data={visibleData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="time" tickFormatter={formatXAxis} type="catagory" allowDuplicatedCategory={false} domain={['dataMin', 'dataMax']}/>
              <YAxis tickFormatter={formatYAxis}/>          
              {
              visibleData.map((element, index) => {
                return {
                  "data" : element, 
                  "colour" : lineColours[index]
                }
              }).filter(pair => !disabled.includes(pair.data.name))
              .map((pair) => (
                  <Line dataKey="val" data={pair.data.data} name={pair.data.name} key={pair.data.name} dot={false} stroke={pair.colour} strokeWidth={2} connectNulls={true}/>
                ))
              }
              <Legend content={renderLegend} verticalAlign="bottom" align="centre"
                payload={ visibleData.map((element, index) => {
                  return {
                    "data" : element, 
                    "colour" : lineColours[index]
                  }})}
               />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TreasuryYieldCurves
