// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

/**
 *  Set Home URL
 */
 export const getHomeRoute = () => {
  return '/dashboards/analytics'
}

const Home = () => {
  // ** Hooks
  const router = useRouter()
  useEffect(() => {
      const homeRoute = getHomeRoute()

      // Redirect user to Home URL
      router.replace(homeRoute)
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

export default Home
