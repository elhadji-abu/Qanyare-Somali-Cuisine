import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/cart-context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Menu from "@/pages/menu";
import Reservations from "@/pages/reservations";
import Gallery from "@/pages/gallery";
import Reviews from "@/pages/reviews";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminOrders from "@/pages/admin/orders";
import AdminReservations from "@/pages/admin/reservations";
import AdminMenu from "@/pages/admin/menu";
import AdminStaff from "@/pages/admin/staff";
import AdminReviews from "@/pages/admin/reviews";
import Dashboard from "@/pages/dashboard";
import Navbar from "@/components/layout/navbar";
import { useAuth } from "@/hooks/use-auth";

function Router() {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-neutral">
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <Navbar />
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/reservations" component={Reservations} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/dashboard" component={Dashboard} />
        
        {isAdmin && (
          <>
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/admin/orders" component={AdminOrders} />
            <Route path="/admin/reservations" component={AdminReservations} />
            <Route path="/admin/menu" component={AdminMenu} />
            <Route path="/admin/staff" component={AdminStaff} />
            <Route path="/admin/reviews" component={AdminReviews} />
          </>
        )}
        
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Router />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
