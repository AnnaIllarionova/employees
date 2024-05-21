import { Link, useParams } from "react-router-dom";

export const ChangeEmployee = () => {
  const id = useParams();
  console.log(id);
  return (
    <div className="modal">
      <div className="modal__window">
        <h1 className="modal__title">Внесите изменения</h1>

        <Link to="/">
          <button className="modal__button">Вернуться на главную</button>
        </Link>
      </div>
    </div>
  );
};
