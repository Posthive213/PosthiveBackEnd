import React, { useContext, useEffect, useState } from "react";
import Context from "./Mainstate/Context";
import { useGoogleLogin } from "@react-oauth/google";
import emailjs from "@emailjs/browser";
export default function UACDialog(props) {
  const context = useContext(Context);
  const {
    signup,
    error,
    Otp,
    signin,
    authtoken,
    verifyOtp,
    seterror,
    allposts,
    staffPicks,
    userData,
  } = context;

  const [Auth, setAuth] = useState("Sign up");
  const [email, setemail] = useState(false);
  const [OtpPage, setOtpPage] = useState(false);
  const [emailValue, setemailValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");
  const [nameValue, setnameValue] = useState("");
  const [otpValue, setotpValue] = useState("");
  const [error1, seterror1] = useState("");
  const [error2, seterror2] = useState("");
  const [error3, seterror3] = useState("");
  const [error4, seterror4] = useState("");
  const [gError, setgError] = useState("");

  const siginFunc = () => {
    Auth === "Sign up" ? setAuth("Sign in") : setAuth("Sign up");
    setgError("");
    setgError("");
  };
  const handleEmail = () => {
    setemail(!email);
    setemailValue("");
    setpasswordValue("");
    setnameValue("");
  };
  const crossFunc = () => {
    props.func();
    setAuth("Sign up");
    setemail(false);
    seterror("");
    setOtpPage(false);
  };
  const setValue = (e) => {
    if (e.target.className === "email") {
      setemailValue(e.target.value);
      seterror1("");
    }
    if (e.target.className === "name") {
      setnameValue(e.target.value);

      seterror2("");
    }
    if (e.target.className === "password") {
      setpasswordValue(e.target.value);
      seterror3("");
    }
    if (e.target.className === "Otp") {
      setotpValue(e.target.value);
      seterror4("");
    }
  };
  const handleSign = () => {
    if (emailValue === "") {
      seterror1("Enter valid email");
    }
    if (nameValue === "") {
      seterror2("Enter valid name");
    }
    if (passwordValue === "") {
      seterror3("Enter valid password");
    }

    if (Auth === "Sign in") {
      console.log(Auth);
      if (emailValue !== "" && passwordValue !== "") {
        signin(emailValue, passwordValue);
      }
    } else if (Auth === "Sign up") {
      if (emailValue !== "" && passwordValue !== "" && nameValue !== "") {
        signup(emailValue, nameValue, passwordValue);
      }
    }
  };

  const Otpverify = () => {
    if (Otp === otpValue) {
      verifyOtp(emailValue);
    } else {
      seterror4("Wrong otp");
    }
  };
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const data = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "Get",
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
            },
          }
        );
        const parsedData = await data.json();
        if (Auth === "Sign up") {
          signup(
            parsedData.email,
            parsedData.name,
            "GoogleAccountActivated123654",
            true,
            parsedData.picture
          );
        } else {
          signin(parsedData.email, "GoogleAccountActivated123654");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    if (error === "User already exsist with this email") {
      if (email) {
        seterror1(error);
      } else {
        setgError("⚠️" + error);
      }
    } else if (error === "Enter valid email") {
      if (email) {
        seterror1(error);
      } else {
        setgError("⚠️" + "User don't exsist with this email");
      }
    } else if (error === "Enter valid password") {
      seterror3(error);
    } else if (error) {
      for (let i = 0; i < error.length; i++) {
        if (error[i].path === "email") {
          seterror1(error[i].msg);
        }
        if (error[i].path === "password") {
          seterror3(error[i].msg);
        }
        if (error[i].path === "name") {
          seterror2(error[i].msg);
        }
      }
    }
  }, [error]);
  useEffect(() => {
    if (Otp) {
      setOtpPage(true);
      const templateParams = {
        to_name: emailValue.current.value,
        user_email: emailValue.current.value,
        message: `Your otp code is ${Otp}`,
        from_name: "Post Hive",
      };
      emailjs
        .send(
          "service_op5mypk",
          "template_pslst65",
          templateParams,
          "fsNlf011wAWaX2zIF"
        )
        .then(() => {})
        .catch((error) => {});
    }
  }, [Otp]);
  useEffect(() => {
    if (authtoken) {
      allposts();
      staffPicks();
      userData();
      props.opnerCloser();
    }
  }, [authtoken]);

  return (
    <div className="UacMain">
      <div className="Uac up-animate-in">
        <svg
          onClick={crossFunc}
          className="cr-btn"
          width="29"
          height="29"
          fill="#6b6b6b"
        >
          <path
            d="M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62"
            fill-rule="evenodd"
          ></path>
        </svg>
        {!email ? (
          <>
            <h1>Join Posthive.</h1>
            <div className="middleAuth">
              <div className="autnBtns">
                <div onClick={login} className="signbtn">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ah"
                  >
                    <g fill-rule="evenodd" clip-rule="evenodd">
                      <path
                        d="M20.64 12.2c0-.63-.06-1.25-.16-1.84H12v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92a8.78 8.78 0 0 0 2.68-6.61z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M12 21a8.6 8.6 0 0 0 5.96-2.18l-2.91-2.26a5.41 5.41 0 0 1-8.09-2.85h-3v2.33A9 9 0 0 0 12 21z"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M6.96 13.71a5.41 5.41 0 0 1 0-3.42V7.96h-3a9 9 0 0 0 0 8.08l3-2.33z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M12 6.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 3.96 7.96l3 2.33A5.36 5.36 0 0 1 12 6.6z"
                        fill="#EA4335"
                      ></path>
                    </g>
                  </svg>
                  <p>{Auth} with Google</p>
                </div>
                <p className="error">{gError}</p>
                <div className="signbtn" onClick={handleEmail}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ah"
                  >
                    <g stroke="#242424">
                      <rect
                        x="3.5"
                        y="5.5"
                        width="17"
                        height="13"
                        rx="1"
                      ></rect>
                      <path
                        d="M3.5 8l8.5 6 8.5-6"
                        stroke-linecap="round"
                      ></path>
                    </g>
                  </svg>
                  <p>{Auth} with Email</p>
                </div>
              </div>
              {Auth === "Sign up" ? (
                <p>
                  Already have an account?{" "}
                  <span onClick={siginFunc}>Sign in</span>
                </p>
              ) : (
                <p>
                  No Account? <span onClick={siginFunc}>Create one</span>
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h1>{Auth} with Email</h1>

            <div className="EmailmiddleAuth">
              {OtpPage ? (
                <>
                  <div>
                    <span>Enter otp sent to the provided email</span>
                    <input
                      onChange={setValue}
                      className="Otp"
                      type="number"
                    ></input>
                    <p className="error">{error4}</p>
                  </div>
                  <button className="f-btn btn-2" onClick={Otpverify}>
                    Continue
                  </button>
                </>
              ) : (
                <>
                  {Auth === "Sign up" && (
                    <div>
                      <span>Your Name</span>
                      <input
                        onChange={setValue}
                        className="name"
                        type="text"
                      ></input>
                      <p className="error">{error2}</p>
                    </div>
                  )}
                  <div>
                    <span>Your Email</span>
                    <input
                      onChange={setValue}
                      className="email"
                      type="email"
                    ></input>
                    <p className="error">{error1}</p>
                  </div>
                  <div>
                    <span>Your Password</span>
                    <input
                      onChange={setValue}
                      className="password"
                      type="password"
                    ></input>
                    <p className="error">{error3}</p>
                  </div>
                  <button className="f-btn btn-2" onClick={handleSign}>
                    Continue
                  </button>
                </>
              )}
            </div>
            <p
              className="otheropts"
              onClick={() => {
                setOtpPage(false);

                handleEmail();
              }}
            >
              &lt; All {Auth.toLowerCase()} options
            </p>
          </>
        )}

        <div className="bottomAuth">
          <p>
            Click “Sign up” to agree to Medium’s Terms of Service and
            acknowledge that Medium’s Privacy Policy applies to you.
          </p>
        </div>
      </div>
    </div>
  );
}
