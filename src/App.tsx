import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import DropDown from "./components/DropDown/DropDown";
import data from "./ChipData.json";

export interface dataFormat {
  id: number;
  name: string;
  email: string;
}

export interface Chip {
  id: number;
  label: string;
  email: string;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [users, setUsers] = useState<dataFormat[]>(data.users);
  const [chips, setChips] = useState<Chip[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [chips]);

  const handleInputValue = (value: string) => {
    setInputValue(value);
  };

  const handleItemClick = (item: dataFormat) => {
    setChips([...chips, { id: item.id, label: item.name, email: item.email }]);
    setUsers(users.filter((user) => user.id !== item.id));
    setInputValue("");
    setIsDropdownVisible(true); //NOTE: set default to "false" if you want to close DropDown after every selection
  };

  const handleInputClick = () => {
    setIsDropdownVisible(true);
  };

  return (
    <div className="App">
      <h1 className="heading">Pick Users</h1>
      <InputField
        value={inputValue}
        onChange={handleInputValue}
        onClickHandler={handleInputClick}
        users={users}
        setUsers={setUsers}
        chips={chips}
        setChip={setChips}
      />
      <DropDown
        items={users}
        inputValue={inputValue}
        onItemClick={handleItemClick}
        isDropdownVisible={isDropdownVisible}
      />
    </div>
  );
};

export default App;
