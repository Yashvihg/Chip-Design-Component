import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import DropDown from "./components/DropDown/DropDown";
import data from "./ChipData.json";
import ContactChip from "./components/ContactChip/ContactChip";

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
  // const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  // const users = data.users;

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

  // const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
  //     const lastChip = chips[chips.length - 1];

  //     setChips(chips.slice(0, -1));
  //     setUsers([
  //       ...users,
  //       { id: lastChip.id, name: lastChip.label, email: lastChip.email },
  //     ]);
  //   }
  // };

  // const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
  //     const lastChip = chips[chips.length - 1];
  //     console.log("Highlight:", lastChip);
  //     second backspace??
  //     // setChip(chips.slice(0, -1));
  //   } else if (inputValue === "" && chips.length === 0) {
  //   }
  // };

  const handleItemClick = (item: dataFormat) => {
    console.log(item);
    setChips([...chips, { id: item.id, label: item.name, email: item.email }]);
    setUsers(users.filter((user) => user.id !== item.id));
    setInputValue("");
    setIsDropdownVisible(true); //NOTE: set default to "false" if you want to close DropDown after every selection
  };

  const handleInputClick = () => {
    setIsDropdownVisible(true);
  };

  // const handleInputBlur = () => {
  //   setIsDropdownVisible(false);
  // };
  // onKeyDown={handleInputKeyDown}
  return (
    <div className="App">
      <InputField
        value={inputValue}
        onChange={handleInputValue}
        onClickHandler={handleInputClick}
        users={users}
        setUsers={setUsers}
        chips={chips}
        setChip={setChips}
      />
      {/* <div style={{ display: isDropdownVisible ? "block" : "none" }}> */}
      <DropDown
        items={users}
        inputValue={inputValue}
        onItemClick={handleItemClick}
        isDropdownVisible={isDropdownVisible}
      />
      {/* </div> */}
      {/* <div className="chips-container">
        {chips.map((chip) => (
          <ContactChip
            key={chip.id}
            label={chip.label}
            onDelete={() => handleChipDelete(chip)}
            email=""
          />
        ))}
      </div> */}
    </div>
  );
};

export default App;

// onBlurHandler={handleInputBlur}
