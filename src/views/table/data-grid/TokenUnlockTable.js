// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import { formatTokenName, getDayOfYear } from '../../charts/chartUtils'
import { clsx } from 'clsx';
import { useEffect, useState } from 'react'
import axios from "axios";

const columns = [
  {
    flex: 0.125,
    field: 'Token',
    minWidth: 20,
    headerName: 'Token',
    headerAlign: 'center',
    align: 'left',
  },
  {
    flex: 0.125,
    minWidth: 20,
    field: 'Date',
    headerName: 'Date',
    headerAlign: 'center',
    align: 'right'
  },
  {
    flex: 0.125,
    minWidth: 20,
    field: 'Unlock_Percentage',
    headerName: 'Unlock Percentage',
    headerAlign: 'center',
    align: 'right'
  }
]

const TableBasic = (props) => {

  const [data, setData] = useState()
  const [loaded, setLoaded] = useState(false)


  useEffect(() => {
    axios.get(`/api/getTokenUnlockDates`)
    .then(response => {
      if (!response === 200) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        )
      }
      setData(response.data)
      setLoaded(true)
    })
  }, [])  

  if (loaded) {

    console.log(`Token Data: ${JSON.stringify(data)}`)
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
            />
          <CardContent>
            <Box sx={{ 
              height: 500,
              '& .super-app.negative': {
                color: 'red',
                fontWeight: '600',
              },
              '& .super-app.positive': {
                color: 'green',
                fontWeight: '600',
              },
              }}>
              <DataGrid align='center' columns={columns} rows={data} />
            </Box>
          </CardContent>
        </Card>
    )
  } if (!loaded) {
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
            />
          <CardContent>
            <Box sx={{ 
              height: 500,
              '& .super-app.negative': {
                color: 'red',
                fontWeight: '600',
              },
              '& .super-app.positive': {
                color: 'green',
                fontWeight: '600',
              },
              }}>
              <p>Loading...</p>
            </Box>
          </CardContent>
        </Card>
  }
}

function calcPercentageChange(currentValue, previousValue){

  if(!previousValue) {
    return "-"
  }

  const percentageChange = ((currentValue - previousValue) / previousValue) * 100
  return formatNumber(percentageChange)
}

function formatNumber(value){

  if (value == 0) {
    return "0.0%"
  }

  // if undefined or null just return a dash
  if (!value) {
    return "-"
  }

  if(value < 0) {
    return `(${Math.abs(value.toFixed(1))}%)`
  } else if(value >= 0) {
    return `${Math.abs(value.toFixed(1))}%`
  }
}

export default TableBasic
