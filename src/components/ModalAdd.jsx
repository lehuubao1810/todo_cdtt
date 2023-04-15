import React from 'react'
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
      // console.log(action.payload)
      return { ...state, description: action.payload }
    case 'status':
      return { ...state, status: action.payload }
    default:
      return state
  }
}

function ModalAdd(props) {

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value })
  }
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  const handleBtnAdd = () => {
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
      handleAddTask()
    }
  }

  const handleFocus = (e) => {
    e.target.classList.contains('isEmpty')
      ?
      e.target.classList.remove('isEmpty')
      :
      null
  }
  const handleAddTask = () => {
    props.handleAddTask(state)
    props.handleOverlay()
  }

  const handleClose = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="modalAdd modalForm" onClick={e => handleClose(e)} >
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
            onFocus={handleFocus}
          />
          <label htmlFor="description">Description</label>
          <textarea
            ref={descriptionRef}
            name="description"
            id="description"
            cols="30" rows="10"
            value={state.description}
            onChange={handleChange}
            onFocus={handleFocus}
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
            className="btnAdd btn"
            onClick={handleBtnAdd}
          >
            Add Task
          </button>
        </div>
      </div>

    </div>
  )
}

export default ModalAdd