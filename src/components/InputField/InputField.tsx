import React, { KeyboardEvent, useState } from "react";
import "./InputField.css";
import ContactChip from "../ContactChip/ContactChip";
import { Chip, dataFormat } from "../../App";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
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

  const handleChipDelete = (chip: Chip) => {
    setChip(chips.filter((c) => c.id !== chip.id));
    setUsers([
      ...users,
      { id: chip.id, name: chip.label, image: chip.image, email: chip.email },
    ]);
    setHighlightedChip(null);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && value === "" && chips.length > 0) {
      e.preventDefault();
      if (highlightedChip) {
        // Delete the highlighted chip on - second Backspace press
        handleChipDelete(highlightedChip);
      } else {
        // Highlight the last chip on - first Backspace press
        const lastChip = chips[chips.length - 1];
        setHighlightedChip(lastChip);
      }
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
          image={chip.image}
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
        placeholder="Add new user..."
      />
    </div>
  );
};

export default InputField;
