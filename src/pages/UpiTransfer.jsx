import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import api from '../services/api';
import '../styles/upi.css'


export function UpiTransfer() {
    const [amount, setAmount] = useState(0);
    const [mpin, setMpin] = useState("");
    const [upiId, setUpiId] = useState("")
    const [channel] = useState("UPI")
  
    const navigate = useNavigate();

   const accNum =
    sessionStorage.getItem("selectedAccount");



    async function handelUpiTransfer(event) {
        event.preventDefault();
        try {
            const response = await api.patch(`/accounts/${accNum}/transfer`, { mpin, amount, channel,upiId })

            navigate("/transaction-success", { state: { transaction: response.data } })



        } catch (err) {
            console.log("Upi transfer Failed" ,err)
           
        }
    };



   return (
  <div className="upi-page">

    <div className="upi-container">

      {/* Header */}
      <div className="upi-header">
        <h2>UPI Transfer</h2>
        <p>Send money instantly using UPI ID</p>
      </div>

      {/* From Account */}
      <div className="upi-account-box">
        <span>From Account</span>
        <p>•••• {accNum ? accNum.slice(-4) : "----"}</p>
      </div>

      <form className="upi-form" onSubmit={handelUpiTransfer}>

        {/* UPI ID */}
        <div className="form-group">
          <label>Receiver UPI ID</label>
          <input
            type="text"
            onChange={e => setUpiId(e.target.value)}
            placeholder="example@upi"
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
              min="1"
              step="0.01"
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
            pattern="[0-9]{6}"
            onChange={e => setMpin(e.target.value)}
            placeholder="Enter 6-digit MPIN"
            required
          />
        </div>

        {/* Security Note */}
        <div className="upi-security">
          🔒 Secured by PayPulse banking encryption.
        </div>

        <button className="upi-btn">
          Pay Now
        </button>

      </form>

    </div>
  </div>
);
}