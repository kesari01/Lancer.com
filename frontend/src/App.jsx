import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing components and pages
import Layout from "./layout/Layout";
import AddNewGig from "./pages/addNewGig/AddNewGig";
import Gig from "./pages/gig/Gig";
import GigList from "./pages/gigList/GigList";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import ManageGig from "./pages/manageGig/ManageGig";
import Message from "./pages/message/Message";
import MessageList from "./pages/messageList/MessageList";
import OrderList from "./pages/orderList/OrderList";
import Register from "./pages/register/Register";
import "./App.css";

function App() {
  return (
    <div>
      {/* BrowserRouter component to handle routing */}
      <BrowserRouter>
        <Routes>
          {/* Layout component wraps around all routes to provide consistent layout */}
          <Route path="/" element={<Layout />}>
            {/* Define routes for different pages */}
            <Route index element={<LandingPage />} />
            <Route path="/add-new-gig" element={<AddNewGig />} />
            <Route path="/gig/:id" element={<Gig />} />
            <Route path="/gig-list" element={<GigList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/manage-gig" element={<ManageGig />} />
            <Route path="/message/:id" element={<Message />} />
            <Route path="/message-list" element={<MessageList />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
