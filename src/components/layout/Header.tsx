
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, UserRound } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
  {
    title: "Features",
    items: [
      {
        title: "Mentorship",
        href: "/career-guidance?tab=mentorship",
        description: "Connect with alumni mentors for career guidance.",
      },
      {
        title: "Career Guidance",
        href: "/career-guidance",
        description: "AI-powered career recommendations and resume analysis.",
      },
      {
        title: "Events",
        href: "/events",
        description: "Attend webinars, workshops and other events.",
      },
      {
        title: "Recorded Webinars",
        href: "/recorded-webinars",
        description: "Watch past webinars and educational content.",
      },
    ],
  },
  {
    title: "Resources",
    href: "/career-guidance?tab=resources",
  },
  {
    title: "About",
    href: "/about",
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-br from-connectx-primary to-connectx-tertiary bg-clip-text text-transparent">
            ConnectX
          </span>
        </Link>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items.map((subItem) => (
                            <li key={subItem.title} className="row-span-1">
                              <NavigationMenuLink asChild>
                                <Link
                                  to={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {subItem.title}
                                  </div>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-connectx-primary"
                      )}
                    >
                      {item.title}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="outline" className="hidden md:inline-flex">
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="hidden md:inline-flex bg-connectx-primary hover:bg-connectx-secondary">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <Button 
                  variant="ghost"
                  size="icon"
                  className="hidden md:inline-flex rounded-full"
                  title={`${userRole} Dashboard`}
                >
                  <UserRound className="h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="hidden md:inline-flex"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b">
          <div className="container py-4 px-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.href ? (
                  <Link
                    to={item.href}
                    className="block py-2 text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div className="py-2">
                    <div className="text-lg font-medium mb-2">{item.title}</div>
                    <div className="ml-4 space-y-2">
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          className="block py-1"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 flex flex-col space-y-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full justify-center bg-connectx-primary hover:bg-connectx-secondary">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <UserRound className="h-5 w-5 mr-2" />
                      {userRole} Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
