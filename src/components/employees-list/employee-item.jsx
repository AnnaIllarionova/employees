import { Link } from "react-router-dom";

export const EmployeeItem = ({ employee }) => {

  return (
    <div className="employee">
      <p className="employee__name">{employee.name}</p>
      <p className="employee__role">{employee.role}</p>
      <p className="employee__phone">{employee.phone}</p>
      <p className="employee__phone">{employee.birthday}</p>
      <Link to={`/change/${employee.id}`}>
        <button className="employee__button">Редактировать</button>
      </Link>
    </div>
  );
};
