import { useState } from "react";
import { useGetAllEmployeesQuery } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addRole,
  getAscSortedByBirth,
  getAscSortedList,
  getDefaultSortedByBirth,
  getDefaultSortedList,
  getDescSortedByBirth,
  getDescSortedList,
  getFilteredListByArchive,
  getFilteredListByRole,
  removeFilteredListByArchive,
  removeRole,
} from "../../services/slices";

export const Filters = () => {
  const { data } = useGetAllEmployeesQuery();
  const dispatch = useDispatch();
  const [isNameClicked, setIsNameClicked] = useState(false);
  const [isBirthClicked, setIsBirthClicked] = useState(false);
  const [isArchiveClicked, setIsArchiveClicked] = useState(false);
  const [isRoleClicked, setIsRoleClicked] = useState(false);
  const [isNameFilterSelected, setIsNameFilterSelected] =
    useState("По умолчанию");
  const [isBirthFilterSelected, setIsBirthFilterSelected] =
    useState("По умолчанию");

  const handleSortByName = ({ filter }) => {
    if (filter === "По умолчанию") {
      dispatch(getDefaultSortedList({ list: data }));
    } else if (filter === "По возрастанию") {
      dispatch(getAscSortedList({ list: data }));
    } else if (filter === "По убыванию") {
      dispatch(getDescSortedList({ list: data }));
    }
    setIsNameFilterSelected(filter);
  };

  const handleSortByBirth = ({ filter }) => {
    if (filter === "По умолчанию") {
      dispatch(getDefaultSortedByBirth({ list: data }));
    } else if (filter === "По возрастанию") {
      dispatch(getAscSortedByBirth({ list: data }));
    } else if (filter === "По убыванию") {
      dispatch(getDescSortedByBirth({ list: data }));
    }
    setIsBirthFilterSelected(filter);
  };

  const handleFilterByArchive = (e) => {
    setIsArchiveClicked(e.target.checked);
    setIsBirthClicked(false);
    setIsNameClicked(false);
    setIsRoleClicked(false);

    if (e.target.checked) {
      dispatch(getFilteredListByArchive({ list: data }));
    } else {
      dispatch(removeFilteredListByArchive({ list: data }));
    }
  };
  const handleName = () => {
    setIsNameClicked(!isNameClicked);
    setIsBirthClicked(false);
    setIsArchiveClicked(false);
    setIsRoleClicked(false);
    setIsBirthFilterSelected("По умолчанию");
  };
  const handleBirth = () => {
    setIsBirthClicked(!isBirthClicked);
    setIsNameClicked(false);
    setIsArchiveClicked(false);
    setIsRoleClicked(false);
    setIsNameFilterSelected("По умолчанию");
  };
  const handleRole = () => {
    setIsBirthClicked(false);
    setIsNameClicked(false);
    setIsArchiveClicked(false);
    setIsRoleClicked(!isRoleClicked);
    setIsBirthFilterSelected("По умолчанию");
    setIsNameFilterSelected("По умолчанию");
  };
  return (
    <div className="filters">
      <h3 className="filters__title">Сортировать по:</h3>

      <div className="filters__list">
        <button className="filters__button" onClick={handleName}>
          имени
        </button>
        {isNameClicked && (
          <ListForSort
            handleSortByOption={handleSortByName}
            isNameFilterSelected={isNameFilterSelected}
          />
        )}
      </div>

      <div className="filters__list">
        <button className="filters__button" onClick={handleBirth}>
          дате рождения
        </button>
        {isBirthClicked && (
          <ListForSort
            handleSortByOption={handleSortByBirth}
            isBirthFilterSelected={isBirthFilterSelected}
          />
        )}
      </div>

      <div className="filters__list">
        <button className="filters__button" onClick={handleRole}>
          должности
        </button>
        {isRoleClicked && <ListForFilter data={data} />}
      </div>

      <div className="filters__archive">
        <input
          type="checkbox"
          className="filters__input"
          name="archive"
          id="archiveCheckbox"
          checked={isArchiveClicked}
          onChange={(e) => handleFilterByArchive(e)}
        />
        <label className="filters__label" htmlFor="archiveCheckbox">
          в архиве
        </label>
      </div>
    </div>
  );
};

export const ListForSort = ({
  handleSortByOption,
  isNameFilterSelected,
  isBirthFilterSelected,
}) => {
  const filters = ["По умолчанию", "По убыванию", "По возрастанию"];

  const filtersByOption = filters.map((filter) => {
    const isChosen = (isNameFilterSelected || isBirthFilterSelected) === filter;
    return (
      <div
        className={isChosen ? "filters__box_chosen" : "filters__box_item"}
        key={filter}
        onClick={() => handleSortByOption({ filter })}
      >
        {filter}
      </div>
    );
  });

  return (
    <div className="filters__box">
      <div className="filters__box_links">{filtersByOption}</div>
    </div>
  );
};

export const ListForFilter = ({ data }) => {
  const dispatch = useDispatch();
  const rolesArr = useSelector((state) => state.employees.rolesArr);
  const roles = [...new Set(data.map((employee) => employee.role))];
  // console.log("roles", roles);

  const handleFilterByRole = ({ role }) => {
    if (rolesArr.includes(role)) {
      dispatch(removeRole(role));
    } else {
      dispatch(addRole(role));
    }
    dispatch(getFilteredListByRole({ list: data }));
  };

  const rolesList = roles.map((role) => {
    const isChosen = rolesArr.includes(role);
    return (
      <div
        className={isChosen ? "filters__box_chosen" : "filters__box_item"}
        key={role}
        onClick={() => handleFilterByRole({ role })}
      >
        {role}
      </div>
    );
  });
  return (
    <div className="filters__box">
      <div className="filters__box_links">{rolesList}</div>
    </div>
  );
};
