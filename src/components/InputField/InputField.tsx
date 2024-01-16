import React, { KeyboardEvent, useState } from "react";
import "./InputField.css";
import ContactChip from "../ContactChip/ContactChip";
import { Chip, dataFormat } from "../../App";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  // onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClickHandler: () => void;
  users: dataFormat[];
  setUsers: React.Dispatch<React.SetStateAction<dataFormat[]>>;
  chips: Chip[];
  setChip: React.Dispatch<React.SetStateAction<Chip[]>>;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  onClickHandler,
  users,
  setUsers,
  chips,
  setChip,
}) => {
  const [highlightedChip, setHighlightedChip] = useState<Chip | null>(null);
  // const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  const handleChipDelete = (chip: Chip) => {
    console.log("DELETE button", chip);
    setChip(chips.filter((c) => c.id !== chip.id));
    setUsers([...users, { id: chip.id, name: chip.label, email: chip.email }]);
    setHighlightedChip(null);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && value === "" && chips.length > 0) {
      // const lastChip = chips[chips.length - 1];
      e.preventDefault();
      if (highlightedChip) {
        // Delete the highlighted chip on the second Backspace press
        handleChipDelete(highlightedChip);
      } else {
        // Highlight the last chip on the first Backspace press
        const lastChip = chips[chips.length - 1];
        console.log("Highlight:", lastChip);
        setHighlightedChip(lastChip);
        // setIsHighlighted(true);
      }
      // setChip(chips.slice(0, -1));
      // setUsers([
      //   ...users,
      //   { id: lastChip.id, name: lastChip.label, email: lastChip.email },
      // ]);
    }
  };

  return (
    <div className="input-container">
      {chips.map((chip) => (
        <ContactChip
          key={chip.id}
          label={chip.label}
          onDelete={() => handleChipDelete(chip)}
          email=""
          highlightedChip={highlightedChip}
          currentChip={chip}
        />
      ))}
      <input
        className="input-field"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleInputKeyDown}
        onClick={onClickHandler}
        placeholder="Type to filter items"
      />
    </div>
  );
};

export default InputField;
