// DashboardPage.tsx

import React, { useState, useEffect } from 'react';
import { Typography, Container, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getWatchlists, createWatchlist, deleteWatchlist, updateWatchlist } from '../services/watchlistService';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [watchlists, setWatchlists] = useState<any[]>([]);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [editWatchlistId, setEditWatchlistId] = useState<number | null>(null);
  const [editWatchlistName, setEditWatchlistName] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    if (user) {
      fetchWatchlists();
    }
  }, [user]);

  const fetchWatchlists = async () => {
    try {
      const data = await getWatchlists();
      setWatchlists(data);
    } catch (error) {
      console.error('Error fetching watchlists:', error);
    }
  };

  const handleCreateWatchlist = async () => {
    try {
      await createWatchlist({ name: newWatchlistName, symbols:[] });
      fetchWatchlists();
      setNewWatchlistName('');
      setShowCreateDialog(false);
    } catch (error) {
      console.error('Error creating watchlist:', error);
    }
  };

  const handleDeleteWatchlist = async (watchlistId: number) => {
    try {
      await deleteWatchlist(watchlistId);
      fetchWatchlists();
    } catch (error) {
      console.error('Error deleting watchlist:', error);
    }
  };

  const handleEditWatchlist = async () => {
    try {
      await updateWatchlist(editWatchlistId!, { name: editWatchlistName });
      fetchWatchlists();
      setEditWatchlistId(null);
      setEditWatchlistName('');
    } catch (error) {
      console.error('Error editing watchlist:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard, {user?.username}!
      </Typography>
      <Button onClick={() => setShowCreateDialog(true)}>Create New Watchlist</Button>
      {watchlists.map((watchlist) => (
        <div key={watchlist.id}>
          {editWatchlistId === watchlist.id ? (
            <div>
              <TextField
                value={editWatchlistName}
                onChange={(e) => setEditWatchlistName(e.target.value)}
                label="Watchlist Name"
              />
              <Button onClick={handleEditWatchlist}>Save</Button>
            </div>
          ) : (
            <div>
              <Typography variant="h6">{watchlist.name}</Typography>
              <Button onClick={() => { setEditWatchlistId(watchlist.id); setEditWatchlistName(watchlist.name); }}>Edit</Button>
              <Button onClick={() => handleDeleteWatchlist(watchlist.id)}>Delete</Button>
              <Link to={`/watchlist/${watchlist.id}`}>View Symbols</Link>
            </div>
          )}
        </div>
      ))}
      <Dialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)}>
        <DialogTitle>Create New Watchlist</DialogTitle>
        <DialogContent>
          <TextField
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            label="Watchlist Name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateWatchlist}>Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DashboardPage;
