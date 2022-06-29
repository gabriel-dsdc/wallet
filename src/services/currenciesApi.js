const getCurrencies = () => (
  fetch('https://economia.awesomeapi.com.br/json/all').then((res) => res.json()).catch((error) => error)
);

export default getCurrencies;
