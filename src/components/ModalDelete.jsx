import React from 'react'

function ModalDelete(props) {

  const handleClose = (e) => {
    e.stopPropagation()
  }
  const handleBtnDelete = () => {
    props.handleDeleteTask(props.index)
    props.handleOverlay()
  }
  return (
    <div className="modalDelete" onClick={handleClose}>
      <div className="title">Delete This Task?</div>
      <div className="remind">
        Are you sure you want to delete
        the "{props.task.title}" board?
        This action will remove all columns
        and tasks and cannot be reversed.
      </div>
      <div className="btnGroup">
        <button className="btnDelete btn" onClick={handleBtnDelete}>Delete</button>
        <button className="btnCancel btn" onClick={props.handleOverlay}>Cancel</button>
      </div>
    </div>
  )
}

export default ModalDelete