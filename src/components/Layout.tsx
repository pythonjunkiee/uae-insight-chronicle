import { Outlet } from "react-router-dom";
import DisclaimerBanner from "./DisclaimerBanner";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <DisclaimerBanner />
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
