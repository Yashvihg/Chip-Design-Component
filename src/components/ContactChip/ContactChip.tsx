import React from "react";
import { RxAvatar } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import "./ContactChip.css";
import { Chip } from "../../App";

interface ChipProps {
  label: string;
  onDelete: () => void;
  email: string;
  highlightedChip: Chip | null;
  currentChip: Chip;
}

const ContactChip: React.FC<ChipProps> = ({
  label,
  onDelete,
  email,
  highlightedChip,
  currentChip,
}) => {
  return (
    <div
      className={highlightedChip === currentChip ? "highlighted chip" : "chip"}
    >
      <RxAvatar className="avatar-chip" /> <p>{label}</p>
      <IoClose className="close-button" onClick={onDelete} />
    </div>
  );
};

export default ContactChip;
