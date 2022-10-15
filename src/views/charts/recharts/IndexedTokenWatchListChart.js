import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import _ from 'lodash';
import { MONTH_NAMES, LINE_COLOURS } from '../chartUtils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Surface, Symbols, ReferenceLine, Label, LabelList } from 'recharts'
import axios from 'axios'

const RechartsLineChart = (props) => {

  const [series, setSeries] = useState()
  const [visibleData, setVisibleData] = useState()
  const [loaded, setLoaded] = useState(false);
  const [disabled, setDisabled] = useState([""])
  const [alignment, setAlignment] = useState('1Y');

  useEffect(() => {
    axios.get(`/api/${props.endpoint}`)
      .then(response => {
        if (!response === 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          )
        }
        setSeries(response.data)
        setVisibleData(response.data)
      })
      .then(() => {
        setLoaded(true)
      })
  }, []);

  function formatXAxis(value) {
    return formatDate(value)
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
            <p className="label">{formatDate(payload[0].payload.timestamp)}</p>
            {
              payload.map((element, i) => (
                <p className="label" style={{color:payload[i].stroke}}>{
                  `${(payload?.[i]) ? payload[i].name : ""} : ${payload?.[i] ? (payload[i].value.toFixed(0)-100) : ""}%`}
                </p>
              ))
            }
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
      <div >
        {payload.map(entry => {
          const dataKey = entry.data.token
          const value = (entry.data.data[entry.data.data.length-1]["indexed_usd_value"]-100).toFixed(0)
          const colour = entry.colour;
          const active = _.includes(disabled, dataKey);
          const style = {
            marginRight: -80,
            marginLeft: 30,
            color: active ? "#AAA" : "#000"
          };

          return (
            <ul
              onClick={() => handleLegendClick(dataKey)}
              style={style}
            >
              <Surface width={20} height={10} viewBox="0 0 10 10" margin={{ top: 0, left: 500, right: 20, bottom: 0 }}>
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
              <span>{`${value}% : ${dataKey}`}</span>
            </ul>
          )
        })}
      </div>
    );
  }

  function mutateSeries (series, startTime) {
    let tempArray = []
    series.forEach((element, index, arr) => {
      const dataArray = element.data
      const filteredArray = dataArray.filter(i => i.timestamp >= startTime)
  
      tempArray[index] = {
        "token": element.token,
        "data": filteredArray
      }
    })
  
    const resultArray = tempArray.map((element) => {
  
      const firstValueInUSD = element.data[0]["usd_value"]
      const firstValueInETH = element.data[0]["eth_value"]
  
      const newData = element.data.map((i) => {
  
        const currentValueInUSD = i["usd_value"]
        const currentValueInETH = i["eth_value"]
        const indexedValueUSD = 100 * (currentValueInUSD / firstValueInUSD)
        const indexedValueETH = 100 * (currentValueInETH / firstValueInETH)
  
        return {
          "timestamp": i["timestamp"],
          "date": i["date"],
          "usd_value": i["usd_value"],
          "eth_value": i["eth_value"],
          "indexed_usd_value": indexedValueUSD,
          "indexed_eth_value": indexedValueETH
        }
      })
      return {
        "token": element.token,
        "data": newData
      }
    })
    return resultArray
  }
  
  async function changePeriod (period) {
    
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
    
    const resultArray = mutateSeries(series, startTime)
    setVisibleData(resultArray)
  }

  function formatYAxis(value) {
    return `${new Intl.NumberFormat().format(value-100)}%`
  }

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  if (!loaded) {
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
      
      <> 
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

                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleAlignment}
                >
                  <ToggleButton size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => changePeriod('ALL')} value="ALL"> All</ToggleButton>
                  <ToggleButton size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('1Y')} value="1Y"> 1Y </ToggleButton>
                  <ToggleButton size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('YTD')} value="YTD"> YTD </ToggleButton>
                  <ToggleButton size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('180D')} value="180D"> 180D </ToggleButton>
                  <ToggleButton size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('90D')} value="90D"> 90D </ToggleButton>
                  <ToggleButton size='small' sx={{ mr: 3.5 }} variant='contained' onClick={() => changePeriod('30D')} value="30D"> 30D </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            }
          />
          <CardContent>
            <Box sx={{ height: 400, width: 1250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart margin={{ top: 15, right: 30, left: 30, bottom: 5 }} width={500} height={500} data={visibleData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="timestamp" tickFormatter={formatXAxis} allowDuplicatedCategory={false} type="catagory" domain={['dataMin', 'dataMax']}/>
                  <YAxis orientation="right" tickFormatter={formatYAxis} />
                  <ReferenceLine y={100} stroke="black" strokeDasharray="3 3" strokeWidth="2" />          
                  {
                    visibleData.map((element, index) => {
                      return {
                        "data" : element, 
                        "colour" : LINE_COLOURS[index]
                      }
                    })
                 
                    .filter(pair => !disabled.includes(pair.data.token))
                    .map((pair) => (
                      <>
                        <Line dataKey="indexed_usd_value" 
                          data={pair.data.data} 
                          name={pair.data.token} 
                          key={pair.data.token} 
                          dot={false} 
                          stroke={pair.colour} 
                          strokeWidth={2}
                        />

                         {/* <ReferenceLine y={pair.data.data[pair.data.data.length-1]["indexed_usd_value"]} stroke={pair.colour} strokeDasharray= "3 3" strokeWidth={0} >
                           <Label style={{marginBottom: 20, marginTop: 10}} value={pair.data.data[pair.data.data.length-1]["indexed_usd_value"].toFixed(0)-100} position="right" stroke={pair.colour} />                        
                         </ReferenceLine> */}
                      </>
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
          </CardContent>
        </Card>
        </>
    )
  }
}

export default RechartsLineChart


