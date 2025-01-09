import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';

const Transaction = () => {
    const [transactions, setTransactions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await axios.get("https://vihaan007-xxnf.onrender.com/users/getUser", {
                headers: {
                    Authorization: `${localStorage.getItem("userId")}`
                }
            });
            console.log(res.data.user.transactions);
            setTransactions(res.data.user.transactions.reverse());
            setLoading(false); 
        } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false); 
        }
    };

    const renderSkeletonLoader = () => (
        <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-md p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
                {loading ? (
                    
                    renderSkeletonLoader()
                ) : (
                    <ul className="space-y-6">
                        {transactions.map((transaction) => (
                            <li key={transaction._id} className="bg-white shadow-md rounded-md p-2 flex flex-col">
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <div className="text-sm mt-2">{transaction.type === 'Debit' ? 'To' : 'From'}: <span className='font-semibold'>{transaction.upiId}</span></div>
                                    </div>
                                    <div className={`text-sm mt-2 ${transaction.type === 'Debit' ? 'text-red-500' : 'text-green-500'}`}>
                                        {transaction.type === 'Debit' ? '-' : '+'}<span className='font-semibold'>{transaction.amount}</span>
                                    </div>
                                </div>
                                <div className='flex justify-between mt-4 items-center'>
                                    <div className="text-[10px]">Ref No. {transaction.referenceNumber}</div>
                                    <div className="text-sm ">{transaction.date}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Transaction;
