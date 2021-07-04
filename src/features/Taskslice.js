import { createSlice } from '@reduxjs/toolkit';

export const Taskslice = createSlice({
  name: "task",
  initialState: {
    task: null,
  },
  reducers: {
    pushTask: (state, action) => {
      state.task = action.payload;
    },
  },
});

export const { pushTask } = Taskslice.actions;

export const selectTask = (state) => state.task.task;

export default Taskslice.reducer;
