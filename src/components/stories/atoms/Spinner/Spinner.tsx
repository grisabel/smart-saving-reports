import styles from "./Spinner.module.scss";

interface SpinnerProps {
  open: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ open }) => {
  return (
    open && (
      <div className={styles.spinnerWp}>
        <div className={styles.loader}></div>
        <div className={styles.backdrop}></div>
      </div>
    )
  );
};

export default Spinner;
