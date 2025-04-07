import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({data}) => {
    const [chartData , setCharData] = useState([]); 

    useEffect (() => {
        const result = prepareExpenseBarChartData(data); 
        setCharData(result);
        return () => {};
    }, [data]);

  return (
    <div className='card col-span-1'>
        <div className='flex justify-between items-center'>
            <h5 className='text-lg'>
                Last 30 Days Expenses
            </h5>
        </div>
        <CustomBarChart data = {chartData}/> 
      
    </div>
  )
}

export default Last30DaysExpenses
