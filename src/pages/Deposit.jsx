import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import api from '../services/api';
import '../styles/deposite.css'




export function Deposit() {
  const [amount, setAmount] = useState(null);
  const [mpin, setMpin] = useState("");
  const channel = "CASH";

  const navigate = useNavigate();

  const accNum =
    sessionStorage.getItem("selectedAccount");



  async function handelDeposit(event) {
    event.preventDefault();
    try {
      const response = await api.patch(`/accounts/${accNum}/deposit`, { mpin, amount, channel })

      navigate("/transaction-success", { state: { transaction: response.data } })
     

    } catch (err) 
    {
        console.log("Deposite Failed " , err)
    }
  };


 
 return (
  <div className="deposit-page">

    <div className="deposit-container">

      <div className="deposit-header">
        <h2>Deposit Money</h2>
        <p>Add funds securely to your account</p>
      </div>

      {/* Optional Account Info */}
      <div className="account-info-box">
        <div>
          <span className="info-label">Account Number</span>
          <p> •••• {accNum.slice(-4)}</p>
        </div>
      </div>

      <form className="deposit-form" onSubmit={handelDeposit}>

        <div className="form-group">
          <label>Amount</label>
          <div className="amount-input">
            
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>MPIN</label>
          <input
            type="password"
            maxLength="6"
            value={mpin}
            onChange={e => setMpin(e.target.value)}
            placeholder="Enter 6-digit MPIN"
            required
          />
        </div>

        <button className="deposit-btn">
          Confirm Deposit
        </button>

      </form>

    </div>
  </div>
);
}