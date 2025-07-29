import { Link } from "react-router-dom";
import css from "./NotFound.module.css";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div>
      <div className={css.container}>
        <motion.h4
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={css.title}
        >
          404
        </motion.h4>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={css.message}
        >
          Oops! The page you are looking for does not exist.
        </motion.p>

        <Link to="/" className={css.homeLink}>
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
