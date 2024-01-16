import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import InputField from "./components/InputField/InputField";
import DropDown from "./components/DropDown/DropDown";
import data from "./ChipData.json";

export interface dataFormat {
  id: number;
  name: string;
  image: string;
  email: string;
}

export interface Chip {
  id: number;
  label: string;
  image: string;
  email: string;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [users, setUsers] = useState<dataFormat[]>(data.users);
  const [chips, setChips] = useState<Chip[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [chipsWidth, setChipsWidth] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [chips]);

  const getSum = (numbers: number[]) => {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
      total += numbers[i];
    }
    return total;
  };

  const getLastThreeElements = (inputArray: number[]) => {
    let result: number[] = [];
    let multiplesToRemove = 0;

    for (let i = 0; i < inputArray.length; i++) {
      result.push(inputArray[i]);

      if ((i + 1) % 3 === 0) {
        multiplesToRemove += 3;
      }

      if (multiplesToRemove > 0) {
        result = result.slice(0, -multiplesToRemove);
        multiplesToRemove = 0;
      }
    }

    return result;
  };

  useEffect(() => {
    const chips = document.querySelectorAll(".chip") as NodeListOf<HTMLElement>;
    const chipWidth: number[] = [];
    chips.forEach((chip) => {
      chipWidth.push(chip.offsetWidth);
    });

    setChipsWidth(getSum(getLastThreeElements(chipWidth)));
  }, [chips]);

  const handleInputValue = (value: string) => {
    setInputValue(value);
  };

  const handleItemClick = (item: dataFormat) => {
    setChips([
      ...chips,
      { id: item.id, label: item.name, image: item.image, email: item.email },
    ]);
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
        marginRight={chipsWidth}
      />
    </div>
  );
};

export default App;
