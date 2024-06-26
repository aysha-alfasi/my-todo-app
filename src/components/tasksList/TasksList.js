import { useEffect, useState } from "react";
import classes from './TasksList.module.css';
import { useDispatch, useSelector } from "react-redux";
import {
  setTasksList,
  addTask,
  sortTask,
  toggleCompleted,
} from '../../redux/AddTaskSlice';
import { AnimatePresence, motion } from "framer-motion";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import waiting from '../../imgs/waiting for your tasks.png';

export default function TasksList() {
  const dispatch = useDispatch();
  const tasksList = useSelector((state) => state.newTask.tasksList);
  const sort = useSelector((state) => state.newTask.sort);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (tasksList.length > 0) {
      localStorage.setItem("tasksList", JSON.stringify(tasksList));
    }
  }, [tasksList]);
  useEffect(() => {
    const localTasksList = JSON.parse(localStorage.getItem("tasksList"));
    if (localTasksList) {
      dispatch(setTasksList(localTasksList));
    }
  }, []);

  const handleAddTask = (task) => {
    if (task.trim().length === 0) {
      alert("Please Add something!");
    } else {
      dispatch(
        addTask({
          task: task,
          id: Date.now(),
        })
      );
      setNewTask("");
    }
  };

  const handleDelete = (id) => {
    const updatedTasksList = tasksList.filter((task) => task.id !== id);
    dispatch(setTasksList(updatedTasksList));
    localStorage.setItem("tasksList", JSON.stringify(updatedTasksList));
  };

  const handleSort = (sort) => {
    dispatch(sortTask(sort));
  };
  const sortTasksList = tasksList.filter((task) => {
    if (sort === "All") return true;
    if (sort === "Completed" && task.completed) return true;
    if (sort === "Not Completed" && !task.completed) return true;
    return false;
  });

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };

  return (
    <>
      <div className={classes.tasksContent}>
        <div className={classes.taskForm}>
          <motion.input
            className={classes.Input}
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="write your task here"
            aria-label="input"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={classes.submit}
            onClick={() => {
              handleAddTask(newTask);
            }}
          >
            Add Task
          </motion.button>
        </div>
        <div>
          {tasksList.length === 0 ? (
            <>
              <div>
                <motion.img
                  initial={{
                    x: 0,
                    y: 0,
                    transition: { type: "spring", duration: 2 },
                  }}
                  animate={{
                    x: 0,
                    y: 40,
                    transition: { type: "spring", duration: 2 },
                  }}
                  className={classes.watitngImg}
                  src={waiting}
                  alt="picture of a girl teeling that there is no tasks added yet"
                  aria-label="waiting for tasks"
                />
              </div>
            </>
          ) : (
            <div className={classes.container}>
              <div className={classes.sortMenu}>
                <motion.select
                  whileTap={{ scale: 0.9 }}
                  onChange={(e) => handleSort(e.target.value)}
                  aria-label="select"
                >
                  <option className={classes.options} value="All">
                    All ♡⋆˚
                  </option>
                  <option className={classes.options} value="Completed">
                    Completed ˘ᵕ˘
                  </option>
                  <option className={classes.options} value="Not Completed">
                    Active ⋆˚✦
                  </option>
                </motion.select>
              </div>
              <AnimatePresence>
                {sortTasksList.map((task) => (
                  <motion.li
                    initial={{
                      x: 0,
                      y: 0,
                      transition: { type: "spring", duration: 2 },
                    }}
                    animate={{
                      x: 0,
                      y: 40,
                      transition: { type: "spring", duration: 2 },
                    }}
                    whileHover={{
                      scale: 0.9,
                      transition: { type: "spring", duration: 0.1 },
                    }}
                    exit={{
                      y: "-60vw",
                      scale: [1, 1],
                      transition: { type: "spring", duration: 0.7 },
                      backgroundColor: "lightgreen",
                    }}
                    key={task.id}
                    className={task.completed ? classes.isCompleted :classes.tasks}
                  >
                    
                      {task.task}
                   
                    <div className={classes.trying}></div>
                    <div className={classes.btns}>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={classes.iconComplete}
                        onClick={() => {
                          handleToggleCompleted(task.id);
                        }}
                        aria-label="complete"
                      >
                        <FaHeartCircleCheck />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={classes.iconDelete}
                        onClick={() => handleDelete(task.id)}
                        aria-label="delete"
                      >
                        <FaCircleXmark />
                      </motion.button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </>
  );
}