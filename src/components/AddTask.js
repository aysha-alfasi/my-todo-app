import mainpic from '../imgs/mainExam2.jpg';
import classes from './AddTask.module.css';

export default function AddTask() {
  return (
    <>
      <div className={classes.AddTask}>
        <header className={classes.header}>
          <img src={mainpic} className={classes.taskLogo} alt="logo" />
    <h1>My Tasks Manager</h1>
        </header>
      </div>
    </>
  );
}
