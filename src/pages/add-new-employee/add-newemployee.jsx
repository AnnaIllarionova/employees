import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAddEmployeeMutation, useGetAllEmployeesQuery } from "../../services/api";

export const AddNewEmployee = () => {
  const navigate = useNavigate();
  const [addEmployee, { isLoading, error }] = useAddEmployeeMutation();
  const {refetch} = useGetAllEmployeesQuery();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (employeeData) => {
    let date = new Date(employeeData.birthday);
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

    console.log(employeeData);
    try {
      await addEmployee({
        name: employeeData.name,
        isArchive: employeeData.inArchive,
        role: employeeData.role,
        phone: employeeData.phone,
        birthday: birthDate,
      });
      navigate("/");
      reset();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal__window">
        <h1 className="modal__title">Добавьте нового сотрудника</h1>

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
          />
          {errors?.birthday ? (
            <p className="error">{errors?.birthday?.message}</p>
          ) : null}

          <select
            {...register("role", { required: true })}
            className="modal__input"
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
            />
            <label htmlFor="archive">в архиве</label>
          </div>

          <input
            className="modal__submit"
            type="submit"
            value="Добавить"
            disabled={!isValid || isLoading}
          />
        </form>

        {error && <p className="error">{error.message}</p>}

        <Link to="/">
          <button className="modal__button">Вернуться на главную</button>
        </Link>
      </div>
    </div>
  );
};
