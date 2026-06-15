import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import api from '../services/api';
import '../styles/imps.css'


export function ImpsTransfer() {
    const [amount, setAmount] = useState(0);
    const [mpin, setMpin] = useState("");
    const [accountNumberReceiver, setAccountNumberReceiver] = useState("")
    const [channel] = useState("IMPS")
    
    const navigate = useNavigate();

    const accNum =
    sessionStorage.getItem("selectedAccount");



    async function handelImpsTransfer(event) {
        event.preventDefault();
        try {
            const response = await api.patch(`/accounts/${accNum}/transfer`, { mpin, amount, channel,accountNumberReceiver })

            navigate("/transaction-success", { state: { transaction: response.data } })

        } catch (err) {
           
            console.log("Withdraw Failed" ,err)
           
        }
    };



    return (
  <div className="imps-page">

    <div className="imps-container">

      {/* Header */}
      <div className="imps-header">
        <h2>IMPS Money Transfer</h2>
        <p>Transfer money instantly to any bank account (24x7)</p>
      </div>

      {/* Sender Account */}
      <div className="account-strip">
        <span className="strip-label">From Account</span>
        <p>•••• {accNum.slice(-4)}</p>
      </div>

      <form className="imps-form" onSubmit={handelImpsTransfer}>

        {/* Receiver Account */}
        <div className="form-group">
          <label>Receiver Account Number</label>
          <input
            type="text"
            onChange={e => setAccountNumberReceiver(e.target.value)}
            placeholder="Enter beneficiary account number"
            required
          />
        </div>

        {/* Amount */}
        <div className="form-group">
          <label>Amount</label>
          <div className="amount-box">
            <span>₹</span>
            <input
              type="number"
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
        </div>

        {/* MPIN */}
        <div className="form-group">
          <label>MPIN</label>
          <input
            type="password"
            maxLength="6"
            onChange={e => setMpin(e.target.value)}
            placeholder="Enter 6-digit MPIN"
            required
          />
        </div>

        {/* Security Note */}
        <div className="security-note">
          🔒 This transaction is secured with bank-grade encryption.
        </div>

        <button className="send-btn">
          Confirm Transfer
        </button>

      </form>
    </div>
  </div>
);
}