import React from "react";
import "./DropDown.css";
import { dataFormat } from "../../App";
import { RxAvatar } from "react-icons/rx";

interface DropdownProps {
  items: dataFormat[];
  inputValue: string;
  onItemClick: (item: dataFormat) => void;
  isDropdownVisible: boolean;
}

const DropDown: React.FC<DropdownProps> = ({
  items,
  inputValue,
  onItemClick,
  isDropdownVisible,
}) => {
  return (
    <div className="">
      {isDropdownVisible ? (
        <div className="dropdown">
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
                  <RxAvatar className="avatar" />
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
