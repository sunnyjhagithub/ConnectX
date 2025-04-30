
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CareerGuidance from "./pages/CareerGuidance";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import RecordedWebinars from "./pages/RecordedWebinars";
import WebinarDiscussion from "./pages/WebinarDiscussion";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import AlumniDirectory from "./pages/AlumniDirectory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/career-guidance" element={
              <ProtectedRoute>
                <CareerGuidance />
              </ProtectedRoute>
            } />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/recorded-webinars" element={<RecordedWebinars />} />
            <Route path="/webinars/:id/discussion" element={
              <ProtectedRoute>
                <WebinarDiscussion />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/alumni-directory" element={<AlumniDirectory />} />
            <Route path="/mentorship/request/:id" element={
              <ProtectedRoute allowedRoles={['student']}>
                <CareerGuidance />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
