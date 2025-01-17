import { createSlice } from "@reduxjs/toolkit";

const cardsSlice = createSlice({
  name: "cards",
  initialState: [], 
  reducers: {
    addCard: (state, action) => {
      state.push({
        id: new Date().getTime(),  // Unique ID
        title: action.payload.title,
        description: action.payload.description,
        modifiedDate: new Date().toISOString(), // Set the current time as the modified date
      });
    },
    updateCard: (state, action) => {
      const index = state.findIndex((card) => card.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          title: action.payload.title,
          description: action.payload.description,
          modifiedDate: new Date().toISOString(), // Update the modified date on edit
        };
      }
    },
    deleteCard: (state, action) => {
      const index = action.payload; 
      if (index >= 0 && index < state.length) {
        state.splice(index, 1); 
      }
    },
  },
});

export const { addCard, updateCard, deleteCard } = cardsSlice.actions;
export default cardsSlice.reducer;
