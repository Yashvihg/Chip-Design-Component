import React from "react";
import { RxAvatar } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import "./ContactChip.css";

interface ChipProps {
  label: string;
  onDelete: () => void;
  email: string;
}

const ContactChip: React.FC<ChipProps> = ({ label, onDelete, email }) => {
  return (
    <div className="chip">
      <RxAvatar className="avatar-chip" /> <p>{label}</p>
      <IoClose className="close-button" onClick={onDelete} />
    </div>
  );
};

export default ContactChip;
