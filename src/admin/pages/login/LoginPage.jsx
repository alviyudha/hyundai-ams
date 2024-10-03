import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginInput from "../../components/LoginInput";
import { asyncSetAuthUser } from "../../../states/login/action";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = async ({ username, password }) => {
    try {
      await dispatch(asyncSetAuthUser({ username, password }));
      navigate("/admin-hyundai/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Login</h1>
      </header>

      <article className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center"><span className="text-hyundai">Hyundai Admin Panel</span> <br />
          <span className="text-[#db2323]">PT Auto Maju Sentosa</span>
        </h2>

        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}

        <LoginInput login={onLogin} />

        <p className="text-gray-600 mt-4 text-center">
          Visit our official website{" "}
          <a
            href="https://hyundai-ams.co.id"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-hyundai font-bold ">Dealer Hyundai</span> <span className="text-[#db2323]">AMS</span>
          </a>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
