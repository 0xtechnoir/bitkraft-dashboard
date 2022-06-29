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


// track the performance of Bitkrafts liquid portfolio against a Ethereum, Bitcoin and a custom index
// STEP 1 - Pull in the historical price data of Ethereum denominated in USD - display it in the chart
// STEP 2 - Create a dummuy liquid porfolio with 3 assets. The historical prices (in USD) for each asset will need 
//          to be stored in a database and the total portfolio compared . 

const RechartsLineChart = ({ direction }) => {

  const [btcPriceValues, setBtcPriceValues] = useState(null)

  function getBtcData() {
    axios.get(`/api/retrieveBtcPrice`)
      .then(response => {
        if (!response === 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          )
        }
        return response.data
      })
      .then((actualData) => {
        setBtcPriceValues(actualData)
      })
  }

  useEffect(() => {
    getBtcData()
  }, []);
  
  return (
    <Card>
      <CardHeader
        title='BTC Price'
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
            <LineChart 
              width={500}
              height={500} 
              data={btcPriceValues} 
              margin={{
                top: 5,
                right: 30,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="time" hide={true} interval="preserveStartEnd"/>
              <YAxis dataKey="price" interval="preserveStartEnd" type="number" domain={[0, 100000]}/>
              <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false}/>
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsLineChart

