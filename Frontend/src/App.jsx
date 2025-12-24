import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./component/Header";
import Shopping from "./pages/Shopping";
import LoginPage from "./auth/LoginPage";
import { Toaster } from "react-hot-toast";
import Account from "./pages/Account";
import ShopkeeperLogin from "./seller/ShopkeeperLogin.jsx";
import ShopkeeperRegister from "./seller/ShopkeeperRegister.jsx";
import ShopkeeperDashboard from "./seller/SellerHome.jsx";
import AddProduct from "./seller/AddProduct.jsx";
import ManageProducts from "./seller/ManageProducts.jsx";
import SellerProfile from "./seller/SellerProfile.jsx";
import SellerOrders from "./seller/SellerOrders.jsx";
import FoodHome from "./food/FoodHome.jsx";
import RestaurantsPage from "./food/RestaurantsPage.jsx";
import RestaurantDetails from "./food/RestaurantDetails.jsx"
import RestaurantCreate from "./seller/RestaurantCreate.jsx";
import FoodItemList from "./food/FoodItemList.jsx";
import ProductList from "./seller/ProductList.jsx";
import FoodCartPage from "./food/FoodCartPage.jsx";
import ProductCartPage from "./seller/ProductCartPage.jsx"
import CheckoutPage from "./seller/CheckoutPage.jsx";
import FoodCheckoutPage from "./food/FoodCheckoutPage.jsx";
import BestDealPage from "./pages/BestDealPage.jsx";
import CheapestPage from "./pages/CheapestPage.jsx";
import TrendingPage from "./pages/TreandingPage.jsx";
import LimitedDealPage from "./pages/LimitedDealPage.jsx";
import BuyNowPage from "./pages/BuyNowPage.jsx";
import ReturnModal from "./component/ReturnModal.jsx";
import Orders from "./productOrder/Orders.jsx";
import OrderDetails from "./productOrder/OrderDetails.jsx";

// ✅ Custom wrapper for conditional Navbar
function LayoutWithNavbar() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/shopkeeper");

  return (
    <>
      {!hideNavbar && <Navbar />}  {/* only show if not seller route */}

      <Routes>
        {/* Customer routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/cart/product" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<Account />} />

        {/* Seller routes */}
        <Route path="/shopkeeper/register" element={<ShopkeeperRegister />} />
        <Route path="/shopkeeper/login" element={<ShopkeeperLogin />} />
        <Route path="/shopkeeper/home" element={<ShopkeeperDashboard />} />
        <Route path="/shopkeeper/add-product" element={<AddProduct />} />
        <Route path="/shopkeeper/products" element={<ManageProducts />} />
        <Route path="/shopkeeper/profile" element={<SellerProfile />} />
        <Route path="/shopkeeper/orders" element={<SellerOrders />} />
        <Route path="/shopkeeper/my-product" element={<ProductList/>} />
        <Route path="/shopping/cart" element={<ProductCartPage />} />
        <Route path="/shopping/checkout" element={<CheckoutPage/>} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/cheapest" element={<CheapestPage />} />
        <Route path="/bestdeal" element={<BestDealPage />} />
        <Route path="/shopping/limited-deals" element={<LimitedDealPage/>} />
        <Route path="/buynow/:productId" element={<BuyNowPage/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/orders/:orderId" element={<OrderDetails/>} />

      {/* {food routes} */}
      <Route path="/food" element={<FoodHome />} />
      <Route path="/food/restaurants" element={<RestaurantsPage/>} />
      <Route path="/food/restaurant/:id" element={<RestaurantDetails />} />
      <Route path="/restaurant/create" element={<RestaurantCreate />} />
      <Route path="/food/my-item" element={<FoodItemList/>} />
      <Route path="/food/cart" element={<FoodCartPage/>} />
      <Route path="/food/checkout" element={<FoodCheckoutPage/>} /> 

      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default function App() {
  return (
    <>
    <LayoutWithNavbar />
    <ReturnModal />  
    </>
    );
}
