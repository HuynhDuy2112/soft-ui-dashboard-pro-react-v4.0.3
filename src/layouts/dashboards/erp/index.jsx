//React
import React from 'react'
import { useEffect, useState } from 'react'

//Mui
import Grid from '@mui/material/Grid'
import Icon from '@mui/material/Icon'

//Antd
import { Tabs } from 'antd'

//Soft UI
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'

//examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import { navbarDesktopMenu } from 'examples/Navbars/DashboardNavbar/styles'

//context
import { useSoftUIController, setMiniSidenav, setTransparentNavbar } from 'context'

//component
import Tasks from './Tasks.jsx'
import Business from './Business.jsx'

//styles
import './styles.scss'

function ERP() {
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav)
  const [navbarType, setNavbarType] = useState()
  const [controller, dispatch] = useSoftUIController()
  const { miniSidenav, fixedNavbar } = controller

  const onChange = (key) => {
    console.log(key)
  }

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky')
    } else {
      setNavbarType('static')
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar)
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener('scroll', handleTransparentNavbar)

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar()

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar)
  }, [dispatch, fixedNavbar])

  const itemTabs = [
    {
      key: '1',
      label: 'Việc cần làm',
      children: <Tasks />,
    },
    {
      key: '2',
      label: 'Kinh doanh',
      children: <Business />,
    },
  ]

  return (
    <>
      <DashboardLayout>
        <SoftBox py={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SoftBox className="layout-header" sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
                  {miniSidenav ? 'menu_open' : 'menu'}
                </Icon>
                <SoftTypography pl={2} variant="h5" fontWeight="bold">
                  Xin chào, Hệ Thống!
                </SoftTypography>
              </SoftBox>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <SoftBox className="custom-tabs-layout">
                <Tabs defaultActiveKey="1" items={itemTabs} onChange={onChange} />
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
      </DashboardLayout>
    </>
  )
}

export default ERP
