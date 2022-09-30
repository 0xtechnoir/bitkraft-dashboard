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
import TableBasic from 'src/views/table/data-grid/TableBasic'

// Custom Imports
import { formatTokenName, MONTH_NAMES, LINE_COLOURS } from '../chartUtils'
import { TimeToggleButtonsLight } from '../../components/TimeToggleButtonsLight'

// ** Third Party Imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Surface, Symbols } from 'recharts'
import axios from 'axios'

const RechartsLineChart = ({ direction }) => {

  const [series, setSeries] = useState()
  const [visibleData, setVisibleData] = useState()
  const [loaded, setLoaded] = useState(false);
  const [disabled, setDisabled] = useState([""])
  const pairs = {}

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
        setLoaded(true)
      })
  }, []);

  function formatXAxis(value) {
    let date = new Date(value)
    return `${MONTH_NAMES[date.getMonth()]}/${date.getYear()-100}`;
  }

  const formatDate = (timestamp) => {
    let date = new Date(timestamp)
    return `${date.getDate()}/${MONTH_NAMES[date.getMonth()]}/${date.getYear()-100}`
  }

  const CustomTooltip = ({ active, payload }) => {
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

  const handleLegendClick = dataKey => {
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
            marginRight: 10,
            color: active ? "#AAA" : "#000"
          };

          return (
            <ul
              onClick={() => handleLegendClick(dataKey)}
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
              <span>{formatTokenName(dataKey)}</span>
            </ul>
          )
        })}
      </div>
    );
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

  if (!loaded) {
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
  } else {

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
                <LineChart margin={{ top: 15, right: 30, left: 30, bottom: 5 }} width={500} height={500} data={visibleData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="time" tickFormatter={formatXAxis} minTickGap={150} allowDuplicatedCategory={false} type="number" domain={['dataMin', 'dataMax']}/>
                  <YAxis label={{ value: 'ETH', angle: -90, position: 'insideLeft', offset: -20}}/>          
                  {
                  visibleData.map((element, index) => {
                    return {
                      "data" : element, 
                      "colour" : LINE_COLOURS[index]
                    }
                  }).filter(pair => !disabled.includes(pair.data.name))
                  .map((pair) => (
                      <Line dataKey="eth_value" data={pair.data.data} name={pair.data.name} key={pair.data.name} dot={false} stroke={pair.colour} strokeWidth={2}/>
                    ))
                  }
                  <Tooltip content={<CustomTooltip />} offset={200}/>
                  <Legend content={renderLegend} layout="vertical" verticalAlign="middle" align="right"
                    payload={ visibleData.map((element, index) => {
                      return {
                        "data" : element, 
                        "colour" : LINE_COLOURS[index]
                      }})}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
            <TableBasic >
              data={series}
            </TableBasic>
          </CardContent>
        </Card>
    )
  }
}

export default RechartsLineChart
