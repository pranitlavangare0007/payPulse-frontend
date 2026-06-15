import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../api';
import '../styles/transactions.css'


export function Transactions() {

    const navigate = useNavigate();

    const accountNumber = sessionStorage.getItem("selectedAccount");


    const [transactions, setTransactions] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!accountNumber) {
            navigate("/select-account");
            return;
        }
        async function fetchTransactions() {
            try {
                setLoading(true);

                const response = await api.get(`/accounts/${accountNumber}/transactions`);

                setTransactions(response.data);
            }
            catch (err) {
                console.log("Failed to fetch transactions", err);
            }
            finally {
                setLoading(false);
            }

        }
        fetchTransactions()
    }, [accountNumber, navigate]);

    const formatDate = (time) => {
        return new Date(time).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    };

    return (
        <>

            <div className="transactions-container">

                <h2 className="transaction-heading"> Transactions</h2>


                {loading && <p>Loading transactions...</p>}


                {transactions && (
                    <div className="transactions-result">

                        <div className="transactions-header">
                            <p><b>Account:</b> •••• {transactions.accountNumber.slice(-4)}</p>
                           
                        </div>

                        <table className="transactions-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Reference</th>
                                    <th>Details</th>
                                    <th>Channel</th>
                                    <th>Amount</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.transactions.length === 0 && (
                                    <tr>
                                        <td colSpan="6">No transactions found</td>
                                    </tr>
                                )}

                                {transactions.transactions.map(tx => {

                                    const amount = tx.credit > 0 ? tx.credit : tx.debit;
                                    const isCredit = tx.credit > 0;

                                    return (
                                        <tr key={tx.referenceNumber}>
                                            <td>{formatDate(tx.time)}</td>
                                            <td>{tx.referenceNumber}</td>
                                            <td>{tx.details}</td>
                                            <td>{tx.channel}</td>

                                            <td className={isCredit ? "credit" : "debit"}>
                                                {isCredit ? "+" : "-"} ₹{amount}
                                            </td>

                                            <td>₹{tx.balance}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </>
    );
}

