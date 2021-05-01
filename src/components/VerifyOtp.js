import React, { useState } from "react";
import { api } from "../helpers/api";

export const VerifyOtp = ({ txnId }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateOtp = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    api
      .post("/v2/auth/public/confirmOTP", {
        otp,
        txnId,
      })
      .then((response) => {
        console.log("OTP verified");
        setError(response.data);
      })
      .catch((error) => {
        console.log("error in sending otp", error);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {error && <div>{JSON.stringify(error)}</div>}

      <input type="number" value={otp} onChange={updateOtp} />
      <button onClick={verifyOtp}>Verify OTP</button>
    </div>
  );
};
