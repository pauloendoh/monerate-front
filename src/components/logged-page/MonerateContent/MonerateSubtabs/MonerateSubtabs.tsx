import { Tabs } from '@mantine/core'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { urls } from '../../../../utils/urls'
import { monerateSubtabs } from './monerateSubtabs/monerateSubtabs'

type Props = {
  test?: string
}

const MonerateSubtabs = (props: Props) => {
  const location = useLocation()
  const tabValue = useMemo(() => {
    if (location.pathname.startsWith(urls.pages.monerateOthers)) {
      return urls.pages.monerateOthers
    }
    return urls.pages.index
  }, [location])

  return (
    <Tabs value={tabValue}>
      <Tabs.List>
        {monerateSubtabs.map((tab) => (
          <Link key={tab.to} to={tab.to} style={{ textDecoration: 'unset' }}>
            <Tabs.Tab value={tab.to}>{tab.label}</Tabs.Tab>
          </Link>
        ))}
      </Tabs.List>
    </Tabs>
  )
}

export default MonerateSubtabs
