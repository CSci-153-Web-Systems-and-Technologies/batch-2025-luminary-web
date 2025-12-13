"use client";

import styles from "../styles/mobile-menu.module.css";
import { ModalMode } from "../page";

interface MobileMenuProps {
  isOpen: boolean;
  onOptionClick: (modalMode: ModalMode) => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

interface MobileMenuProps {
  isOpen: boolean;
  onOptionClick: (modalMode: ModalMode) => void;
  menuRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  onOptionClick,
  menuRef,
  onClose,
}: MobileMenuProps) {
  if (!isOpen) return null;

  const handleOptionClick = (modalMode: ModalMode) => {
    onOptionClick(modalMode);
    onClose();
  };

  return (
    <div className={styles["menu-overlay"]} ref={menuRef}>
      <div className={styles["menu-container"]}>
        <div className={styles["menu-header"]}>
          <button className={styles["close-btn"]} onClick={onClose}>
            <img src="cross.svg" alt="Close menu" />
          </button>
        </div>
        <button
          className={styles["menu-item"]}
          onClick={() => handleOptionClick(ModalMode.AddNote)}
        >
          <img src="add-note.svg" alt="Add Note" />
          <span>Add Note</span>
        </button>
        <button
          className={styles["menu-item"]}
          onClick={() => handleOptionClick(ModalMode.AddCollection)}
        >
          <img src="add-collection.svg" alt="Add Collection" />
          <span>Add Collection</span>
        </button>
        <button
          className={styles["menu-item"]}
          onClick={() => handleOptionClick(ModalMode.Options)}
        >
          <img src="kebab-menu.svg" alt="Options" />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
}
