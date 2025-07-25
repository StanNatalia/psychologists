import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import css from "./AppointmentModal.module.css";
import { useEffect } from "react";
import Select from "react-select";
import { components } from "react-select";
import { CustomSelectStyles } from "./CustomSelectStyles";
import { toast } from "react-toastify";

const AppointmentModal = ({ psychologist, onClose }) => {
  const { name, avatar_url } = psychologist;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      tel: "",
      time: "",
      email: "",
      comment: "",
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

  if (!psychologist) return null;

  const onSubmit = (data) => {
    console.log("Submitted:", data);
    toast.success(
      `Hello, ${data.name}! You are booked for a consultation with psychologist ${name} at ${data.time.label}. We are looking forward to seeing you!`
    );
    reset();
    onClose();
    navigate("/");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const options = [
    { value: "", label: "Meeting time", isDisabled: true },
    { value: "09:00", label: "09 : 00" },
    { value: "09:30", label: "09 : 30" },
    { value: "10:00", label: "10 : 00" },
    { value: "10:30", label: "10 : 30" },
    { value: "11:00", label: "11 : 00" },
    { value: "11:30", label: "11 : 30" },
    { value: "12:00", label: "12 : 00" },
    { value: "12:30", label: "12 : 30" },
    { value: "13:00", label: "13 : 00" },
    { value: "13:30", label: "13 : 30" },
    { value: "14:00", label: "14 : 00" },
    { value: "14:30", label: "14 : 30" },
    { value: "15:00", label: "15 : 00" },
    { value: "15:30", label: "15 : 30" },
    { value: "16:00", label: "16 : 00" },
    { value: "16:30", label: "16 : 30" },
  ];

  const customComponents = {
    DropdownIndicator: (props) => (
      <components.DropdownIndicator {...props}>
        <svg width="20" height="20">
          <use href="/public/sprite.svg#icon-favorite" />
        </svg>
      </components.DropdownIndicator>
    ),
    IndicatorSeparator: () => null,
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <button onClick={onClose} className={css.closeBtn}>
          <svg width="32" height="32">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>
        <h4 className={css.title}>Make an appointment with a psychologist</h4>
        <p className={css.info}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>
        <div className={css.psychologistWrapper}>
          <img className={css.img} src={avatar_url} alt={name} />
          <div className={css.psychologist}>
            <p className={css.text}>Your psychologists</p>
            <p className={css.psyName}>{name}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.form}>
            <div className={css.formWrapper}>
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
                  placeholder="Name"
                  className={css.field}
                />
                {errors?.name && (
                  <div className={css.errorMessage}>{errors.name.message}</div>
                )}
              </div>

              <div className={css.numberDateWrapper}>
                <div className={css.inputWrapper}>
                  <input
                    {...register("tel", {
                      required: "this field is required",
                      pattern: {
                        value: /^\+380\d{9}$/,
                        message: "Enter a valid Ukrainian number (+380...)",
                      },
                    })}
                    type="tel"
                    placeholder="+380"
                    className={css.field}
                  />
                  {errors?.tel && (
                    <div className={css.errorMessage}>{errors.tel.message}</div>
                  )}
                </div>
                <div className={css.inputWrapper}>
                  <div className={css.selectWrapper}>
                    <Controller
                      name="time"
                      control={control}
                      rules={{ required: "this field is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}
                          placeholder="00:00"
                          components={customComponents}
                          styles={CustomSelectStyles}
                          menuPosition="absolute"
                        />
                      )}
                    />
                  </div>

                  {errors?.time && (
                    <div className={css.errorMessage}>
                      {errors.time.message}
                    </div>
                  )}
                </div>
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
                  type="email"
                  placeholder="Email"
                  className={css.field}
                />
                {errors?.email && (
                  <div className={css.errorMessage}>{errors.email.message}</div>
                )}
              </div>
              <div className={css.inputWrapper}>
                <textarea
                  {...register("comment", {
                    maxLength: {
                      value: 300,
                      message: "Comment can’t exceed 300 characters",
                    },
                  })}
                  placeholder="Comment"
                  className={`${css.field} ${css.textarea}`}
                />
                {errors?.comment && (
                  <div className={css.errorMessage}>
                    {errors.comment.message}
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className={css.btn}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
