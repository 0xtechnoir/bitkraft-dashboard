// ** React Imports
import { useEffect, useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid'
import { clsx } from 'clsx';

import axios from 'axios'

const tokenListColumns = [
  {
    flex: 0.09,
    field: 'token',
    minWidth: 10,
    headerName: 'Token',
    headerAlign: 'center',
    align: 'left'
  },
  {
    flex: 0.12,
    minWidth: 20,
    field: 'price',
    headerName: 'Price',
    headerAlign: 'center',
    align: 'right',
    type: 'number',
    valueFormatter: (params) => {
      if (params.value == null) {
        return '';
      }
      let result
      const val = parseFloat(params.value)

      if (val > 1) {
        result = val.toFixed(2)
      } else if (val <= 1 && val > 0.01) {
        result = val.toFixed(3)
      } else if (val <= 0.01 && val > 0.001) {
        result = val.toFixed(4)
      } else if (val <= 0.001 && val > 0.0001) {
        result = val.toFixed(5)
      } else if (val <= 0.0001 && val > 0.00001) {
        result = val.toFixed(6)
      } else if (val <= 0.00001 && val > 0.000001) {
        result = val.toFixed(7)
      } else if (val <= 0.000001 && val > 0.0000001) {
        result = val.toFixed(8)
      } else {
        result = val.toFixed(9)
      }

      return `$${result}`;
    },
  },
  {
    flex: 0.1,
    minWidth: 20,
    field: 'price_change_pc_24hr',
    headerName: '24h',
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
    flex: 0.1,
    minWidth: 20,
    field: 'price_change_pc_7d',
    headerName: '7d',
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
    flex: 0.1,
    field: 'price_change_pc_30d',
    minWidth: 20,
    headerName: '30d',
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
    flex: 0.1,
    field: 'price_change_pc_6m',
    minWidth: 20,
    headerName: '6m',
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
    flex: 0.11,
    field: 'volume_24h',
    minWidth: 20,
    headerName: '24h Vol',
    headerAlign: 'center',
    align: 'right',
    valueFormatter: (params) => {
      if (params.value == null) {
        return '';
      }

      return `$${params.value}`;
    },
  },
  {
    flex: 0.11,
    field: 'market_cap',
    minWidth: 20,
    headerName: 'MC',
    headerAlign: 'center',
    align: 'right',
    valueFormatter: (params) => {
      if (params.value == null) {
        return '';
      }

      return `$${params.value}`;
    },
  },
  {
    flex: 0.125,
    field: 'circulating_supply',
    minWidth: 20,
    headerName: 'Circ. Supply',
    headerAlign: 'center',
    align: 'right',
  },
  {
    flex: 0.11,
    field: 'total_supply',
    minWidth: 20,
    headerName: 'Ttl Supply',
    headerAlign: 'center',
    align: 'right',
  },
  {
    flex: 0.11,
    field: 'fdv',
    minWidth: 20,
    headerName: 'FDV',
    headerAlign: 'center',
    align: 'right',
    valueFormatter: (params) => {
      if (params.value == null || params.value == '-') {
        return '-';
      }

      return `$${params.value}`;
    },
    
  },
  {
    flex: 0.11,
    field: 'max_supply',
    minWidth: 20,
    headerName: 'Max Supply',
    headerAlign: 'center',
    align: 'right',
  },
  {
    flex: 0.08,
    field: 'pc_circulating',
    minWidth: 20,
    headerName: 'Circ',
    headerAlign: 'center',
    align: 'right',
    valueFormatter: (params) => {
      if (params.value == null) {
        return '';
      }

      return `${params.value}%`;
    },
  }
]

const TokenWatchListTable = (props) => {

  const [data, setData] = useState()
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    axios.post(`/api/${props.endpoint}`)
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
            <div>
              <p>Loading</p>
            </div>
          </Box>
        </CardContent>
      </Card>
    )
  } else {
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
            height: props.height,
            '& .super-app.negative': {
              color: 'red',
              fontWeight: '600',
            },
            '& .super-app.positive': {
              color: 'green',
              fontWeight: '600',
            },
            }}>
            <DataGrid align='center' columns={tokenListColumns} rows={data} />
          </Box>
        </CardContent>
      </Card>
    )
  }
}

export default TokenWatchListTable
