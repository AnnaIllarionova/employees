import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main-page/main-page";
import { AddNewEmployee } from "./pages/add-new-employee/add-newemployee";
import { ChangeEmployee } from "./pages/change-employee/change-employee";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="add" element={<AddNewEmployee />} />
        <Route path="change/:currentId" element={<ChangeEmployee />} />
      </Route>
    </Routes>
  );
};
