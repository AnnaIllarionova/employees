import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main-page/main-page";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
