import { useState } from 'react'
import ModalTaskList from './modal/modal-task-list.jsx'

import TimekeepingIcon from '../../../../assets/images/erp/timekeeping-icon.svg'
import WarningIcon from '../../../../assets/images/erp/warning-icon.svg'
import ClockIcon from '../../../../assets/images/erp/clock-icon.svg'
import DeadlineIcon from '../../../../assets/images/erp/deadline-icon.svg'
import JobIcon from '../../../../assets/images/erp/job-icon.svg'
import TaskIcon from '../../../../assets/images/erp/task-icon.svg'
import { Modal } from 'antd'

const valueTaskList = [
  { icon: TimekeepingIcon, title: 'Chưa chấm công', status: 'Hôm nay', className: 'task-1' },
  { icon: WarningIcon, title: '0 công việc', status: 'Quá hạn', className: 'task-2' },
  { icon: ClockIcon, title: '3 công việc', status: 'Đến hạn', className: 'task-3' },
  { icon: DeadlineIcon, title: '1 công việc', status: 'Sắp đến hạn', className: 'task-4' },
  { icon: JobIcon, title: '1 công việc', status: 'Chờ tôi duyệt', className: 'task-5' },
  { icon: TaskIcon, title: '1 công việc', status: 'Cần giao', className: 'task-6' },
]
function TaskList({ OpenPopup }) {
  const [open, setOpen] = useState(false)
  const [openTask, setOpenTask] = useState(null)

  return (
    <div className="task-list">
      <div className="task-list-title">
        <div>Công việc hôm nay</div>
        <img className="open-popup-icon" src={OpenPopup} onClick={() => setOpen(true)} />
      </div>
      <ModalTaskList open={open} setOpen={setOpen} />
      <div className="task-list-tasks">
        {valueTaskList.map((task, index) => {
          return (
            <div className="task-list-task">
              <div
                onClick={() => setOpenTask(index)}
                className={`task-list-task-icon ${task.className}`}
              >
                <img src={task.icon} />
              </div>
              <div className="task-list-task-content">
                <div>{task.title}</div>
                <span>{task.status}</span>
              </div>
              {openTask == index ? (
                <Modal
                  className="task-list-task-modal"
                  open={true}
                  onCancel={() => setOpenTask(null)}
                  footer={null}
                >
                  <div>{task.title}</div>
                  <span>{task.status}</span>
                </Modal>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TaskList
