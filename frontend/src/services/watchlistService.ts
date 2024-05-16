import { basicAxios } from "./basicAxios";

export interface Watchlist {
  id: number;
  name: string;
  symbols: Symbol[];
}

export interface Symbol {
  id: number;
  symbol: string;
  name: string;
}

export const createWatchlist = async (watchlistData: any) => {
  try {
    const response = await basicAxios("/api/stocks/watchlists/", {
        method: "POST",
        data: watchlistData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateWatchlist = async (watchlistId: number, watchlistData: any) => {
  try {
    const response = await basicAxios(`/api/stocks/watchlists/${watchlistId}/`, {
        method: "PUT",
        data: watchlistData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWatchlist = async (watchlistId: number) => {
  try {
    await basicAxios(`/api/stocks/watchlists/${watchlistId}/`, {
        method: "DELETE",
    });
  } catch (error) {
    throw error;
  }
};

export const getWatchlists = async () => {
  try {
    const response = await basicAxios("/api/stocks/watchlists/", {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWatchlist = async (watchlistId: number) => {
  try {
    const response = await basicAxios(`/api/stocks/watchlists/${watchlistId}/`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllSymbols = async () => {
  try {
    const response = await basicAxios(`/api/stocks/symbols/`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addSymbol = async (symbol: Symbol) => {
    try {
      await basicAxios(`/api/stocks/symbols/`, {
        method: "POST",
        data: symbol,
      });
    } catch (error) {
      throw error;
    }
  };