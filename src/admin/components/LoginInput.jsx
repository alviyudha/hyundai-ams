import PropTypes from "prop-types";
import useInput from "../../hooks/useInput";

function LoginInput({ login }) {
  const [username, onUsernameChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  return (
    <form className="flex flex-col space-y-4">
      <input
        type="username"
        value={username}
        onChange={onUsernameChange}
        placeholder="username"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={() => login({ username, password })}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-hyundai transition-all duration-300"
      >
        Login
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
