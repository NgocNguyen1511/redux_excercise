import { createSlice } from "@reduxjs/toolkit";

type CounterState = {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increasement(state) {
      state.value++;
    },
    decreasement(state) {
      state.value--;
    },
  },
});

export const { increasement, decreasement } = counterSlice.actions;
export default counterSlice.reducer;