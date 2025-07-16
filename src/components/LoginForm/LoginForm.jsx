import { Field, Form, Formik } from "formik";
import css from "./LoginForm.module.css";
import * as Yup from "yup";
import { BsEyeSlash } from "react-icons/bs";
// import { BsEye } from "react-icons/bs";
{
  /* <BsEye /> */
}

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const applySchema = Yup.object().shape({
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
      <h3 className={css.name}>Log In</h3>
      <p className={css.info}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
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
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
