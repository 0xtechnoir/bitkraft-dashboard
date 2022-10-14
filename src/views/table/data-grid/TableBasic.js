import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DataGrid } from '@mui/x-data-grid'
import { formatTokenName, getDayOfYear } from '../../charts/chartUtils'
import { clsx } from 'clsx';

const columnsETH = [
  {
    flex: 0.125,
    field: 'token',
    minWidth: 20,
    headerName: 'token',
    headerAlign: 'center',
    align: 'left',
  },
  {
    flex: 0.125,
    minWidth: 20,
    field: 'current',
    headerName: 'Current (Ξ)',
    headerAlign: 'center',
    align: 'right'
  },
  {
    flex: 0.125,
    minWidth: 20,
    field: 'prior_week',
    headerName: 'Prior Week (Ξ)',
    headerAlign: 'center',
    align: 'right'
  },
  {
    flex: 0.125,
    minWidth: 20,
    field: 'ytd',
    headerName: 'YTD (Ξ)',
    headerAlign: 'center',
    align: 'right'
  },
  {
    flex: 0.125,
    minWidth: 20,
    field: 'prior_year',
    headerName: 'Prior Year (Ξ)',
    align: 'right'
  },
  {
    flex: 0.125,
    field: 'weekly_change',
    minWidth: 20,
    headerName: 'Weekly Change',
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
    field: 'ytd_change',
    minWidth: 20,
    headerName: 'YTD Change',
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
    field: 'yoy_change',
    minWidth: 20,
    headerName: 'YoY Change',
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
  }
]

const columnsUSD = [
  {
    flex: 0.125,
    field: 'token',
    minWidth: 20,
    headerName: 'token',
    headerAlign: 'center',
    align: 'left'
  },
  {
    flex: 0.125,
    minWidth: 20,
    field: 'current',
    headerName: 'Current ($)',
    headerAlign: 'center',
    align: 'right'
  },
  {
    flex: 0.125,
    minWidth: 20,
    field: 'prior_week',
    headerName: 'Prior Week ($)',
    headerAlign: 'center',
    align: 'right'
  },
  {
    flex: 0.125,
    minWidth: 20,
    field: 'ytd',
    headerName: 'YTD ($)',
    headerAlign: 'center',
    align: 'right'
  },
  {
    flex: 0.125,
    minWidth: 20,
    field: 'prior_year',
    headerName: 'Prior Year ($)',
    align: 'right'
  },
  {
    flex: 0.125,
    field: 'weekly_change',
    minWidth: 20,
    headerName: 'Weekly Change',
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
    field: 'ytd_change',
    minWidth: 20,
    headerName: 'YTD Change',
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
    field: 'yoy_change',
    minWidth: 20,
    headerName: 'YoY Change',
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
  }
]

const TableBasic = (props) => {

  const [openETH, setOpenETH] = useState(true);
  const [openUSD, setOpenUSD] = useState(false);

  const rawData = props.children[1]
  const currentDayOfYear = getDayOfYear()
  // map raw data into an array that can be displayed in the table
  const mappedDataETH = rawData.map((x, index) => {

    const currentValueInEth = (x.data[x.data.length-1].eth_value).toFixed(6)
    const priorWeekValueInEth = (x.data[(x.data.length-1)-7].eth_value).toFixed(6)
    const YtdValueInEth = (x.data[(x.data.length-1)-currentDayOfYear]) ? (x.data[(x.data.length-1)-currentDayOfYear].eth_value).toFixed(6) : (x.data[0].eth_value).toFixed(6)
    const priorYearValueInEth = (x.data[(x.data.length-1)-365]) ? (x.data[(x.data.length-1)-365].eth_value).toFixed(6) : 0

    return {
      "id" : index,
      "token" : formatTokenName(x.name),
      "current" : currentValueInEth, // last item in array
      "prior_week" : priorWeekValueInEth,
      "ytd" : YtdValueInEth ? YtdValueInEth : "-",
      "prior_year" : priorYearValueInEth ? priorYearValueInEth : "-",
      "weekly_change" : calcPercentageChange(currentValueInEth, priorWeekValueInEth),
      "ytd_change" : calcPercentageChange(currentValueInEth, YtdValueInEth),
      "yoy_change" : calcPercentageChange(currentValueInEth, priorYearValueInEth),
    }
  })

  const mappedDataUSD = rawData.map((x, index) => {

    const currentValueInUsd = (x.data[x.data.length-1].usd_value).toFixed(3)
    const priorWeekValueInUsd = (x.data[(x.data.length-1)-7].usd_value).toFixed(3)
    const YtdValueInUsd = (x.data[(x.data.length-1)-currentDayOfYear]) ? (x.data[(x.data.length-1)-currentDayOfYear].usd_value).toFixed(3) : (x.data[0].usd_value).toFixed(3)
    const priorYearValueInUsd = (x.data[(x.data.length-1)-365]) ? (x.data[(x.data.length-1)-365].usd_value).toFixed(3) : 0

    return {
      "id" : index,
      "token" : formatTokenName(x.name),
      "current" : currentValueInUsd, // last item in array
      "prior_week" : priorWeekValueInUsd,
      "ytd" : YtdValueInUsd ? YtdValueInUsd : "-",
      "prior_year" : priorYearValueInUsd ? priorYearValueInUsd : "-",
      "weekly_change" : calcPercentageChange(currentValueInUsd, priorWeekValueInUsd),
      "ytd_change" : calcPercentageChange(currentValueInUsd, YtdValueInUsd),
      "yoy_change" : calcPercentageChange(currentValueInUsd, priorYearValueInUsd),
      
    }
  })

  return (
    <>
      <Card>
        <CardHeader
          title="ETH"
          titleTypographyProps={{ variant: 'h6' }}
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            '& .MuiCardHeader-action': { mb: 0 },
            '& .MuiCardHeader-content': { mb: [2, 0] }
          }}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpenETH(!openETH)}
                >
                {openETH ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Box>
          }
        />
        <CardContent>
          <Collapse in={openETH} timeout="auto" unmountOnExit>
            <Box 
              sx={{ 
                height: 500,
                '& .super-app.negative': {
                  color: 'red',
                  fontWeight: '600',
                },
                '& .super-app.positive': {
                  color: 'green',
                  fontWeight: '600',
                },
              }}
            >
              <DataGrid align='center' columns={columnsETH} rows={mappedDataETH.slice(0, 7)} />
            </Box>
          </Collapse>
        </CardContent>
      </Card>
      <br/>
      <Card>
      <CardHeader
        title="USD"
        titleTypographyProps={{ variant: 'h6' }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenUSD(!openUSD)}
              >
              {openUSD ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
        }
      />
      <CardContent>
        <Collapse in={openUSD} timeout="auto" unmountOnExit>
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
            <DataGrid align='center' columns={columnsUSD} rows={mappedDataUSD.slice(0, 7)} />
          </Box>
        </Collapse>
      </CardContent>
    </Card>
   </>
  )
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
