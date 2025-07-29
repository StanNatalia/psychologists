import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSelectors";

export function useAuth() {
  const { email, token, id } = useSelector(selectUser);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}
