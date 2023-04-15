import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardTask from '../components/CardTask'
import ModalAdd from '../components/ModalAdd'
import { ThemeContext } from '../contexts/ThemeContext'

function Home() {
    const { theme } = useContext(ThemeContext)
    const { logout, setCurrentUser, currentUser, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch(err) {
            console.log(err);
            console.log('Failed to log out');
        }
    }

    const [statusModalAdd, setStatusModalAdd] = useState(false)

    const [tasks, setTasks] = useState([])

    // get data from firebase
    useEffect(() => {
        const uid = currentUser.uid;
        const getTasks = async () => {
            const docRef = doc(db, "tasks", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTasks(docSnap.data().tasks)
            } else {
                console.log("No such document!");
            }
        }
        {uid && getTasks()}
    }, [loading]);

    const updateFirebase = async (tasks) => {
        const uid = currentUser.uid;
        const docRef = doc(db, "tasks", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef, {
                tasks: tasks
            });
        } else {
            console.log("No such document!");
        }
    }

    const handleAddTask = (task) => {
        setTasks([...tasks, task])
        updateFirebase([...tasks, task])
    }

    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((task, i) => i !== index)
        setTasks(newTasks)
        updateFirebase(newTasks)
    }

    const handleModalAdd = () => {
        setStatusModalAdd(true)
    }
    const handleOverlay = () => {
        setStatusModalAdd(false)
    }

    return (
        <div className={`${theme}`}>
            <Header handleLogout={handleLogout} />
            <div className="container">
                {
                    loading
                        ?
                        <div className="bounce-loading">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        :
                        <div className="tasks">
                            {tasks.map((task, index) => (
                                <div key={index}>
                                    <CardTask
                                        tasks={tasks}
                                        task={task}
                                        index={index}
                                        handleDeleteTask={handleDeleteTask}
                                        updateFirebase={updateFirebase}
                                    />
                                </div>
                            ))}
                        </div>
                }
            </div>
            <button
                className="btnAddTask"
                onClick={handleModalAdd}
            >
                <i className="fa-solid fa-plus"></i>
            </button>
            {
                statusModalAdd &&
                <div
                    onClick={handleOverlay}
                    className="overlay"
                >
                    <ModalAdd
                        tasks={tasks}
                        handleOverlay={handleOverlay}
                        handleAddTask={handleAddTask}
                    />
                </div>
            }
            <Footer />
        </div>
    )
}

export default Home