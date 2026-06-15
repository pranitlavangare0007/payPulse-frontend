import {  useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import api from '../api';



export function Statement(){


   
    const navigate = useNavigate();

    const accountNumber = sessionStorage.getItem("selectedAccount");

    const [fromDate,setFromDate] = useState("");
    const [toDate,setToDate] = useState("");
    const [statement,setStatement] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        if(!accountNumber){
            navigate("/select-account");
        }
    },[accountNumber,navigate]);


    const fetchTransactions = async(e)=>{
        e.preventDefault();

        if(!fromDate || !toDate){
            alert("Please select date range");
            return;
        }

        try{
            setLoading(true);

            const response = await api.post(
                `/accounts/${accountNumber}/statement`,
                {
                    fromDate,
                    toDate
                }
            );

            setStatement(response.data);
        }
        catch(err){
           console.log( "Failed to fetch statement" ,err);
        }
        finally{
            setLoading(false);
        }
    };

    const formatDate = (time)=>{
        return new Date(time).toLocaleString("en-IN",{
            dateStyle:"medium",
            timeStyle:"short"
        });
    };

    return(
        <>
       

        <div className="statement-container">

            <h2>Account Statement</h2>

        
            <form className="statement-filter" onSubmit={fetchTransactions}>
                <div>
                    <label>From</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={e=>setFromDate(e.target.value)}
                    />
                </div>

                <div>
                    <label>To</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={e=>setToDate(e.target.value)}
                    />
                </div>

                <button type="submit">Get Statement</button>
            </form>

            {loading && <p>Loading statement...</p>}

           
            {statement && (
                <div className="statement-result">

                    <div className="statement-header">
                        <p><b>Account:</b> •••• {statement.accountNumber.slice(-4)}</p>
                        <p><b>Period:</b> {statement.fromDate} to {statement.toDate}</p>
                    </div>

                    <table className="statement-table">
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
                        {statement.transactions.length === 0 && (
                            <tr>
                                <td colSpan="6">No transactions found</td>
                            </tr>
                        )}

                        {statement.transactions.map(tx=>{

                            const amount = tx.credit > 0 ? tx.credit : tx.debit;
                            const isCredit = tx.credit > 0;

                            return(
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

