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

  const [data, setData] = useState(null)
  const [fearAndGreedValues, setFearAndGreedValues] = useState(null)

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

  const processData = (data) => {
    if (data) {
      let arr = data["data"]
      let values = arr.slice(0).reverse().map(index => {
        let date = new Date(index.timestamp * 1000);
        return { 
          "sentiment" : index.value, 
          "name": `${date.getDate()}/${monthNames[date.getMonth()]}/${date.getYear()-100}` 
        }
      });
      setFearAndGreedValues(values)
    }
  }

  useEffect(() => {
    axios.get(`https://api.alternative.me/fng/?limit=500`)
      .then(response => {
        if (!response === 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.data;
      })
      .then((actualData) => {
        setData(actualData);
      }) 
    }, []);

    useEffect(() => {
      processData(data)
    }, [data])

  const renderData = () => {
    if (data) {
      return `${data["data"][0].value}, ${data["data"][0].value_classification}`
    } else return ''
  }
  
  
  return (
    <Card>
      <CardHeader
        title='Fear and Greed Index'
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
              Today: {renderData()}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ height: 400, width: 600 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              width={500}
              height={300} 
              data={fearAndGreedValues} 
              margin={{
                top: 5,
                right: 30,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name" hide={true} interval="preserveStartEnd"/>
              <YAxis dataKey="sentiment"/>
              <Line type="monotone" dataKey="sentiment" stroke="#8884d8" dot={false} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsLineChart
