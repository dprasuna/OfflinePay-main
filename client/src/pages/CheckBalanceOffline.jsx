import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function CheckBalanceOffline() {
  const [balance, setBalance] = useState(null);
  const [pin, setPin] = useState("");
  const [localPin, setLocalPin] = useState(null);
  const [showPinModal, setShowPinModal] = useState(true);
  const [senderId, setSenderId] = useState("");

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
      setLocalPin(res.data.user.pin);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const data = {
    pin: pin,
    senderId: (localStorage.getItem("userId")),
    option: "2",
  };
  console.log(data);
  const encrypt = btoa(JSON.stringify(data));

  const handlePinSubmit = async () => {
    const smsLink = `sms:+919350728474?body=${encrypt}%0A`;
    window.open(smsLink);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Bank Balance</h1>
        {balance !== null ? (
          <div className="text-xl">
            Your current balance: ₹ <span className="font-bold">{balance}</span>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        {/* Pin Modal */}
        {showPinModal && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="modal-content bg-white p-4 rounded-md">
              <label htmlFor="pin">Enter PIN:</label>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="block w-full border border-black rounded-md mt-2"
              />

              <div className="flex flex-col">
                <button
                  onClick={handlePinSubmit}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
