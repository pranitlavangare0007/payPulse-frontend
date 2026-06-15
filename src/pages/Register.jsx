import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api';
import "../styles/registration.css";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role] = useState("CUSTOMER");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setotp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);


  const handleOtpVerification = async (event) => {
    event.preventDefault();
    try {
     
      await api.post(`verify-otp?email=${email}&otp=${otp}`);
      setOtpVerified(true);
      alert("Email verified");
    }
    catch (err) {
      
      console.log(err)
    }
  };

  const handelEmailVerification = async (event) => {
    event.preventDefault();
    try {
      // await api.post(`/send-otp/${email}`)
        const response = await api.post(`send-otp?email=${email}`);
      setOtpSent(true)
      setTimer(30);
      setOtpVerified(false);
      alert(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const response = await api.post("/register", { username, password, name, email, address, phoneNumber, role });
      if (response.status == 200) {
        alert("Registration successful");
        navigate("/login");
      }

    } catch (err) {
      alert("User already exists")
      console.log("User already exists", err);
    }
  };

  return (
    <div className="register-page">

      <div className="register-container">

        <div className="register-header">
          <h1>Open Your PayPulse Account</h1>
          <p>Create a secure digital banking profile</p>
        </div>

        <form className="register-form" onSubmit={handelEmailVerification}>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              onChange={e => setEmail(e.target.value)}
              required
              disabled={otpSent}
            />
            <button className="" disabled={timer > 0}>
              {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}
            </button>
          </div>
        </form>

        <form className="register-form" onSubmit={handleOtpVerification}>

          <div className="form-group">
            <label>OTP</label>
            <input
              type="text"
              onChange={e => setotp(e.target.value)}
              required
            />
            <button className="" disabled={!otpSent}>
              verify otp
            </button>
          </div>
        </form>

        <form className="register-form" onSubmit={handleRegister}>

          {/* ACCOUNT CREDENTIALS */}
          <div className="form-section">
            <h3>Login Credentials</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Username</label>
                <input

                  type="text"
                  onChange={e => setUsername(e.target.value)}
                  required
                  disabled={!otpVerified}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  required
                  disabled={!otpVerified}
                />
              </div>
            </div>
          </div>

          {/* PERSONAL DETAILS */}
          <div className="form-section">
            <h3>Personal Information</h3>

            <div className="form-grid">
              <div className="form-group full">
                <label>Full Name</label>
                <input
                  type="text"
                  onChange={e => setName(e.target.value)}
                  required
                  disabled={!otpVerified}
                />
              </div>



              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  onChange={e => setPhoneNumber(e.target.value)}
                  required
                  disabled={!otpVerified}
                />
              </div>

              <div className="form-group full">
                <label>Residential Address</label>
                <input
                  type="text"
                  onChange={e => setAddress(e.target.value)}
                  required
                  disabled={!otpVerified}
                />
              </div>
            </div>
          </div>

          <button className="register-btn" disabled={!otpVerified}>Create Bank Account</button>

          <p className="register-footer">
            Already registered?
            <span onClick={() => navigate("/login")}>
              Login here
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}
