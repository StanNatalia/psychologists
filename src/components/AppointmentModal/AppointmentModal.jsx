import Modal from "../Modal/Modal";
import css from "./AppointmentModal.module.css";

const AppointmentModal = ({ psychologist, onClose }) => {
  if (!psychologist) return null;
  return (
    <Modal onClose={onClose}>
      <h2>Make an appointment</h2>
      <p>
        With: <strong>{psychologist.name}</strong>
      </p>
      <p>Price: {psychologist.price_per_hour} $</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default AppointmentModal;
