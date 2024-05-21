import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeesList: [],
  filteredList: [],
  rolesArr: [],
  isSortedByName: false,
  isSortedByBirth: false,
  isFilteredByArchive: false,
  isFilteredByRole: false,
};
const parseDate = (dateStr) => {
  const [date, month, year] = dateStr.split(".");
  return new Date(year, month - 1, date);
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    getDefaultSortedList: (state, action) => {
      state.employeesList = action.payload.list;
      state.filteredList = state.employeesList;
      state.isSortedByName = true;
    },
    getAscSortedList: (state, action) => {
      state.isSortedByName = true;

      state.employeesList = action.payload.list;
      state.filteredList = [...state.employeesList]
        .slice()
        .sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    getDescSortedList: (state, action) => {
      state.isSortedByName = true;

      state.employeesList = action.payload.list;
      state.filteredList = [...state.employeesList]
        .slice()
        .sort((a, b) => (b.name > a.name ? 1 : -1));
    },
    getDefaultSortedByBirth: (state, action) => {
      state.employeesList = action.payload.list;
      state.filteredList = state.employeesList;
      state.isSortedByBirth = true;
    },
    getAscSortedByBirth: (state, action) => {
      state.isSortedByBirth = true;

      state.employeesList = action.payload.list;

      state.filteredList = [...state.employeesList]
        .slice()
        .sort((a, b) => parseDate(b.birthday) - parseDate(a.birthday));
    },
    getDescSortedByBirth: (state, action) => {
      state.isSortedByBirth = true;

      state.employeesList = action.payload.list;
      state.filteredList = [...state.employeesList]
        .slice()
        .sort((a, b) => parseDate(a.birthday) - parseDate(b.birthday));
    },
    getFilteredListByArchive: (state, action) => {
      state.isFilteredByArchive = true;
      state.employeesList = action.payload.list;
      state.filteredList = state.employeesList.filter(
        (employee) => employee.isArchive === true
      );
    },
    removeFilteredListByArchive: (state, action) => {
      state.isFilteredByArchive = true;
      state.employeesList = action.payload.list;
      state.filteredList = state.employeesList;
    },
    addRole: (state, action) => {
      state.rolesArr.push(action.payload);
    },
    removeRole: (state, action) => {
      state.rolesArr = state.rolesArr.filter((role) => role !== action.payload);
    },
    getFilteredListByRole: (state, action) => {
      state.employeesList = action.payload.list;
      state.isFilteredByRole = true;

      if (state.rolesArr.length > 0) {
        state.filteredList = state.employeesList.filter((employee) =>
          state.rolesArr.includes(employee.role)
        );
      } else {
        state.filteredList = state.employeesList;
      }
    },
  },
});

export const {
  getDefaultSortedList,
  getAscSortedList,
  getDescSortedList,
  getDefaultSortedByBirth,
  getAscSortedByBirth,
  getDescSortedByBirth,
  getFilteredListByArchive,
  removeFilteredListByArchive,
  addRole,
  removeRole,
  getFilteredListByRole,
} = employeesSlice.actions;
export default employeesSlice.reducer;
