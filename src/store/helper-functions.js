export const formatter = str => {
  const formatted = str
    .split(' ')
    .map(el => el[0].toUpperCase() + el.slice(1))
    .join(' ');
  return formatted;
};

export const timeFormatter = time => {
  const formattedTime = new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(time));
  return formattedTime;
};

export const currencyFormatter = number => {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(number);
  return formatted;
};

export const randomNumberGenerator = digit => {
  const randomNumber = (Math.floor(Math.random() * Math.pow(10, digit)) + 1)
    .toString()
    .padStart(digit, 0);

  return randomNumber;
};
