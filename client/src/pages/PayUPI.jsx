import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PayUPI = () => {
  const [showReceiverModal, setShowReceiverModal] = useState(true);
  const [showAmountModal, setShowAmountModal] = useState(false); // New state for amount modal
  const [showPinModal, setShowPinModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    senderId: "",
    receiverUpi: "",
    amount: "",
    pin: "",
  });
  const navigate = useNavigate();

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
      console.log(res.data.user);
      setPaymentData((prevData) => ({
        ...prevData,
        senderId: res.data.user._id,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleReceiverModalClose = () => {
    setShowReceiverModal(false);
    setShowAmountModal(true); // Show amount modal after receiver modal is closed
  };

  const handleAmountSubmit = () => {
    setShowAmountModal(false);
    setShowPinModal(true); // Show PIN modal after amount modal is submitted
  };

  const handlePinSubmit = () => {
    console.log("Payment Data:", paymentData);
    const pay = async () => {
      try {
        const res = await axios.post(
          "https://vihaan007-xxnf.onrender.com/users/sendMoney",
          paymentData
        );
        console.log("Payment Response:", res.data);
        alert("Payment Successful!");
        navigate("/");
      } catch (error) {
        console.error("Error making payment:", error);
        alert("Payment Failed!");
      }
    };
    pay();
    setShowPinModal(false);
  };

  return (
    <>
      {showReceiverModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-white p-4 rounded-md">
            <span
              className="absolute top-0 right-0 cursor-pointer"
              onClick={handleReceiverModalClose}
            >
              &times;
            </span>
            <label htmlFor="receiverUpi">Enter Receiver's UPI ID:</label>
            <input
              type="text"
              id="receiverUpi"
              value={paymentData.receiverUpi}
              onChange={(e) =>
                setPaymentData((prevData) => ({
                  ...prevData,
                  receiverUpi: e.target.value,
                }))
              }
              className="block w-full border-gray-300 rounded-md px-2 py-1 mb-2"
            />
            <button
              onClick={handleReceiverModalClose}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {showAmountModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-white p-4 rounded-md">
            <span
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => setShowAmountModal(false)}
            >
              &times;
            </span>
            <label htmlFor="amount">Enter Amount:</label>
            <input
              type="number"
              id="amount"
              value={paymentData.amount}
              onChange={(e) =>
                setPaymentData((prevData) => ({
                  ...prevData,
                  amount: e.target.value,
                }))
              }
              className="block w-full border-gray-300 rounded-md px-2 py-1 mb-2"
            />
            <button
              onClick={handleAmountSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {showPinModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-white p-4 rounded-md">
            <span
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => setShowPinModal(false)}
            >
              &times;
            </span>
            <label htmlFor="pin">Enter PIN:</label>
            <input
              type="password"
              id="pin"
              value={paymentData.pin}
              onChange={(e) =>
                setPaymentData((prevData) => ({
                  ...prevData,
                  pin: e.target.value,
                }))
              }
              className="block w-full border-gray-300 rounded-md px-2 py-1 mb-2"
            />
            <button
              onClick={handlePinSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Pay
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PayUPI;
