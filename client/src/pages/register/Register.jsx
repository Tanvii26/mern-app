import { useRef, useState } from "react";
import "./Register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleRegister = () => {
        const emailValue = emailRef.current?.value;
        if (emailValue) {
            setEmail(emailValue);
            setStep(1);
            setError(null);
        } else {
            setError("Email is required");
        }
    };

    const handleName = () => {
        const usernameValue = usernameRef.current?.value;
        if (usernameValue) {
            setUsername(usernameValue);
            setStep(2);
            setError(null);
        } else {
            setError("Username is required");
        }
    };

    const handleFinish = async (e) => {
        e.preventDefault();
        const passwordValue = passwordRef.current?.value;
        if (passwordValue) {
            setPassword(passwordValue);
            setError(null);

            try {
                await axios.post("/auth/register", { email, username, password: passwordValue });
                navigate("/login");
            } catch (err) {
                if (err.response && err.response.data) {
                    console.log("Validation Error: ", err.response.data);
                    setError(err.response.data.message || "Registration failed");
                } else {
                    console.log("Error: ", err);
                    setError("An unexpected error occurred");
                }
            }
        } else {
            setError("Password is required");
        }
    };

    return (
        <div className='register'>
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    <button className="loginButton" onClick={() => navigate("/login")}>Sign In</button>
                </div>
            </div>

            <div className="container">
                <h1>Unlimited movies, TV shows and more.</h1>
                <h2>Watch anywhere, anytime.</h2>
                <p>Enter your email to join our membership.</p>

                {step === 0 && (
                    <div className="input">
                        <input type="email" placeholder="Email Address" ref={emailRef} />
                        <button className="registerButton" onClick={handleRegister}>Get Started</button>
                    </div>
                )}

                {step === 1 && (
                    <div className="input">
                        <input type="text" placeholder="Username" ref={usernameRef} />
                        <button className="registerButton" onClick={handleName}>Next</button>
                    </div>
                )}

                {step === 2 && (
                    <form className="input" onSubmit={handleFinish}>
                        <input type="password" placeholder="Password" ref={passwordRef} />
                        <button className="registerButton" type="submit">Enter</button>
                    </form>
                )}

                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
};

export default Register;
