import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Thunk method
interface ArrayModel {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  // timeStamp?: number;
}

type States = {
  data: ArrayModel[];
  originalData: ArrayModel[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  editedIds: number[];
};

const initialState: States = {
  data: [],
  originalData: [],
  loading: false,
  hasMore: true,
  page: 0,
  editedIds: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setData(state, action) {
      state.data = [...state.data, ...action.payload];
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
    setItemTitle(state, action: PayloadAction<{ id: number; title: string }>) {
      const { id, title } = action.payload;
      const item = state.data.find((item) => item.id === id);
      if (item) {
        item.title = title;
      }
      if (!state.editedIds.includes(id)) {
        state.editedIds.push(id);
      }
    },
    setEditedItem(state, action) {
      const id = action.payload;
      const stateArrId = state.editedIds;
      !stateArrId.includes(id) ? stateArrId.push(id) : [];
    },
    clearEdited(state) {
      state.editedIds = [];
    },
    setOriginalData(state, action: PayloadAction<ArrayModel[]>) {
      state.originalData = action.payload;
    },
    resetToOriginal(state) {
      state.data = [...state.originalData];
    },
    confirmChanges(state) {
      state.originalData = [...state.data];
    },
  },
});

export const {
  setLoading,
  setData,
  setPage,
  setHasMore,
  setEditedItem,
  clearEdited,
  setItemTitle,
  setOriginalData,
  resetToOriginal,
  confirmChanges,
} = dataSlice.actions;
export default dataSlice.reducer;
