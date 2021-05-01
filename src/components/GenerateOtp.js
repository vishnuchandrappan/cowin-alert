import React, { useState } from "react";
import { api } from "../helpers/api";

export const GenerateOtp = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePhone = (e) => {
    setPhone(e.target.value);
  };

  const requestOTP = () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    api
      .post("/v2/auth/public/generateOTP", {
        mobile: phone,
      })
      .then((response) => {
        console.log("OTP Sent");
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

      <input type="text" value={phone} onChange={updatePhone} />
      <button onClick={requestOTP}>Request OTP</button>
    </div>
  );
};
