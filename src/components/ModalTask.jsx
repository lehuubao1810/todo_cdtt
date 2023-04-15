import React from 'react'
import { useState } from 'react'
import ModalEdit from './ModalEdit'
import ModalDelete from './ModalDelete'

function ModalTask(props) {

    const [statusModalTask, setStatusModalTask] = useState(true)
    const [statusTask, setStatusTask] = useState(props.task.status)
    const [statusMore, setStatusMore] = useState(false)
    const [statusModalEdit, setStatusModalEdit] = useState(false)
    const [statusModalDelete, setStatusModalDelete] = useState(false)


    const handleClose = (e) => {
        e.stopPropagation()
    }

    const handleCloseMore = (e) => {
        e.stopPropagation()
        setStatusMore(false)
    }
    const handleStatusMore = (e) => {
        e.stopPropagation()
        setStatusMore(true)
    }
    const handleStatusTask = (e) => {
        setStatusTask(e.target.value)
        props.task.status = e.target.value
        props.updateFirebase(props.tasks) 
    }
    const handleEdit = () => {
        setStatusMore(false)
        setStatusModalEdit(true)
        setStatusModalTask(false)
    }
    const handleDelete = () => {
        setStatusMore(false)
        setStatusModalDelete(true)
        setStatusModalTask(false)
    }

    return (
        <>
            {
                statusModalTask &&
                <div className="modalTask" onClick={e => handleCloseMore(e)}>
                    <div className="header">
                        <div className="title">{props.task.title}</div>
                        <div className="more" onClick={e => handleStatusMore(e)}>
                            <i className="btnMore fa-solid fa-ellipsis-vertical"></i>
                            {
                                statusMore &&
                                <div className="moreOptions" onClick={e => handleClose(e)}>
                                    <div className="option" onClick={handleEdit} >
                                        <i className="fa-solid fa-edit"></i>
                                        <span>Edit</span>
                                    </div>
                                    <div
                                        className="option delete"
                                        onClick={handleDelete}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                        <span>Delete</span>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                    <div className="description">
                        <pre>{props.task.description}</pre>
                    </div>
                    <h4>Current status</h4>
                    <select
                        className="status"
                        onChange={e => handleStatusTask(e)}
                        value={statusTask}
                    >
                        <option value="Completed">Completed</option>
                        <option value="Incomplete">Incomplete</option>
                    </select>
                </div>
            }
            {
                statusModalEdit &&
                <ModalEdit
                    tasks={props.tasks}
                    task={props.task}
                    handleOverlay={props.handleOverlay}
                    updateFirebase={props.updateFirebase}
                />
            }
            {
                statusModalDelete &&
                <ModalDelete
                    task={props.task}
                    index={props.index}
                    handleOverlay={props.handleOverlay}
                    handleDeleteTask={props.handleDeleteTask}
                />
            }
        </>

    )
}

export default ModalTask