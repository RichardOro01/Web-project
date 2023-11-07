import { CRUD_ModalsType } from "@/components/modals";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModalSlice {
  current?: CRUD_ModalsType;
  editing?: any;
}

const initialState: ModalSlice = {
  current: void 0,
  editing: void 0,
};

export const formSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setCurrentModal: (state, action: PayloadAction<CRUD_ModalsType>) => {
      state.current = action.payload;
    },
    hideCurrentModal: (state) => {
      state.current = void 0;
      state.editing = void 0;
    },
    setEditingModal: (state, action: PayloadAction<any>) => {
      state.editing = action.payload;
    },
  },
});

export const { setCurrentModal, hideCurrentModal, setEditingModal } =
  formSlice.actions;

export default formSlice.reducer;
