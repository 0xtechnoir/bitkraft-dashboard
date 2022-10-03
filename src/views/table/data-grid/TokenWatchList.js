// ** React Imports
import { useEffect, useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import { formatTokenName, getDayOfYear } from '../../charts/chartUtils'
import { clsx } from 'clsx';

import axios from 'axios'

const columns = [
  {
    flex: 0.1,
    field: 'Token',
    minWidth: 10,
    headerName: 'Token',
    headerAlign: 'center',
    align: 'left'
  },
  {
    flex: 0.1,
    minWidth: 20,
    field: 'Price ($)',
    headerName: 'Price ($)',
    headerAlign: 'center',
    align: 'right'
  },
  {
    flex: 0.09,
    minWidth: 20,
    field: 'Price change 24hr (%)',
    headerName: '24h(%)',
    headerAlign: 'center',
    align: 'right',
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value.includes('('),
        positive: !params.value.includes('('),
      });
    },
  },
  {
    flex: 0.08,
    minWidth: 20,
    field: 'Price change 7d (%)',
    headerName: '7d(%)',
    align: 'right',
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value.includes('('),
        positive: !params.value.includes('('),
      });
    },
  },
  {
    flex: 0.09,
    field: 'Price change 30d (%)',
    minWidth: 20,
    headerName: '30d(%)',
    headerAlign: 'center',
    align: 'right',
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value.includes('('),
        positive: !params.value.includes('('),
      });
    },
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value.includes('('),
        positive: !params.value.includes('('),
      });
    },
  },
  {
    flex: 0.09,
    field: 'Price change 60d (%)',
    minWidth: 20,
    headerName: '60d(%)',
    headerAlign: 'center',
    align: 'right',
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value.includes('('),
        positive: !params.value.includes('('),
      });
    },
  },
  {
    flex: 0.09,
    field: 'Price change 1y (%)',
    minWidth: 20,
    headerName: '1y(%)',
    headerAlign: 'center',
    align: 'right',
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value.includes('('),
        positive: !params.value.includes('('),
      });
    },
  },
  {
    flex: 0.125,
    field: '24 hr Volume',
    minWidth: 20,
    headerName: '24hr Vol($)',
    headerAlign: 'center',
    align: 'right',
  },
  {
    flex: 0.1,
    field: 'ATH ($)',
    minWidth: 20,
    headerName: 'ATH ($)',
    headerAlign: 'center',
    align: 'right',
  },
  {
    flex: 0.09,
    field: 'ATH (%)',
    minWidth: 20,
    headerName: 'ATH (%)',
    headerAlign: 'center',
    align: 'right',
  },
  {
    flex: 0.1,
    field: 'Market Cap ($)',
    minWidth: 20,
    headerName: 'MC ($)',
    headerAlign: 'center',
    align: 'right',
  },
  {
    flex: 0.1,
    field: 'FDV ($)',
    minWidth: 20,
    headerName: 'FDV ($)',
    headerAlign: 'center',
    align: 'right',
  },
  {
    flex: 0.125,
    field: 'Circulating Supply',
    minWidth: 20,
    headerName: 'Circ. Supply',
    headerAlign: 'center',
    align: 'right',
  },
  {
    flex: 0.125,
    field: 'Total Supply',
    minWidth: 20,
    headerName: 'Total Supply',
    headerAlign: 'center',
    align: 'right',
  },
  {
    flex: 0.08,
    field: '% circulating',
    minWidth: 20,
    headerName: 'Circ %',
    headerAlign: 'center',
    align: 'right',
  }
]

const TableBasic = (props) => {

  console.log("Token watch list loading")

  const [data, setData] = useState()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/api/getTokenWatchlistData`)
      .then(response => {
        if (!response === 200) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          )
        }
        setData(response.data)
        setLoaded(true)
      })
  }, []);

  if(!loaded) {
    return (
      <Card>
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
      </Card>
    )
  } else {
    return (
      <Card>
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
          <DataGrid align='center' columns={columns} rows={data.slice(0, 15)} />
        </Box>
      </Card>
    )
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
