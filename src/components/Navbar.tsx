
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Book } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Bot,
  LayoutDashboard,
  Search,
  ShieldCheck,
  UserPlus,
  Wallet,
  Briefcase,
  Store,
  BarChart3,
  Server,
  Shield,  Mail, Users, BookOpen, Newspaper 
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);

  const solutions = [
    { name: "AI-Driven Talent Matchmaking", href: "/talent-matching", icon: Bot },
    { name: "Agentic AI Platform", href: "/agentic-ai", icon: LayoutDashboard },
    { name: "Talent Search Marketplace", href: "/talent-search", icon: Search },
    { name: "Compliance Management", href: "/compliance", icon: ShieldCheck },
    { name: "Employees Onboarding Software", href: "/onboarding", icon: UserPlus },
    { name: "Payroll Management", href: "/payroll", icon: Wallet },
    { name: "Analytics Suite", href: "/analytics", icon: BarChart3 },
  ];

  const company = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Career", href: "/career" },
    { name: "Resources", href: "/resources" },
    { name: "Press Release", href: "/press" },
  ];

  const resources1 = [
    {
      name: "Professional Development",
      href: "/professional-development",
      icon: Book, // assuming you have an icon component
      description: "Enhance skills, boost productivity, and grow your career through expert-led training"
    },
    {
      name: "IT Consulting",
      href: "/services/it-consulting",
      icon: Server,
      description: "Enterprise cybersecurity and it infrastructure Solutions"
    },
    {
      name: "IT Workforce Solutions",
      href: "/services/it-workforce-solutions",
      icon: Server,
      description: "Skilled Talent at Scale – On-Time, On-Target."
    },
   
  ];
  const resources = [
    { name: "Professional Development", href: "/professional-development" },
    { name: "IT Consulting", href: "/services/it-consulting" },
    { name: "IT Consulting", href: "/services/it-workforce-solutions" },

    
  ];
  const company1 = [
    { name: "About", href: "/about", icon: Briefcase },
    { name: "Contact", href: "/contact", icon: Mail },
    { name: "Career", href: "/career", icon: Users },
    { name: "Resources", href: "/resources", icon: BookOpen },
    { name: "Press Release", href: "/press-release", icon: Newspaper },
  ];
  const descriptions: Record<string, string> = {
    "AI-Driven Talent Matchmaking": "Match jobs and talent using advanced AI",
    "Agentic AI Platform": "Automate workflows with intelligent agents",
    "Talent Search Marketplace": "Find professionals across domains",
    "Compliance Management": "Ensure hiring and legal compliance",
    "Employees Onboarding Software": "Streamline onboarding processes",
    "Payroll Management": "Manage your payroll efficiently",
    "Analytics Suite": "Unlock workforce insights with analytics",
  };

  

  const marketplaceItems = [
    { name: "AdeptAI Marketplace", href: "/marketplace", icon: Store },
    { name: "Talent Marketplace", href: "/marketplace/talent", icon: Briefcase },
    { name: "Software Marketplace", href: "/marketplace/software", icon: Store },
  ];

  const standaloneLinks = [
    { name: "Integrations", href: "/integrations" },
    { name: "Pricing", href: "/pricing" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileSubMenu = (menu) => {
    setMobileSubMenuOpen(mobileSubMenuOpen === menu ? null : menu);
  };

  const renderMobileSubMenu = (items, menuKey) => (
    <AnimatePresence>
      {mobileSubMenuOpen === menuKey && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="w-full bg-gray-100 p-2 rounded-md space-y-2">
            {items.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block p-2 text-gray-800 hover:bg-gray-200 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon && <item.icon className="inline-block h-4 w-4 mr-2" />}
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <header 
      ref={navRef}
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 bg-white shadow-sm", isScrolled && "backdrop-blur-md border-b border-gray-200")}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/">
          <img src="https://mediumvioletred-cobra-190797.hostingersite.com/wp-content/uploads/2025/02/AdeptAI-Main-Logo-3.png.webp" alt="Adept AI Logo" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-foreground transition-colors bg-transparent">
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    {solutions.map(({ name, href, icon: Icon }) => (
                      <li key={href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center space-x-2">
                              <Icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">
                                {name}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {descriptions[name]}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="hover:text-foreground -ml-[30px] -mr-[20px] transition-colors bg-transparent">
        Marketplace
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <Link
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                to="/marketplace"
              >
                <div className="mt-4 mb-2 text-lg font-medium text-white">
                  AdeptAI Marketplace
                </div>
                <p className="text-sm leading-tight text-white/90">
                  Discover top talent and premium software for your business
                </p>
              </Link>
            </NavigationMenuLink>
          </li>

          {marketplaceItems.slice(1).map((item, index) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4" />
                    <div className="text-sm font-medium leading-none">{item.name}</div>
                  </div>
                  {/* Add conditional descriptions based on item.name */}
                  {item.name === "Talent Marketplace" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Find Top talent or post your job opening
               </p>
                  )}
                  {item.name === "Software Marketplace" && (
  <p className="text-xs text-muted-foreground mt-1">
   Discover premium AI and SaaS tools     
  </p>
)}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="hover:text-foreground transition-colors -ml-[20px] -mr-[20px] bg-transparent">
        Services
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[300px] lg:w-[300px]">
          {resources1.map(({ name, href, icon: Icon, description }) => (
            <li key={href}>
              <NavigationMenuLink asChild>
                <Link
                  to={href}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent h-[90px] focus:text-accent-foreground"
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <div className="text-sm font-medium leading-none">
                      {name}
                    </div>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug h-[100px] text-muted-foreground">
                    {description}
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>


          
          {standaloneLinks.map((item) => (
            <Link key={item.name} to={item.href} className="text-sm  -ml-[20px] font-medium hover:text-primary">
              {item.name}
            </Link>
          ))}
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="hover:text-foreground -ml-[20px] transition-colors bg-transparent">Company</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[200px] lg:grid-cols-1">
          {company1.map(({ name, href, icon: Icon }) => (
            <li key={href}>
              <NavigationMenuLink asChild>
                <Link
                  to={href}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <div className="text-sm font-medium leading-none">{name}</div>
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>


        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/dashboard">
            <Button size="sm" className="bg-primary hover:bg-primary/90">Dashboard</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-lg p-4 space-y-4 w-full absolute top-16 left-0"
          >
            {/* Products */}
            <button 
              className="w-full text-left font-medium flex justify-between items-center" 
              onClick={() => toggleMobileSubMenu("products")}
            >
              <span>Products</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubMenuOpen === "products" ? "rotate-180" : ""}`} />
            </button>
            {renderMobileSubMenu(solutions, "products")}

            {/* Marketplace */}
            <button 
              className="w-full text-left font-medium flex justify-between items-center" 
              onClick={() => toggleMobileSubMenu("marketplace")}
            >
              <span>Marketplace</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubMenuOpen === "marketplace" ? "rotate-180" : ""}`} />
            </button>
            {renderMobileSubMenu(marketplaceItems, "marketplace")}

            {/* Services */}
            <button 
              className="w-full text-left font-medium flex justify-between items-center" 
              onClick={() => toggleMobileSubMenu("services")}
            >
              <span>Services</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubMenuOpen === "services" ? "rotate-180" : ""}`} />
            </button>
            {renderMobileSubMenu(resources, "services")}

            {/* Standalone Links */}
            {standaloneLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-sm font-medium hover:text-primary py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Company */}
            <button 
              className="w-full text-left font-medium flex justify-between items-center" 
              onClick={() => toggleMobileSubMenu("company")}
            >
              <span>Company</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileSubMenuOpen === "company" ? "rotate-180" : ""}`} />
            </button>
            {renderMobileSubMenu(company, "company")}

            {/* Auth Buttons */}
            <div className="pt-4 space-y-3">
              <Link to="/login">
                <Button variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  Log in
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;