export const EmployeeItem = ({ employee }) => {
  // console.log(typeof employee.birthday);
  return (
    <div className="employee">
      <p className="employee__number">{employee.id}.</p>
      <p className="employee__name">{employee.name}</p>
      <p className="employee__role">{employee.role}</p>
      <p className="employee__phone">{employee.phone}</p>     
      <p className="employee__phone">{employee.birthday}</p>

    </div>
  );
};
