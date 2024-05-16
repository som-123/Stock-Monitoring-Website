import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import WatchlistDetailPage from '../pages/WatchlistDetailPage';

const routesConfig = [
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/', element: <DashboardPage /> },
  { path: '/watchlist/:id', element: <WatchlistDetailPage /> },
];

export default routesConfig;
