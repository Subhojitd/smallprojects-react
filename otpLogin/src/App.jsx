import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import "./App.css";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import { Toaster, toast } from "react-hot-toast";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
function App() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignUp();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  const onSignUp = () => {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        toast.success("Otp sent successfully !");
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          {user ? (
            <div className="flex items-center justify-center h-screen bg-slate-950">
              <h2 className="text-2xl text-white">
                Logged In successfully ✅!
              </h2>
            </div>
          ) : (
            <div className="w-96  flex-col flex items-center justify-center  gap-4 rounded-lg p-4 border-2 border-white">
              <h1 className=" font-semibold text-3xl text-white text-center">
                OTP - LOGIN PROJECT
              </h1>

              {showOtp ? (
                <>
                  <label
                    htmlFor="ph"
                    className="text-center text-white text-xl"
                  >
                    Enter the otp sent to 7872732198
                  </label>

                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="otp-container"
                  ></OtpInput>

                  <button
                    onClick={onOTPVerify}
                    className="bg-orange-600 w-full flex gap-2 items-center justify-center py-2.5 text-white rounded-lg  font-medium font-serif text-xl tracking-widest"
                  >
                    {loading && (
                      <CgSpinner size={25} className="mt-1 animate-spin" />
                    )}
                    <span>Verify OTP</span>
                  </button>
                </>
              ) : (
                <>
                  <label htmlFor="" className="text-center text-white text-xl">
                    Verify your mobile number 📞
                  </label>

                  <div>
                    <PhoneInput country={"in"} value={ph} onChange={setPh} />
                  </div>

                  <button
                    onClick={onSignUp}
                    className="bg-orange-600 w-full flex gap-2 items-center justify-center py-2 text-white rounded-lg  font-medium font-serif text-xl tracking-widest"
                  >
                    {loading && (
                      <CgSpinner size={25} className="mt-1 animate-spin" />
                    )}
                    <span>Send code via SMS</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
