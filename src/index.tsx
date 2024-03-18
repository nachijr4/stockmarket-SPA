import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./store";
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
    useNavigate,
  } from "react-router-dom";
import SearchPage from './components/SearchPage';
import WatchlistPage from './components/WatchlistPage';
import PortfolioPage from './components/PortfolioPage';


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      loader: async () => {
        return redirect("/search/home")
        }
    }, 
    {
        path: "/search/home",
        element: <App />,
        children: [
            {
                index: true,
                element: <SearchPage />
            }
        ]
    },
    {
        path: "/search/:stockTicker",
        element: <App />,
        children: [
            {
                index: true,
                element: <SearchPage />
            }
        ]
    },
    {
        path: "/watchlist",
        element: <App />,
        children: [
            {
                index: true,
                element: <WatchlistPage />
            }
        ]
    },
    {
        path: "/portfolio",
        element: <App />,
        children: [
            {
                index: true,
                element: <PortfolioPage />
            }
        ]
    }
  ]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
