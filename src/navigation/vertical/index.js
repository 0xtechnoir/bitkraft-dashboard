import { FaBitcoin, FaChartLine, FaGamepad } from 'react-icons/fa'

const navigation = () => {
  return [
    {
      sectionTitle: 'Dashboards'
    },
    {
      title: 'Macro',
      icon: FaChartLine,
      path: '/dashboards/macro'
    },
    {
      title: 'Crypto',
      icon: FaBitcoin,
      path: '/dashboards/crypto'
    },
    {
      title: 'Gaming',
      icon: FaGamepad,
      path: '/dashboards/gaming'
    }
  ]
}

export default navigation
