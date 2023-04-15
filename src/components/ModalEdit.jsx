import React, { useEffect } from 'react'
import { useReducer, useRef } from 'react'

const initialState = {
  title: '',
  description: '',
  status: 'Incomplete'
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload }
    case 'description':
      return { ...state, description: action.payload }
    case 'status':
      return { ...state, status: action.payload }
    default:
      return state
  }
}

function ModalEdit(props) {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: 'title', payload: props.task.title })
    dispatch({ type: 'description', payload: props.task.description })
    dispatch({ type: 'status', payload: props.task.status })
  }, [])

  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value })
  }

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  const handleBtnSave = () => {
    if (state.title === '' && state.description === '') {
      titleRef.current.classList.add('isEmpty')
      descriptionRef.current.classList.add('isEmpty')
    }
    else if (state.title === '') {
      titleRef.current.classList.add('isEmpty')
    }
    else if (state.description === '') {
      descriptionRef.current.classList.add('isEmpty')
    } else {
      handleSaveChanges()
    }
  }

  const handleFocus = (e) => {
    e.target.classList.contains('isEmpty')
      ?
      e.target.classList.remove('isEmpty')
      :
      null
  }

  const handleSaveChanges = () => {
    props.task.title = state.title
    props.task.description = state.description
    props.task.status = state.status
    props.updateFirebase(props.tasks)
    props.handleOverlay()
  }

  const handleClose = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="modalEdit modalForm" onClick={e => handleClose(e)} >
      <div className="title">Edit Task</div>
      <div className="form">
        <div className="formGroup">
          <label htmlFor="title">Title</label>
          <input
            ref={titleRef}
            type="text"
            name="title"
            id="title"
            value={state.title}
            onChange={handleChange}
            onFocus={e => handleFocus(e)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            ref={descriptionRef}
            name="description"
            id="description"
            cols="30" rows="10"
            value={state.description}
            onChange={handleChange}
            onFocus={e => handleFocus(e)}
          ></textarea>
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={state.status}
            onChange={handleChange}
          >
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
          <button
            className="btnSaveChanges btn"
            onClick={handleBtnSave}
          >
            Save Changes
          </button>
        </div>
      </div>

    </div>
  )
}

export default ModalEdit