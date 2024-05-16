import axios from "axios";

const API_KEY = "1EIVSK6NBAAFN2YM";

export const fetchStockPrice = async (symbol: string) => {
  try {
    console.log(symbol)
    const response = await axios(`https://www.alphavantage.co/query`, {
      params: {
        function: "TIME_SERIES_INTRADAY",
        symbol: symbol,
        interval: "5min",
        apikey: API_KEY,
      },
    });
    console.log(response.data);
    const timeSeries = response.data["Time Series (5min)"];
    const latestTimestamp = Object.keys(timeSeries)[0];
    const latestPrice = timeSeries[latestTimestamp]["4. close"];
    return parseFloat(latestPrice);
  } catch (error) {
    throw error;
  }
};
