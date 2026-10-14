import { useState, useContext, lazy, Suspense } from "react";
import AuthContext from "./AuthContext";

const Profile = lazy(() => import("./Profile"));

function Home() {
  const { login } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={login}>Login</button>

      <button onClick={() => setShow(!show)}>
        Show Users
      </button>

      {show && (
        <Suspense fallback={<p>Loading...</p>}>
          <Profile />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login: () => setIsLoggedIn(true) }}
    >
      <h1>{isLoggedIn ? "Welcome!" : "Please Login"}</h1>
      <Home />
    </AuthContext.Provider>
  );
}

export default App;