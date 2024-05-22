import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useChangeEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetCurrentEmployeeQuery,
} from "../../services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateEmployee } from "../../services/slices";

export const ChangeEmployee = () => {
  const currentId = useParams();
  const {
    data,
    isLoading,
    error,
    refetch: currentEmployeeRefetch,
  } = useGetCurrentEmployeeQuery({
    id: currentId.currentId,
  });

  const { refetch } = useGetAllEmployeesQuery();
  const [employeeName, setEmployeeName] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeBirthday, setEmployeeBirthday] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [employeeInArchive, setEmployeeInArchive] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.birthday) {
      const [date, month, year] = data?.birthday.split(".");
      const formattedBirthday = `${year}-${month}-${date}`;

      setEmployeeName(data.name);
      setEmployeePhone(data.phone);
      setEmployeeBirthday(formattedBirthday);
      setEmployeeRole(data.role);
      setEmployeeInArchive(data.isArchive);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [changeEmployee, { isLoading: changesLoading, error: changesError }] =
    useChangeEmployeeMutation();
  const navigate = useNavigate();

  const onSubmit = async () => {
    let date = new Date(employeeBirthday);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    let formattedDate = day + "-" + month + "-" + year;
    let birthDate = formattedDate.split("-").join(".");

    try {
      await changeEmployee({
        id: currentId.currentId,
        name: employeeName,
        isArchive: employeeInArchive,
        role: employeeRole,
        phone: employeePhone,
        birthday: birthDate,
      });

      dispatch(
        updateEmployee({
          id: currentId.currentId,
          name: employeeName,
          isArchive: employeeInArchive,
          role: employeeRole,
          phone: employeePhone,
          birthday: birthDate,
        })
      );

      setIsChanged(false);
      refetch();
      currentEmployeeRefetch();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal__window">
        <h1 className="modal__title">Внесите изменения</h1>

        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 5,
                message: "Минимум 5 символов",
              },
            })}
            type="text"
            placeholder="Введите Имя и Фамилию сотрудника"
            className="modal__input"
            value={isLoading ? <p>Идет загрузка...</p> : employeeName}
            onChange={(e) => {
              setEmployeeName(e.target.value);
              setIsChanged(true);
            }}
          />
          {errors?.name ? (
            <p className="error">{errors?.name?.message}</p>
          ) : null}

          <input
            {...register("phone", {
              required: "Поле обязательно для заполнения",
            })}
            type="tel"
            placeholder="Введите телефон в формате +7 (777) 777-7777"
            className="modal__input"
            value={isLoading ? <p>Идет загрузка...</p> : employeePhone}
            onChange={(e) => {
              setEmployeePhone(e.target.value);
              setIsChanged(true);
            }}
          />
          {errors?.phone ? (
            <p className="error">{errors?.phone?.message}</p>
          ) : null}

          <input
            {...register("birthday", {
              required: "Поле обязательно для заполнения",
              valueAsDate: true,
            })}
            type="date"
            placeholder="Введите дату рождения дд.мм.гггг"
            className="modal__input"
            value={isLoading ? <p>Идет загрузка...</p> : employeeBirthday}
            onChange={(e) => {
              setEmployeeBirthday(e.target.value);
              setIsChanged(true);
            }}
          />
          {errors?.birthday ? (
            <p className="error">{errors?.birthday?.message}</p>
          ) : null}

          <select
            {...register("role", { required: true })}
            className="modal__input"
            value={isLoading ? "" : employeeRole}
            onChange={(e) => {
              setEmployeeRole(e.target.value);
              setIsChanged(true);
            }}
          >
            <option value="">Выберите должность</option>
            <option value="driver">driver</option>
            <option value="waiter">waiter</option>
            <option value="cook">cook</option>
          </select>
          {errors?.role ? (
            <p className="error">{errors?.role?.message}</p>
          ) : null}

          <div className="modal__checkbox">
            <input
              {...register("inArchive", {
                required: false,
              })}
              type="checkbox"
              id="archive"
              className="modal__checkbox_input"
              checked={isLoading ? false : employeeInArchive}
              onChange={(e) => {
                setEmployeeInArchive(e.target.checked);
                setIsChanged(true);
              }}
            />
            <label htmlFor="archive">в архиве</label>
          </div>

          <input
            className="modal__submit"
            type="submit"
            value={changesLoading ? "Подождите..." : "Изменить"}
            disabled={changesLoading || !isChanged}
          />
        </form>

        {(error || changesError) && (
          <p className="error">{error.error || changesError.error}</p>
        )}

        <Link to="/">
          <button className="modal__button">Вернуться на главную</button>
        </Link>
      </div>
    </div>
  );
};
