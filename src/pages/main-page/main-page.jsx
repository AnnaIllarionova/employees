import { Link, Outlet } from "react-router-dom";
import { EmployeesList } from "../../components/employees-list/employees-list";
import { Filters } from "../../components/filters/filters";
import { useGetAllEmployeesQuery } from "../../services/api";

export const MainPage = () => {
  const { data: employeesData, isLoading, error } = useGetAllEmployeesQuery();
  console.log(employeesData);
  return (
    <div className="main">
      <h1 className="main__title">Список сотрудников компании</h1>
      <Filters employeesData={employeesData} />
      <EmployeesList
        employeesData={employeesData}
        isLoading={isLoading}
        error={error}
      />
      <Link to="/add">
      <button className="main__add">Добавить сотрудника</button>
      </Link>
      <Outlet />
    </div>
  );
};
