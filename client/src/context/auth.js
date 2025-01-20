import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const authContext = createContext()

export function AuthProvider({ children }) {
    const getToken = localStorage.getItem("token")

    const decode = jwtDecode(getToken)
    const userId = decode.userId

    const [account, setAccount] = useState(null); // Initialize as null to handle empty state
    const [error, setError] = useState(null);
    const [accountId, setAccountId] = useState("");
    const [transactionData, setTransactionData] = useState([]);

    const [totalMoneyIn, setTotalMoneyIn] = useState(0);
    const [totalMoneyOut, setTotalMoneyOut] = useState(0);

    const [moneyInTransactions, setMoneyInTransactions] = useState(0)

    const [moneyOutTransactions, setMoneyOutTransactions] = useState(0)

    const [allUser, setAllUser] = useState([])

    const [allTransaction, setAllTransaction] = useState([])


    const Accounts = async (userId) => {
        try {
            // Pass userId as a query parameter
            const response = await axios.get(`https://bank-application-backend.onrender.com/PaySa/Account/getByUserId`, {
                params: { userId },
            });

            setAccount(response.data);
            setAccountId(response.data._id)
            console.log(response.data._id)
            // Update state with the account data
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError("No account found for this user.");
            } else {
                setError("Failed to fetch account data.");
            }
            console.error("Error fetching account:", err.message);
            setAccount(null); // Clear the account state if there's an error
        }


    }



    const fetchAccountDataTransaction = async (accountId) => {
        if (!accountId) return;
        try {
            setError(""); // Clear previous errors
            const response = await axios.get(
                `https://bank-application-backend.onrender.com/PaySa/Transaction/getTransactionsForAccount?accountId=${accountId}`
            );
            setTransactionData(response.data.transactions);

            // Store response data
        } catch (err) {
            setTransactionData(null);
            setError(err.response?.data?.message || "Error fetching account details");
        }
    };



    async function fetchTransactionSummary(accountId) {
        try {
            const response = await axios.get(`https://bank-application-backend.onrender.com/PaySa/Transaction/getTransactionSummary?accountId=${accountId}`);
            if (response.status === 200) {
                setTotalMoneyIn(response.data.totalMoneyIn);

                setTotalMoneyOut(response.data.totalMoneyOut);

                setMoneyOutTransactions(response.data.moneyOutTransactions)
                setMoneyInTransactions(response.data.moneyInTransactions)

            } else {
                console.error('Error fetching transaction summary:', response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }


    async function AllUsers() {
        try {
            const response = await axios.get("https://bank-application-backend.onrender.com/PaySa/User/allUser")

            setAllUser(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function AllTransaction() {
        try {
            const response = await axios.get("https://bank-application-backend.onrender.com/PaySa/Transaction/allTransaction")
            setAllTransaction(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }






    useEffect(() => {
        Accounts(userId)
        fetchAccountDataTransaction(accountId)
        fetchTransactionSummary(accountId)
        AllUsers()
        AllTransaction()
    }, [userId, accountId]);





    return (
        <authContext.Provider value={{ userId, account, transactionData, totalMoneyIn, totalMoneyOut, moneyInTransactions, moneyOutTransactions, allUser, allTransaction }}>
            {children}
        </authContext.Provider>
    )
}

