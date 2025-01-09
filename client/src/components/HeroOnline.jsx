import React from 'react';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WifiTetheringOffIcon from '@mui/icons-material/WifiTetheringOff';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TollIcon from '@mui/icons-material/Toll';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="grid grid-cols-3 gap-6 mt-8">
      {/* First Row */}
      <div className="col-span-1 flex flex-col items-center justify-center space-y-3 ">
        {/* Icon 1 */}
        <Link to='/qrscanner'>
        <button className='flex flex-col items-center justify-center bg-[#fdf8f8] shadow-lg rounded-lg pt-4 pb-3 pl-4 pr-4'>
          <QrCodeScannerIcon />
          <span>Scan QR</span>

        </button>
        </Link>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center space-y-2">
        {/* Icon 2 */}
        <Link to='/qr'>
        <button className='flex flex-col items-center justify-center bg-[#fdf8f8]  shadow-lg rounded-lg pt-4 pb-3 pl-3 pr-3'>
          <CurrencyRupeeIcon />
          <span>Receive Money</span>
        </button>
        </Link>
      </div>
      <Link to='/transaction' className="col-span-1 flex flex-col items-center justify-center  space-y-2">
        {/* Icon 3 */}
        <button className='flex flex-col items-center justify-center bg-[#fdf8f8]  shadow-lg rounded-lg pt-4 pb-3'>
          <ReceiptLongIcon />
          <span>Transaction History</span>
        </button>
      </Link>

      {/* Second Row */}
      <Link to='/checkBalance' className="col-span-1 flex flex-col items-center justify-center space-y-2">
        {/* Icon 4 */}
        <button className='flex flex-col items-center justify-center bg-[#fdf8f8] shadow-lg rounded-lg pt-4 pb-3 pl-3 pr-3'>
          <AccountBalanceIcon />
          <span>Check Balance</span>
        </button>
      </Link>
      <Link to='/payUpi' className="col-span-1 flex flex-col items-center justify-center space-y-2">
        {/* Icon 5 */}
        <button className='flex flex-col items-center justify-center bg-[#fdf8f8] shadow-lg rounded-lg pt-4 pb-3 pl-2 pr-2'>
          <TollIcon />
          <span>Pay via UPI</span>
        </button>
      </Link>
      <Link to="/offlinePay" className="col-span-1 flex flex-col items-center justify-center space-y-2">
        {/* Icon 5 */}
        <button className='flex flex-col items-center justify-center bg-[#fdf8f8] shadow-lg rounded-lg pt-4 pb-3 pl-2 pr-2'>
          <WifiTetheringOffIcon />
          <span>Pay Offline</span>
        </button>
      </Link>
    </div>
  );
};

export default Hero;