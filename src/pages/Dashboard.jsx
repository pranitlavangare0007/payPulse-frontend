import {  useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../services/api';


import '../styles/dashboard.css'

export function Dashboard() {

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

  const accNum =
    sessionStorage.getItem("selectedAccount");

  useEffect(() => {

    if (!accNum) {
      navigate("/select-account", { replace: true });
      return;
    }

    const fetchAccount = async () => {
      try {
        const response = await api.get(`/accounts/${accNum}`);
        setAccount(response.data);
        setLoading(false);
      } catch (err) {
        console.log("Account Not Found" , err)
      }
    };

    fetchAccount();

   

  }, [accNum, navigate]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Account...</h2>;
  }

  return (
    <>


      <div className="dashboard-container">


        <section className="account-summary-section">

          <div className="account-card-main">

            <div className="account-header">
              <h2 className="account-type">
                {account.accountType} Account
              </h2>
              <span className="account-status">
                {account.accountStatus}
              </span>
            </div>

            <p className="account-number">
              Account No: •••• {String(account.accountNumber).slice(-4)}
            </p>

            <h3 className="account-balance">
              ₹ {account.balance}
            </h3>

            <p className="upi-id">
              UPI ID: {account.upiId}
            </p>

          </div>

        </section>


        <section className="actions-section">

          <h3 className="section-title">Quick Services</h3>
          

          <div className="actions">

            <button
              className="action-card"
              onClick={() => navigate("/open-account")}
            >
              Open Account

            </button>

            <button
              className="action-card"
              onClick={() => navigate("/deposit")}
            >
              Deposite Money
            </button>

            <button
              className="action-card"
              onClick={() => navigate("/withdraw")}
            >
              Withdraw Money
            </button>

            <button
              className="action-card"
              onClick={() => navigate("/upi-transfer")}
            >
              UPI Transfer
            </button>

            <button
              className="action-card"
              onClick={() => navigate("/imps-transfer")}
            >
             IMPS Transfer
            </button>


            <button
              className="action-card"
              onClick={() => navigate("/transactions" )}
            >
             Transactions
            </button>

          </div>

        </section>

      </div>

    </>
  );
}