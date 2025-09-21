import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, MessageSquare, User } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Match" },
    { path: "/locations", icon: MapPin, label: "Locations" },
    { path: "/chat", icon: MessageSquare, label: "Chat" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-3">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="inline-flex items-center">
              <img
                src={logo}
                alt="together logo"
                className="h-8 w-auto rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
              />
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-2 py-2 rounded-lg transition-colors font-medium",
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;