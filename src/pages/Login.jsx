import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { loginUser, registerUser } from "../redux/userSlice";

export default function Login() {
  const location = useLocation();
  const user = useSelector(state => state.user);
  const [userName, setUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [newUsername, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showLoginError, setShowLoginError] = useState(false);
  const [showRegisterError, setShowRegisterError] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false)
  const prevLocation = new URLSearchParams(location.search).get("redirectTo");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //allow login only if already registered and correct user and password are entered
  function handleLogin(e) {
    e.preventDefault();
    if (user.isRegistered && userName === user.userName && loginPassword === user.password) {
      dispatch(loginUser());
      setSuccessfulLogin(true);
      setTimeout(() => navigate(prevLocation), 2000);
    } else setShowLoginError(true);
  }

  //allow to register only if not already registered
  function handleRegister(e) {
    e.preventDefault();
    if (newPassword === passwordConfirm && newPassword !== "" && newUsername !== "" && !user.isRegistered) {
      dispatch(registerUser({ userName: newUsername, password: newPassword }));
      dispatch(loginUser());
      setSuccessfulLogin(true);
      setTimeout(() => navigate(prevLocation), 2000);
    } else setShowRegisterError(true);
  }

  function handleUserNameChange(e) {
    setShowLoginError(false);
    setUserName(e.target.value);
  }

  function handleLoginPasswordChange(e) {
    setShowLoginError(false);
    setLoginPassword(e.target.value);
  }

  function handleNewUsernameChange(e) {
    setShowRegisterError(false);
    setNewUserName(e.target.value);
  }

  function handleNewPasswordChange(e) {
    setShowRegisterError(false);
    setNewPassword(e.target.value);
  }

  function handlePasswordConfirm(e) {
    setShowRegisterError(false);
    setPasswordConfirm(e.target.value);
  }


  return (
    <main className="flex flex-col items-center">
      {successfulLogin &&
        <div>
          <h1 className="text-2xl">Succesful Login!</h1>
          <h2>Wait to be redirected to your previous page...</h2>
        </div>
      }
      <form className="w-4/5 md:w-1/2 flex flex-col items-center border-2 rounded-xl gap-4 p-5 my-4" onSubmit={handleLogin}>
        {showLoginError && !user.isRegistered &&
          <h1>Yout first need to register.</h1>
        }
        {showLoginError && user.isRegistered &&
          <h1>Wrong Username or Password.</h1>
        }
        <input type="text" placeholder="Username" value={userName} onChange={handleUserNameChange} className={`w-2/3 border-2 rounded-lg p-1 ${showLoginError && "border-red-500"}`} />
        <input type="text" placeholder="Password" value={loginPassword} onChange={handleLoginPasswordChange} className={`w-2/3 border-2 rounded-lg p-1 ${showLoginError && "border-red-500"}`} />
        <button className="w-1/4 bg-blue-100 rounded-lg p-1 font-semibold">
          Login
        </button>
      </form>
      <h1 className="mb-4">Or Register</h1>
      <form className="w-4/5 md:w-1/2 flex flex-col items-center border-2 rounded-xl gap-4 p-5 mb-4" onSubmit={handleRegister}>
        {showRegisterError && !user.isRegistered &&
          <h1>Please enter Username and matching Passwords.</h1>
        }
        {showRegisterError && user.isRegistered &&
          <h1>You are already registered.</h1>
        }
        <input type="text" placeholder="Username" value={newUsername} onChange={handleNewUsernameChange} className={`w-2/3 border-2 rounded-lg p-1 ${showRegisterError && "border-red-500"}`} />
        <input type="text" placeholder="Password" value={newPassword} onChange={handleNewPasswordChange} className={`w-2/3 border-2 rounded-lg p-1 ${showRegisterError && "border-red-500"}`} />
        <input type="text" placeholder="Confirm Password" value={passwordConfirm} onChange={handlePasswordConfirm} className={`w-2/3 border-2 rounded-lg p-1 ${showRegisterError && "border-red-500"}`} />
        <button className="w-1/4 bg-blue-100 rounded-lg p-1 font-semibold">
          Register
        </button>
      </form>
    </main>
  )
}