import RegistrationForm from "../components/RegistrationForm/RegistrationForm";

const RegistrationPage = ({ onClose }) => {
  return (
    <div>
      <RegistrationForm onClose={onClose} />
    </div>
  );
};

export default RegistrationPage;
