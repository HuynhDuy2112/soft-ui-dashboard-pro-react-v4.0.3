//React
import React from 'react'
import { useState } from 'react'

//Mui
import Grid from '@mui/material/Grid'

//Antd
import { Button, Dropdown, Badge /* Calendar */ } from 'antd'

//Soft UI
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'

//examples
import Calendar from 'examples/Calendar'
import ReportsDoughnutChart from 'examples/Charts/DoughnutCharts/ReportsDoughnutChart'

//SVG
import CalendarIcon from '../../../assets/images/erp/calendar-icon.svg'
import TimekeepingIcon from '../../../assets/images/erp/timekeeping-icon.svg'
import WarningIcon from '../../../assets/images/erp/warning-icon.svg'
import ClockIcon from '../../../assets/images/erp/clock-icon.svg'
import DeadlineIcon from '../../../assets/images/erp/deadline-icon.svg'
import JobIcon from '../../../assets/images/erp/job-icon.svg'
import TaskIcon from '../../../assets/images/erp/task-icon.svg'
import ZoomInLayout from '../../../assets/images/erp/zoom-in-layout.svg'

function Tasks() {
  const [selectReport, setSelectReport] = useState('Việc của tôi')

  const dataChart = [2, 3, 0, 1, 2, 2]

  const sumDataChart = dataChart.reduce((sum, data) => {
    return sum + data
  })

  const items = [
    {
      key: '1',
      label: <a onClick={() => setSelectReport('Việc của tôi')}>Việc của tôi</a>,
    },
    {
      key: '2',
      label: (
        <a onClick={() => setSelectReport('Việc liên quan đến tôi')}>Việc liên quan đến tôi</a>
      ),
    },
  ]

  return (
    <>
      <SoftBox>
        <Grid container spacing={2} mt={0}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SoftBox className="layout ">
                  <SoftBox className="layout_title">
                    <SoftTypography variant="h5">Công việc hôm nay</SoftTypography>
                    <img style={{ cursor: 'pointer' }} src={ZoomInLayout} />
                  </SoftBox>
                  <SoftBox pt={2}>
                    <Grid className="job_today" container spacing={2}>
                      <Grid className="job_today_item " item xs={4}>
                        <img className="job_today_item_bgc" src={TimekeepingIcon} />
                        <div>
                          <SoftTypography variant="h6">Chưa chấm công</SoftTypography>
                          <SoftTypography
                            sx={{ fontSize: '14px', color: '#718096' }}
                            fontWeight="light"
                          >
                            Hôm nay
                          </SoftTypography>
                        </div>
                      </Grid>
                      <Grid className="job_today_item" item xs={4}>
                        <img src={WarningIcon} />
                        <div>
                          <SoftTypography variant="h6">0 công việc</SoftTypography>
                          <SoftTypography
                            sx={{ fontSize: '14px', color: '#718096' }}
                            fontWeight="light"
                          >
                            Quá hạn
                          </SoftTypography>
                        </div>
                      </Grid>
                      <Grid className="job_today_item" item xs={4}>
                        <img src={ClockIcon} />
                        <div>
                          <SoftTypography variant="h6">3 công việc</SoftTypography>
                          <SoftTypography
                            sx={{ fontSize: '14px', color: '#718096' }}
                            fontWeight="light"
                          >
                            Đến hạn
                          </SoftTypography>
                        </div>
                      </Grid>
                      <Grid className="job_today_item" item xs={4}>
                        <img src={DeadlineIcon} />
                        <div>
                          <SoftTypography variant="h6">1 công việc</SoftTypography>
                          <SoftTypography
                            sx={{ fontSize: '14px', color: '#718096' }}
                            fontWeight="light"
                          >
                            Sắp đến hạn
                          </SoftTypography>
                        </div>
                      </Grid>
                      <Grid className="job_today_item" item xs={4}>
                        <img src={JobIcon} />
                        <div>
                          <SoftTypography variant="h6">1 công việc</SoftTypography>
                          <SoftTypography
                            sx={{ fontSize: '14px', color: '#718096' }}
                            fontWeight="light"
                          >
                            Chờ tôi duyệt
                          </SoftTypography>
                        </div>
                      </Grid>
                      <Grid className="job_today_item" item xs={4}>
                        <img src={TaskIcon} />
                        <div>
                          <SoftTypography variant="h6">1 công việc</SoftTypography>
                          <SoftTypography
                            sx={{ fontSize: '14px', color: '#718096' }}
                            fontWeight="light"
                          >
                            Cần giao
                          </SoftTypography>
                        </div>
                      </Grid>
                    </Grid>
                  </SoftBox>
                </SoftBox>
              </Grid>
              <Grid item xs={12}>
                <SoftBox sx={{ padding: '20px 20px 0 20px' }} className="layout">
                  <SoftBox className="layout_title">
                    <SoftTypography variant="h5">Báo cáo công việc</SoftTypography>
                    <SoftBox
                      sx={{
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'baseline',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}
                    >
                      <Dropdown
                        menu={{
                          items,
                        }}
                        arrow={true}
                        placement="bottomRight"
                      >
                        <Button>{selectReport}</Button>
                      </Dropdown>
                      <SoftTypography sx={{ fontSize: '14px', color: '#A0AEC0' }}>
                        Tuần này
                      </SoftTypography>
                      <img style={{ cursor: 'pointer' }} src={ZoomInLayout} />
                    </SoftBox>
                  </SoftBox>
                  <SoftBox pt={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <div className="test">
                          <ReportsDoughnutChart
                            isTitle={false}
                            count={{ number: sumDataChart, text: 'Tổng' }}
                            chart={{
                              labels: [
                                'Hoàn thành trước hạn',
                                'Hoàn thành đúng hạn',
                                'Hoàn thành trễ hạn',
                                'Chờ duyệt',
                                'Chưa hoàn thành',
                                'Quá hạn',
                              ],
                              datasets: {
                                label: 'Consumption',
                                backgroundColors: [
                                  '#04B9A7',
                                  '#2275FF',
                                  '#F9757E',
                                  '#C327E2',
                                  '#A0AEC0',
                                  '#F1252B',
                                ],
                                data: dataChart,
                              },
                            }}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </SoftBox>
                </SoftBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SoftBox className="layout">
                  <SoftBox sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <SoftBox sx={{ display: 'flex' }}>
                      <img src={CalendarIcon} />
                      <SoftTypography pl={1} variant="h5">
                        Lịch làm việc
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox>
                      <SoftTypography sx={{ color: '#2275FF' }} variant="h6">
                        Tất cả
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                  <Calendar bgColor="#fff" />
                </SoftBox>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SoftBox>
    </>
  )
}

export default Tasks
