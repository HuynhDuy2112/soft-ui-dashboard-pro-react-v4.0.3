import { Style } from '@mui/icons-material'
import { DatePicker, Input, Form, Select, Button } from 'antd'

const { TextArea } = Input

function RenderForm({
  onFinish,
  handleCancel,
  form,
  validClassNames,
  currentEvent,
  handleCheckEdit,
  isEdited,
}) {
  const options = validClassNames.map((event) => ({
    value: event.status,
    label: event.status,
  }))

  const validateEndDate = (_, value) => {
    const startDate = form.getFieldValue('startDate')
    if (startDate && value && value.isBefore(startDate, 'day')) {
      return Promise.reject('Ngày kết thúc không thể trước ngày bắt đầu!')
    }
    return Promise.resolve()
  }

  const handleStartDateChange = () => form.validateFields(['endDate'])

  const handleDatePickerChange = () => {
    handleCheckEdit()
    handleStartDateChange()
  }

  const handleFieldsChange = (field, allField) => {}

  return (
    <div className="form-container">
      <Form
        clearOnDestroy={true}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="form"
        onFieldsChange={handleFieldsChange}
      >
        <Form.Item
          label="Tên sự kiện"
          name="content"
          rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}
        >
          <TextArea onChange={handleCheckEdit} rows={2} placeholder="Tên sự kiện..." />
        </Form.Item>

        <Form.Item
          label="Ngày bắt đầu"
          name="startDate"
          rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
        >
          <DatePicker
            onChange={handleDatePickerChange}
            className="full-width"
            placeholder="Chọn ngày bắt đầu"
          />
        </Form.Item>

        <Form.Item
          label="Ngày kết thúc"
          name="endDate"
          rules={[
            { required: true, message: 'Vui lòng chọn ngày kết thúc!' },
            { validator: validateEndDate },
          ]}
          dependencies={['startDate']}
        >
          <DatePicker
            onChange={handleCheckEdit}
            className="full-width"
            placeholder="Chọn ngày kết thúc"
          />
        </Form.Item>

        <Form.Item
          label="Loại sự kiện"
          name="typeEvent"
          rules={[{ required: true, message: 'Vui lòng chọn loại sự kiện!' }]}
          dependencies={['typeEvent']}
        >
          <Select
            showSearch
            placeholder="Chọn loại sự kiện"
            optionFilterProp="label"
            options={options}
            className="select-type-event"
            onChange={handleCheckEdit}
          />
        </Form.Item>

        <Form.Item className="form-item-footer">
          <Button onClick={handleCancel}>Hủy</Button>
          <Button disabled={!isEdited && currentEvent !== null} type="primary" htmlType="submit">
            {currentEvent == null ? 'Tạo' : 'Lưu'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RenderForm
