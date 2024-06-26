import mainpic from '../../imgs/todoAppLogo.png';
import classes from './Header.module.css';
import { motion } from "framer-motion";


export default function Header() {
  return (
    <>
      <div className={classes.Header}>
        <header>
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={mainpic}
            className={classes.taskLogo}
            alt="logo"
          />
          <motion.h1
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
          My Daily Tasks
            
          </motion.h1>
        </header>
      </div>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 3 }}
      >
        
      </motion.div>
    </>
  );
}
