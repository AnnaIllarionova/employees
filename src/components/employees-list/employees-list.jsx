import { EmployeeItem } from "./employee-item";
import "../../App.css";
import { useSelector } from "react-redux";

export const EmployeesList = ({ employeesData, isLoading, error }) => {
  const isSortedByName = useSelector((state) => state.employees.isSortedByName);
  const isSortedByBirth = useSelector(
    (state) => state.employees.isSortedByBirth
  );
  const filteredList = useSelector((state) => state.employees.filteredList);
  const isFilteredByArchive = useSelector(
    (state) => state.employees.isFilteredByArchive
  );
  const isFilteredByRole = useSelector(
    (state) => state.employees.isFilteredByRole
  );

  if (error) {
    return <h3 className="error">{error.message}</h3>;
  }
  if (isLoading) {
    return <p>Данные загружаются, подождите...</p>;
  }
  return (
    <div className="employees">
      {isSortedByName ||
      isSortedByBirth ||
      isFilteredByArchive ||
      isFilteredByRole
        ? filteredList.map((employee) => (
            <EmployeeItem key={employee.id} employee={employee} />
          ))
        : employeesData.map((employee) => (
            <EmployeeItem key={employee.id} employee={employee} />
          ))}
    </div>
  );
};
