import React, { KeyboardEvent, useState } from "react";
import "./InputField.css";
import ContactChip from "../ContactChip/ContactChip";
import { Chip, dataFormat } from "../../App";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClickHandler: () => void;
  // onBlurHandler: () => void;
  users: dataFormat[];
  setUsers: React.Dispatch<React.SetStateAction<dataFormat[]>>;
  chips: Chip[];
  setChip: React.Dispatch<React.SetStateAction<Chip[]>>;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  onKeyDown,
  onClickHandler,
  users,
  setUsers,
  chips,
  setChip,
}) => {
  const handleChipDelete = (chip: Chip) => {
    console.log(chip);
    setChip(chips.filter((c) => c.id !== chip.id));
    setUsers([...users, { id: chip.id, name: chip.label, email: chip.email }]);
  };

  return (
    <div className="input-container">
      {chips.map((chip) => (
        <ContactChip
          key={chip.id}
          label={chip.label}
          onDelete={() => handleChipDelete(chip)}
          email=""
        />
      ))}
      <input
        className="input-field"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onClick={onClickHandler}
        placeholder="Type to filter items"
      />
    </div>
  );
};

export default InputField;
