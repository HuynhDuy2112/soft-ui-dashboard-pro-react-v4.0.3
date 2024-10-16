import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { Form, Modal, Button } from 'antd'
import dayjs from 'dayjs'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import Card from '@mui/material/Card'

import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'

import CalendarRoot from 'examples/Calendar/CalendarRoot'
import RenderForm from 'examples/Calendar/RenderForm'
import ConfirmDelete from 'examples/Calendar/ConfirmDelete'
import './styles.scss'

function Calendar({ header = { title: '', date: '' }, ...rest }) {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [events, setEvents] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [isEdited, setIsEdited] = useState(false)
  const dateClick = useRef(null)
  const eventClick = useRef(null)
  const checkEdit = useRef(null)

  const validClassNames = [
    { status: 'Đang đợi xử lí', name: 'Secondary', class: 'event-secondary' },
    { status: 'Đang thực hiện', name: 'Info', class: 'event-info' },
    { status: 'Hoàn thành đúng hạn', name: 'Success', class: 'event-success' },
    { status: 'Trễ hạn', name: 'Warning', class: 'event-warning' },
    { status: 'Thất bại', name: 'Error', class: 'event-error' },
  ]

  useEffect(() => {
    if (dateClick.current != null) {
      if (open) {
        form.setFieldsValue({
          content: '',
          startDate: dateClick.current,
          endDate: dateClick.current.add(1, 'day'),
          typeEvent: null,
        })
        dateClick.current = null
      }
    }
    if (eventClick.current != null) {
      if (open) {
        form.setFieldsValue({
          content: eventClick.current.title,
          startDate: dayjs(eventClick.current.start),
          endDate: dayjs(eventClick.current.end).add(-1, 'day'),
          typeEvent: eventClick.current.extendedProps.status,
        })
        setCurrentEvent(eventClick.current)
        eventClick.current = null
      }
    } else {
      setCurrentEvent(null)
    }

    setIsEdited(false)
  }, [open])

  const handleCheckEdit = () => {
    checkEdit.current = form.isFieldsTouched(['content', 'startDate', 'endDate', 'typeEvent'])
    checkEdit.current && setIsEdited(checkEdit.current)
  }

  const handleDateClick = (info) => {
    dateClick.current = dayjs(info.dateStr)
    setOpen(true)
  }

  const handleEventClick = (info) => {
    eventClick.current = info.event
    setOpen(true)
  }

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((event) => event.id != currentEvent.id)
    setEvents(updatedEvents)
    setConfirmDelete(false)
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const onFinish = (values) => {
    if (currentEvent == null) {
      validClassNames.map((type) => {
        if (type.status === values.typeEvent) {
          setEvents((props) => [
            ...props,
            {
              id: Date.now(),
              title: values.content,
              start: values.startDate.format('YYYY-MM-DD'),
              end: values.endDate.add(1, 'day').format('YYYY-MM-DD'),
              status: values.typeEvent,
              className: type.class,
            },
          ])
        }
      })
      setOpen(false)
    } /* if (isEdited)  */ else {
      const updatedEvents = events.filter((event) => event.id != currentEvent.id)
      setEvents(updatedEvents)
      validClassNames.map((type) => {
        if (type.status === values.typeEvent) {
          setEvents((props) => [
            ...props,
            {
              id: Date.now(),
              title: values.content,
              start: values.startDate.format('YYYY-MM-DD'),
              end: values.endDate.add(1, 'day').format('YYYY-MM-DD'),
              status: values.typeEvent,
              className: type.class,
            },
          ])
        }
      })
      /* events.map((event) => {
        if (event.id === currentEvent.id) {
          return {
            ...event,
            title: values.content,
            start: values.startDate.format('YYYY-MM-DD'),
            end: values.endDate.add(1, 'day').format('YYYY-MM-DD'),
            status: values.typeEvent,
          }
        }
        return event
      }) */
      setOpen(false)
      setIsEdited(false)
    }
  }

  return (
    <Card sx={{ height: '100%', boxShadow: 'none' }}>
      <SoftBox pt={2} px={2} lineHeight={1}>
        {header.title ? (
          <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {header.title}
          </SoftTypography>
        ) : null}
        {header.date ? (
          <SoftTypography component="p" variant="button" color="text" fontWeight="medium">
            {header.date}
          </SoftTypography>
        ) : null}
      </SoftBox>

      <CalendarRoot p={2}>
        <FullCalendar
          {...rest}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={events}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          height="100%"
          headerToolbar={{ right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
          editable={true}
          locale="vi"
        />
        <Modal
          forceRender
          title="Tạo sự kiện"
          open={open}
          footer={null}
          onCancel={handleCancel}
          closable
          className="modal-form-add-event-calendar"
        >
          {currentEvent != null ? (
            <Button
              type="default"
              variant="filled"
              onClick={() => setConfirmDelete(true)}
              style={{
                position: 'absolute',
                right: '47px',
                top: '20px',
                height: '36px',
                fontSize: '16px',
              }}
            >
              Xóa
            </Button>
          ) : null}

          <RenderForm
            onFinish={onFinish}
            handleCancel={handleCancel}
            form={form}
            validClassNames={validClassNames}
            currentEvent={currentEvent}
            handleCheckEdit={handleCheckEdit}
            isEdited={isEdited}
          />
        </Modal>
        <ConfirmDelete
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDeleteEvent={handleDeleteEvent}
        />
      </CalendarRoot>
    </Card>
  )
}

Calendar.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
  }),
}

export default Calendar
