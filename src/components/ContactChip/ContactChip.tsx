import React from "react";
import { IoClose } from "react-icons/io5";
import "./ContactChip.css";
import { Chip } from "../../App";

interface ChipProps {
  label: string;
  onDelete: () => void;
  email: string;
  image: string;
  highlightedChip: Chip | null;
  currentChip: Chip;
}

const ContactChip: React.FC<ChipProps> = ({
  label,
  onDelete,
  image,
  highlightedChip,
  currentChip,
}) => {
  return (
    <div
      className={highlightedChip === currentChip ? "highlighted chip" : "chip"}
    >
      {/* <RxAvatar className="avatar-chip" />  */}
      <img src={image} alt={image} className="avatar-chip" />
      <p>{label}</p>
      <IoClose className="close-button" onClick={onDelete} />
    </div>
  );
};

export default ContactChip;
