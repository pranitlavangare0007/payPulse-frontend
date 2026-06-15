import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api';
import '../styles/openacc.css'



export function OpenAccount() {
  const [accountType, setAccountType] = useState('SAVINGS');
  const [accountPurpose, setAccountPurpose] = useState('PERSONAL');
  const [mpin, setMpin] = useState('');
  const navigate = useNavigate();

  const handleOpenAccount = async (event) => {
    event.preventDefault();

    try {
      await api.post("/accounts", { mpin, accountType, accountPurpose });
      alert("Account created successfully!");
      navigate("/select-account");
    }
    catch (err) {
      console.log("Account creation failed", err)

    }
  }



 return (
  <div className="openacc-page">

    <div className="openacc-container">

      {/* Header */}
      <div className="openacc-header">
        <h2>Open New Bank Account</h2>
        <p>Complete the details below to create your PayPulse account</p>
      </div>

      <form className="openacc-form" onSubmit={handleOpenAccount}>

        {/* Account Type */}
        <div className="form-group">
          <label>Account Type</label>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          >
            <option value="">Select Account Type</option>
            <option value="SAVINGS">Savings Account</option>
            <option value="CURRENT">Current Account</option>
          </select>
        </div>

        {/* Account Purpose */}
        <div className="form-group">
          <label>Account Purpose</label>
          <select
            value={accountPurpose}
            onChange={(e) => setAccountPurpose(e.target.value)}
            required
          >
            <option value="">Select Purpose</option>
            <option value="SALARY">Salary</option>
            <option value="PERSONAL">Personal</option>
            <option value="BUSINESS">Business</option>
            <option value="INVESTMENT">Investment</option>
          </select>
        </div>

        {/* MPIN */}
        <div className="form-group">
          <label>Create MPIN</label>
          <input
            type="password"
            maxLength="6"
            pattern="[0-9]{6}"
            onChange={e => setMpin(e.target.value)}
            placeholder="Enter 6 digit MPIN"
            required
          />
        </div>

        {/* Security Note */}
        <div className="security-info">
           Your MPIN will be required for withdrawals, transfers, and payments.
          Never share your MPIN with anyone.
        </div>

        <button type="submit" className="create-btn">
          Create Account
        </button>

      </form>

    </div>
  </div>
);
}