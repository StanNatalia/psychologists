import css from "./RegistrationForm.module.css";
import { PiEyeSlash } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const RegistrationForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={css.formWrapper}>
      <svg width="32" height="32" className={css.closeIcon} onClick={onClose}>
        <use href="/public/sprite.svg#icon-close" />
      </svg>
      <h3 className={css.name}>Registration</h3>
      <p className={css.info}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form}>
          <div className={css.inputWrapper}>
            <input
              {...register("name", {
                required: "this field is required",
                pattern: {
                  value: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
                  message: "only letters",
                },
                maxLength: {
                  value: 25,
                  message: "name can contain no more than 25 characters",
                },
                minLength: {
                  value: 2,
                  message: "name must be at least 2 characters",
                },
              })}
              type="text"
              className={css.field}
              name="name"
              placeholder="Name"
            />
            {errors?.name && (
              <div className={css.errorMessage}>{errors.name.message}</div>
            )}
          </div>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
