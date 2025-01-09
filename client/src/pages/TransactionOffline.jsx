import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const TransactionOffline = () => {
  const [senderId, setSenderId] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(
        "https://vihaan007-xxnf.onrender.com/users/getUser",
        {
          headers: {
            Authorization: `${localStorage.getItem("userId")}`,
          },
        }
      );
      // setSenderId(res.data.user._id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const data = {
    senderId: (localStorage.getItem("userId")),
    option: "3",
  };
  const encrypt = btoa(JSON.stringify(data));

  const handleSubmit = async () => {

    const smsLink = `sms:+919350728474?body=${encrypt}%0A`;
    window.open(smsLink);
  };

  return (
    <button
      onClick={handleSubmit}
      className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      Get last 5 transactions details on SMS
    </button>
  );
};

export default TransactionOffline;
