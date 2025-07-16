import { Field, Form, Formik } from "formik";
import css from "./RegistrationForm.module.css";
import * as Yup from "yup";
import { BsEyeSlash } from "react-icons/bs";

const RegistrationForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onlyLetter = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;

  const applySchema = Yup.object().shape({
    name: Yup.string()
      .required("this field is required")
      .min(2, "at list 2 letters")
      .max(20, "maximum 20 letters")
      .matches(onlyLetter, "Only letters"),
    email: Yup.string()
      .required("this field is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("this field is required")
      .min(6, "at least 6 signs"),
  });

  return (
    <div className={css.formWrapper}>
      <svg width="32" height="32" className={css.closeIcon}>
        <use href="/public/sprite.svg#icon-close" />
      </svg>
      <h3 className={css.name}>Registration</h3>
      <p className={css.info}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <Formik
        validationSchema={applySchema}
        initialValues={initialValues}
        className={css.form}
      >
        {() => (
          <Form>
            <div className={css.form}>
              <div className={css.inputWrapper}>
                <Field className={css.field} name="name" placeholder="Name" />
              </div>
              <div className={css.inputWrapper}>
                <Field
                  className={css.field}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className={css.inputWrapper}>
                <Field
                  className={css.field}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <BsEyeSlash size={20} className={css.eye} />
              </div>
            </div>
            <button type="submit" className={css.btn}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
