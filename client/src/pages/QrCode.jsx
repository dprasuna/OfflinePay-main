import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";

const QrCode = () => {
  // const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    getUser();
    // setData(localStorage.getItem("user"));
  }, []);
// console.log(data)
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
      // setData(res.data.user);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error occurred while fetching user data:", error);
      setLoading(false); // Set loading to false even if error occurs
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-10 items-center justify-center ">
          <QRCode
            value={JSON.stringify({ upiId: localStorage.getItem("user"), receiverId: localStorage.getItem("userId") })}
            style={{ width: "200px", height: "200px", marginTop: "100px" }}
          />
          <span className="border border-black p-3 rounded-md bg-white">
            {localStorage.getItem("user")}
          </span>
        </div>
      )}
    </>
  );
};

export default QrCode;
