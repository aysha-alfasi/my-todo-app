import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
  sort: "All",
};

const AddTaskSlice = createSlice({
  name: "newTask",
  initialState,
  reducers: {
    setTasksList: (state, action) => {
      state.tasksList = action.payload;
    },
    addTask: (state, action) => {
      state.tasksList.push({
        task: action.payload.task,
        id: action.payload.id,
        completed: false,
      });
    },
    sortTask: (state, action) => {
      state.sort = action.payload;
    },

    toggleCompleted: (state, action) => {
      const { id } = action.payload;
      const index = state.tasksList.findIndex((task) => task.id === id);
      state.tasksList[index].completed = !state.tasksList[index].completed;
    },
  },
});

export const { setTasksList, addTask, sortTask, toggleCompleted } =
  AddTaskSlice.actions;

export default AddTaskSlice.reducer;
