import { QRCodeSVG } from "qrcode.react";
import "./App.css";

function App() {
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 ">
        <div className="w-[700px] h-[300px]  rounded-3xl bg-blue-300 flex items-center justify-center gap-10">
          <div className="flex flex-col gap-3">
            <QRCodeSVG value="https://github.com/Subhojitd" size={170} />
            <p className="text-center text-slate-900 font-mono font-semibold text-2xl">
              Github QR
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <QRCodeSVG
              value="https://www.linkedin.com/in/subhajit-das-152907244/"
              size={170}
            />
            <p className="text-center text-slate-900 font-mono font-semibold text-2xl">
              LinkedIn QR
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <QRCodeSVG value="https://twitter.com/subhajit_2k1" size={170} />
            <p className="text-center text-slate-900 font-mono font-semibold text-2xl">
              Twitter QR
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
