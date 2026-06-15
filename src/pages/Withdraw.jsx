import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import api from '../api';
import '../styles/withdraw.css'


export function Withdraw() {
  const [amount, setAmount] = useState(0);
  const [mpin, setMpin] = useState("");
  const [channel] = useState("CASH")

  const navigate = useNavigate();

  const accNum =
    sessionStorage.getItem("selectedAccount");


  async function handelWithdraw(event) {
    event.preventDefault();
    try {
      const response = await api.patch(`/accounts/${accNum}/withdraw`, { mpin, amount, channel })

      navigate("/transaction-success", { state: { transaction: response.data } })
     

    } catch (err) {
       console.log("Withdraw Failed" ,err)
    
    }
  };


 
  return (
  <div className="withdraw-page">

    <div className="withdraw-container">

      {/* Title */}
      <div className="withdraw-header">
        <h2>Withdraw Money</h2>
        <p>Secure cash withdrawal from your account</p>
      </div>

      {/* Account Info */}
      <div className="account-info">
        <p>Selected Account</p>
        <h3>•••• {accNum.slice(-4)}</h3>
      </div>

      <form className="withdraw-form" onSubmit={handelWithdraw}>

        {/* Amount */}
        <div className="form-group">
          <label>Withdrawal Amount</label>
          <input
            type="number"
            min="1"
            step="0.01"
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>

        {/* MPIN */}
        <div className="form-group">
          <label>Enter MPIN</label>
          <input
            type="password"
            maxLength="6"
            pattern="[0-9]{6}"
            onChange={e => setMpin(e.target.value)}
            placeholder="6 digit MPIN"
            required
          />
        </div>

        {/* Warning */}
        <div className="withdraw-warning">
          ⚠️ Please verify the amount before confirming.  
          Transactions cannot be reversed once processed.
        </div>

        <button className="withdraw-btn" type="submit">
          Confirm Withdrawal
        </button>

      </form>

    </div>
  </div>
);
}