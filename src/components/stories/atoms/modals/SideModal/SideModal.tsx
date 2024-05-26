import { SideModalProps } from "./SideModal.types";

import styles from "./SideModal.module.scss";
import Icon from "../../Icon";

const SideModal: React.FC<SideModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleBackdrop = () => {
    onClose();
  };

  return open ? (
    <div className={styles.modalWp}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
          <span className={styles.header__icon}>
            <Icon name="cross-big" onClick={handleClose} />
          </span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <div className={styles.backdrop} onClick={handleBackdrop}></div>
    </div>
  ) : null;
};

export default SideModal;
