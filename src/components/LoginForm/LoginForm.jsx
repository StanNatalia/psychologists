import css from "./LoginForm.module.css";
import { PiEyeSlash } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

const LoginForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = ({ email, password }) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const token = await user.getIdToken();
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            id: user.uid,
            token,
          })
        );
        reset();
        onClose();
        navigate("/psychologists");
      })
      .catch((error) => {
        toast.error("Incorrect email or password");
      });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={css.formWrapper}>
      <svg width="32" height="32" onClick={onClose} className={css.closeIcon}>
        <use href="/public/sprite.svg#icon-close" />
      </svg>
      <h3 className={css.name}>Log In</h3>
      <p className={css.info}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form}>
          <div className={css.inputWrapper}>
            <input
              {...register("email", {
                required: "this field is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className={css.field}
              name="email"
              type="email"
              placeholder="Email"
            />
            {errors?.email && (
              <div className={css.errorMessage}>{errors.email.message}</div>
            )}
          </div>
          <div className={css.inputWrapper}>
            <div className={css.inputWithIcon}>
              <input
                {...register("password", {
                  required: "this field is required",
                  minLength: {
                    value: 6,
                    message: "password must be at least 6 characters",
                  },
                })}
                className={css.field}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span onClick={togglePassword} className={css.eye}>
                {showPassword ? (
                  <PiEyeLight size={20} />
                ) : (
                  <PiEyeSlash size={20} />
                )}
              </span>
            </div>
            {errors?.password && (
              <div className={css.errorMessage}>{errors.password.message}</div>
            )}
          </div>
        </div>
        <button type="submit" className={css.btn}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
