import { TouchableOpacity } from "react-native";
import LogOutIcon from "../../icons/LogOutIcon";

const LogOutButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LogOutIcon />
    </TouchableOpacity>
  );
};

export default LogOutButton;
