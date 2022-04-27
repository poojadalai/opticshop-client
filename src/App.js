import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Products from "./pages/Products";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import Footer from "./components/Footer";
import "./App.css";
import { positions, Provider } from "react-alert";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/Order/OrderDetails";
import Checkout from "./pages/Order/Checkout";
import PaypalButton from "./components/PaypalButton";
import TrendCard from "./components/TrendCard";
import AlertTemplate from "react-alert-template-basic";
import AboutUs from "./pages/AboutUs";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
  };

  return (
    <Provider template={AlertTemplate} {...options}>
      <div className="App">
        <Navigation />
        <MessageBox />
        {isLoading ? <Loading /> : null}
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/payment" element={<PaypalButton />} />
          <Route path="/trends" element={<TrendCard />} />
        </Routes>

        <Footer />
      </div>
    </Provider>
  );
}

export default App;
