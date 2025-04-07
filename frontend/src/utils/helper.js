import moment from 'moment';
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (fullName) => {
  if (!fullName) return "";

  const names = fullName.split(" ");
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
  return initials;
};

export const addThosandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  return fractionalPart
    ? `${formattedIntegerPart}.${fractionalPart}`
    : formattedIntegerPart;
};

export const prepareExpenseBarChartData =(data = []) => {
  const chartData = data.map((item) => ({
    category : item?.category, 
    amount : item?.amount
  }))

  return chartData;
}

export const prepareIncomeBarChartData = (data = []) => {

  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date)); 

  const chartData = sortedData.map((item) => (
   {
    month : moment(item?.date).format('DD/MM'),
    amount : item?.amount,
    source : item?.source
   }
  ))

  return chartData;

}
