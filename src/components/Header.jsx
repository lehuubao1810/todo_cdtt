import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

function Header(props) {
  const { theme, handleTheme } = useContext(ThemeContext)
  const [modalUser, setModalUser] = useState(false)
  const handleUser = () => {
    setModalUser(!modalUser)
  }

  return (
    <div className="nav">
      <div className="logo">ToDo</div>
      <div className="group">
        {
          theme === 'dark' ?
            <button className="btnTheme" onClick={handleTheme}>
              <i className="fas fa-moon"></i>
              Dark Mode
            </button>
            :
            <button className="btnTheme" onClick={handleTheme}>
              <i className="fas fa-sun"></i>
              Light Mode
            </button>
        }

        <div className="avt" onClick={handleUser}>
          <i className="fas fa-user-circle"></i>
          {
            modalUser &&
            <div className="modalUser" >
              <div className="option" >
                <i className="fa-solid fa-edit"></i>
                <span>Edit profile</span>
              </div>
              <div
                className="option logout"
                onClick={props.handleLogout}
              >
                <i className="fa-solid fa-sign-out"></i>
                <span>Logout</span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Header