// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import { formatTokenName, getDayOfYear } from 'src/views/charts/recharts/chartUtils'

const columns = [
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
    headerName: 'Weekly Change (%)',
    headerAlign: 'center',
    align: 'right'
  },
  {
   flex: 0.125,
    field: 'ytd_change',
    minWidth: 20,
    headerName: 'YTD Change (%)',
    headerAlign: 'center',
    align: 'right'
  },
  {
    flex: 0.125,
    field: 'yoy_change',
    minWidth: 20,
    headerName: 'YoY Change (%)',
    headerAlign: 'center',
    align: 'right'
  }
]

const TableBasic = (props) => {
  const rawData = props.children[1]
  const currentDayOfYear = getDayOfYear()
  // map raw data into an array that can be displayed in the table
  const mappedData = rawData.map((x, index) => {

    const currentValueInEth = (x.data[x.data.length-1].eth_value).toFixed(6)
    const priorWeekValueInEth = (x.data[(x.data.length-1)-7].eth_value).toFixed(6)
    const YtdValueInEth = (x.data[(x.data.length-1)-currentDayOfYear]) ? (x.data[(x.data.length-1)-currentDayOfYear].eth_value).toFixed(6) : 0
    const priorYearValueInEth = (x.data[(x.data.length-1)-365]) ? (x.data[(x.data.length-1)-365].eth_value).toFixed(6) : 0

    return {
      "id" : index,
      "token" : formatTokenName(x.name),
      "current" : currentValueInEth, // last item in array
      "prior_week" : priorWeekValueInEth,
      "ytd" : YtdValueInEth ? YtdValueInEth : "-",
      "prior_year" : priorYearValueInEth ? priorYearValueInEth : "-",
      "weekly_change" : (((currentValueInEth - priorWeekValueInEth) / priorWeekValueInEth) * 100).toFixed(1),
      "ytd_change" : YtdValueInEth ? (((currentValueInEth - YtdValueInEth) / YtdValueInEth) * 100).toFixed(1) : "-",
      "yoy_change" : priorYearValueInEth ? (((currentValueInEth - priorYearValueInEth) / priorYearValueInEth) * 100).toFixed(1) : "-",
    }
  })

  return (
    <Card>
      <Box sx={{ height: 500 }}>
        <DataGrid align='center' columns={columns} rows={mappedData.slice(0, 7)} />
      </Box>
    </Card>
  )
}

export default TableBasic
