import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../Database";
import { Module } from "./List";

const initialState: {
  allModules: any[];
  modules: Module[];
  module: Module;
} = {
  allModules: modules,
  modules: [],
  module: { _id: "0", name: "", lessons: [] },
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules =
        state.allModules.find(
          (module) => module.course === action.payload.courseId
        )?.modules || [];
    },
    addModule: (state, action) => {
      state.modules = [
        { ...action.payload, _id: new Date().getTime().toString() },
        ...state.modules,
      ];
      state.module = { _id: "0", name: "", lessons: [] };
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
    addLesson: (state, action) => {
      state.modules = state.modules.map((module) => {
        if (module._id === action.payload.moduleId) {
          return {...module, lessons: [...module.lessons, {_id: new Date().getTime().toString(), name: "New Lesson", type: "page"}]}
        } else {
          return module
        }
      })
    },
  },
});

export const { setModules, addModule, deleteModule, updateModule, setModule, addLesson } =
  modulesSlice.actions;
export default modulesSlice.reducer;
