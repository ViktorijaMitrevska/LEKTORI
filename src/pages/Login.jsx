import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/menu-admin"); // Correct redirect
    } catch (error) {
      alert("Wrong email or password!");
    }
  };

  return (
    <section >
      <div className=" container " style={{minHeight: "70.5vh"}}>
        <div className="row d-flex align-items-center justify-content-center " style={{ marginTop: "200px", marginBottom: "50px"}}>

          <div className="col-md-8 col-lg-6 col-xl-6">
            <img
              src="https://i.pinimg.com/736x/3a/80/1c/3a801c6f4af3e7d81f52a57373513e0f.jpg"
              className="img-fluid"
              alt="Phone"
            />
          </div>

          <div className="col-md-10 col-lg-6 col-xl-6 ">

            <div className="forma p-4 p-md-5 shadow rounded">
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Корисничко име"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-outline mb-4">
                <input
                  placeholder="Лозинка"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg"
                />
              </div>

              <button
                className="btn btn-primary btn-lg btn-block w-100 login-btn"
                onClick={login}
                style={{
                  backgroundColor: isHover ? "#8a0a0a" : "#640202",
                }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                Најави се 
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
}

export default Login;
