import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { SortItemType } from "../Redux/slices/filterSlice";

export const sortList: SortItemType[] = [
  { name: "Popularity (ASC)", sortProperty: "rating" },
  { name: "Popularity (DESC)", sortProperty: "-rating" },
  { name: "Price (ASC)", sortProperty: "price" },
  { name: "Price (DESC)", sortProperty: "-price" },
  { name: "name (ASC)", sortProperty: "title" },
  { name: "name (DESC)", sortProperty: "-title" },
];

type SortProps = {
  sort: { name: string; sortProperty: string };
  onChangeSort: (sortItem: SortItemType) => void;
};

const Sort: React.FC<SortProps> = ({ sort, onChangeSort }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortListItemHandler = (sortItem: SortItemType) => {
    onChangeSort(sortItem);
    setIsSortOpen((prev) => !prev);
  };

  useEffect(() => {
    const closeSortHandler = (event: any) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsSortOpen(false);
      }
    };
    document.body.addEventListener("click", closeSortHandler);

    return () => document.body.removeEventListener("click", closeSortHandler);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div
        onClick={() => setIsSortOpen((prev) => !prev)}
        className="sort__label"
      >
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span>{sort.name}</span>
      </div>
      {isSortOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((sortItem) => (
              <li
                onClick={() => sortListItemHandler(sortItem)}
                key={sortItem.sortProperty}
                className={
                  sort.sortProperty === sortItem.sortProperty ? "active" : ""
                }
              >
                {sortItem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
