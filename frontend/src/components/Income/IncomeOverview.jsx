import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setCharData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setCharData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex justify-between items-center ">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and anaylze your income sources.
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
