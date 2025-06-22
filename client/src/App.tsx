import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import ProductsPage from "@/pages/products-page";
import ProductDetailPage from "@/pages/product-detail-page";
import CartPage from "@/pages/cart-page";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import { ProtectedRoute } from "./lib/protected-route";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function App() {
  const [location] = useLocation();
  
  // Check if we're on an admin route to conditionally show header/footer
  const isAdminRoute = location?.startsWith('/admin');

  return (
    <TooltipProvider>
      <Toaster />
      <div className="flex flex-col min-h-screen">
        {!isAdminRoute && <Header />}
        <main className={isAdminRoute ? "min-h-screen" : "flex-grow"}>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/products/:id" component={ProductDetailPage} />
            <ProtectedRoute path="/cart" component={CartPage} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin" component={AdminDashboard} />
            <Route component={NotFound} />
          </Switch>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </TooltipProvider>
  );
}

export default App;
