import React from "react";
import "./DropDown.css";
import { dataFormat } from "../../App";

interface DropdownProps {
  items: dataFormat[];
  inputValue: string;
  onItemClick: (item: dataFormat) => void;
  isDropdownVisible: boolean;
  marginRight: number;
}

const DropDown: React.FC<DropdownProps> = ({
  items,
  inputValue,
  onItemClick,
  isDropdownVisible,
  marginRight,
}) => {
  return (
    <div className="">
      {isDropdownVisible ? (
        <div
          className="dropdown"
          style={{ marginLeft: `${340 + marginRight}px` }}
        >
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item) => (
              <div
                key={item.id}
                className="dropdown-item"
                onClick={() => {
                  onItemClick(item);
                }}
              >
                <div className="item">
                  {/* <RxAvatar className="avatar" /> */}
                  <img
                    src={item.image}
                    alt={item.image}
                    className="avatar-chip"
                  />
                  <div className="name">{item.name}</div>
                  <div className="email">{item.email}</div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DropDown;
