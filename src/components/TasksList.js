import classes from "./TasksList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setTasksList,
  addTask,
  sortTask,
  updateTask,
  toggleCompleted,
} from "../redux/AddTaskSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";

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

  const handleSort = (sort) => {
    dispatch(sortTask(sort));
  };
  const sortTasksList = tasksList.filter((task) => {
    if (sort === "All") return true;
    if (sort === "Completed" && task.completed) return true;
    if (sort === "Not Completed" && !task.completed) return true;
    return false;
  });
  return (
    <>
      <div className={classes.tasksContent}>
        <div className={classes.taskForm}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="write your task here"
          />
          <button
            className={classes.submit}
            onClick={() => {
              handleAddTask(newTask);
            }}
          >
            Add Task
          </button>
        </div>
        <div>
          {tasksList.length === 0 ? (
            <>
              <div>
              <p>No Tasks yet!</p>   
            </div>
            </>
          ) : (
            <div>
              {sortTasksList.map((task) => (
                <div key={task.id} className={classes.tasks}>
                  <div className={classes.taskList}>{task.task}</div>
                  <div>
                    <button className={classes.icons}>
                      <TiPencil />
                    </button>
                    <button className={classes.icons}>
                      <BsTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
