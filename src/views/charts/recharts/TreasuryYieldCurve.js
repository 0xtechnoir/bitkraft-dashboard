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

const lineColours = ["#e6194B", "#70238760", "#3cb44b60", "#873e2360", "#4363d860"]

const TreasuryYieldCurve = ({ direction }) => {

  const [series, setSeries] = useState()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/getTreasuryYieldCurve`)
      .then(response => {
        if (!response === 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          )
        }
        setSeries(response.data)
        setLoading(false)
      })
  }, []);

  function formatYAxis(value) {
      return `${value.toFixed(1)}%`
  }

  const renderLegend = ({payload}) => {
    return (
      <div>
        {payload.map(entry => {
          const dataKey = entry.data.label
          const colour = entry.colour;
          const style = {
            display: "inline"
          };

          return (
            <ul
              style={style}
            >
              <Surface width={20} height={10} viewBox="0 0 10 10">
                <Symbols cx={5} cy={5} type="circle" size={50} fill={colour} />
    
                  <Symbols
                    cx={5}
                    cy={5}
                    type="circle"
                    size={25}
                    fill={colour}
                  />
         
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
        <con
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
          <ResponsiveContainer height="100%" width="100%" >
            <LineChart margin={{ top: 15, right: 30, left: 40, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name" data={series[0].data} type="category" allowDuplicatedCategory={false} >
                <Label value="Residual Maturity" offset={0} position="bottom" />
              </XAxis>
              <YAxis type="number" axisLine={false} domain={["auto", "auto"]} tickFormatter={formatYAxis}/>       
              <Line dataKey="val" data={series[0].data} name={series[0].name} key={series[0].name} dot={false} type="monotone" stroke={lineColours[0]} strokeWidth={3} connectNulls={true}/>
              <Line dataKey="val" data={series[1].data} name={series[1].name} key={series[1].name} dot={false} type="monotone" stroke={lineColours[1]} strokeWidth={2}  connectNulls={true}/>
              <Line dataKey="val" data={series[2].data} name={series[2].name} key={series[2].name} dot={false} type="monotone" stroke={lineColours[2]} strokeWidth={2}  connectNulls={true}/>
              <Line dataKey="val" data={series[3].data} name={series[3].name} key={series[3].name} dot={false} type="monotone" stroke={lineColours[3]} strokeWidth={2}  connectNulls={true}/>
              <Line dataKey="val" data={series[4].data} name={series[4].name} key={series[4].name} dot={false} type="monotone" stroke={lineColours[4]} strokeWidth={2}  connectNulls={true}/>
              <Legend content={renderLegend} wrapperStyle={{bottom: 0}} verticalAlign="bottom" align="centre"
                payload={ series.map((element, index) => {
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

export default TreasuryYieldCurve
