import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const colors = ["#875CF5", "#FA2C37", "#FF6900"];
const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];
  return (
    <div className="card">
      <div className="flex justify-center items-center">
        <h5 className="text-lg "> Financial overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={colors}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
