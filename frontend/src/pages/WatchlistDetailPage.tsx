import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  getWatchlist,
  updateWatchlist,
  getAllSymbols,
  Symbol,
  Watchlist,
} from "../services/watchlistService";
import { fetchStockPrice } from "../services/stockService";

const WatchlistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [watchlist, setWatchlist] = useState<Watchlist>();
  const [newSymbol, setNewSymbol] = useState<Symbol>();
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [modifiedSymbols, setModifiedSymbols] = useState<number[]>([]);
  const [showAddSymbolDialog, setShowAddSymbolDialog] = useState(false);
  const [symbolPrices, setSymbolPrices] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWatchlist();
    fetchAllSymbols();
  }, []);

  useEffect(() => {
    if (watchlist) {
      fetchLatestStockPrices();
    }
  }, [watchlist]);

  const fetchWatchlist = async () => {
    try {
      if (id) {
        const data = await getWatchlist(parseInt(id));
        setWatchlist(data);
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const fetchAllSymbols = async () => {
    try {
      const symbolsData = await getAllSymbols();
      setSymbols(symbolsData);
    } catch (error) {
      console.error("Error fetching symbols:", error);
    }
  };

  const fetchLatestStockPrices = async () => {
    try {
      const prices: { [key: string]: number } = {};
      for (const symbol of watchlist?.symbols || []) {
        const price = await fetchStockPrice(symbol.symbol);
        prices[symbol.name] = price;
      }
      setSymbolPrices(prices);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock prices:", error);
    }
  };

  const handleDeleteSymbol = (symbolId: number) => {
    try {
      setWatchlist((prevWatchlist: any) => ({
        ...prevWatchlist,
        symbols: prevWatchlist.symbols.filter(
          (symbol: any) => symbol.id !== symbolId
        ),
      }));
    } catch (error) {
      console.error("Error deleting symbol:", error);
    }
  };

  const handleAddSymbol = () => {
    try {
      if (newSymbol) {
        const selectedSymbol = symbols.find((s) => s.id === newSymbol.id);
        if (selectedSymbol) {
          setWatchlist((prevWatchlist: any) => ({
            ...prevWatchlist,
            symbols: [...prevWatchlist.symbols, selectedSymbol],
          }));
          setNewSymbol(undefined);
          setShowAddSymbolDialog(false);
        }
      }
    } catch (error) {
      console.error("Error adding symbol:", error);
    }
  };

  const handleSaveWatchlist = async () => {
    try {
      if (id) {
        await updateWatchlist(parseInt(id), watchlist);
        fetchWatchlist();
      }
    } catch (error) {
      console.error("Error updating watchlist symbols:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Watchlist: {watchlist?.name}
      </Typography>
      <Button onClick={() => setShowAddSymbolDialog(true)}>Add Symbol</Button>
      <List>
        {loading ? (
          <CircularProgress />
        ) : (
          watchlist?.symbols?.map((symbol: any) => (
            <ListItem key={symbol.id}>
              <ListItemText primary={`${symbol.name} - ${symbolPrices[symbol.name]}`} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleDeleteSymbol(symbol.id)}>
                  Delete
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
      <Dialog
        open={showAddSymbolDialog}
        onClose={() => setShowAddSymbolDialog(false)}
      >
        <DialogTitle>Add Symbol</DialogTitle>
        <DialogContent>
          <Select
            value={newSymbol?.name || ""}
            onChange={(e) =>
              setNewSymbol(symbols.find((s) => s.name === e.target.value))
            }
            label="Symbol"
          >
            {symbols.map((symbol) => (
              <MenuItem key={symbol.id} value={symbol.name}>
                {symbol.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddSymbolDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSymbol}>Add</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={handleSaveWatchlist}>Save</Button>
    </Container>
  );
};

export default WatchlistDetailPage;
