import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useNotification } from "../../components/notifications/NotificationContext";
import "./ForgotPassword.less";
import EmailInput from "../../components/InputFields/EmailInput/EmailInput";

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const showNotification = useNotification();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/forgot-password", { email });
      navigate("/login");
      showNotification("An email was sent!", "success");
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      // Handle error (show notification, etc.)
      showNotification("Failed to send email", "error");
    }
  };

  return (
    <div className="stilforgot">
      <p className="recoverymessage">Email for password recovery</p>
      <form
        className="stilform"
        action="#"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <EmailInput value={email} handleChange={handleChange} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ForgotPasswordComponent;
