import { Modal } from 'antd'
function ModalTaskList({ open, setOpen }) {
  return (
    <div>
      {open === true ? (
        <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
          Modal task list
        </Modal>
      ) : null}
    </div>
  )
}

export default ModalTaskList
