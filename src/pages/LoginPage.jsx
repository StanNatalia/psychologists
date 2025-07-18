import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = ({ onClose }) => {
  return (
    <div>
      <LoginForm onClose={onClose} />
    </div>
  );
};

export default LoginPage;
