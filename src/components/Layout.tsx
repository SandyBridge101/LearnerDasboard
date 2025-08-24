import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-foreground rounded text-primary flex items-center justify-center font-bold">
                  C
                </div>
                <span className="text-xl font-semibold">CClient</span>
              </Link>
              
              <nav className="hidden md:flex space-x-6">

                <Link 
                  to="/dashboard" 
                  className={`hover:text-primary-foreground/80 transition-colors ${
                    isActive('/dashboard') ? 'text-primary-foreground' : 'text-primary-foreground/60'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/courses"
                  className={`font-medium transition-colors hover:text-primary-foreground/80${
                    location.pathname === "/courses" ? "text-primary-foreground" : "text-foreground/60"
                  }`}
                >
                  Courses
                </Link>
                <Link 
                  to="/profile" 
                  className={`hover:text-primary-foreground/80 transition-colors ${
                    isActive('/profile') ? 'text-primary-foreground' : 'text-primary-foreground/60'
                  }`}
                >
                  Profile
                </Link>
                <Link 
                  to="/invoices" 
                  className={`hover:text-primary-foreground/80 transition-colors ${
                    isActive('/invoices') ? 'text-primary-foreground' : 'text-primary-foreground/60'
                  }`}
                >
                  Invoices
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground rounded text-primary flex items-center justify-center font-bold">
                  C
                </div>
                <span className="text-xl font-semibold">CClient</span>
              </div>
              <p className="text-sm text-primary-foreground/80">
                © copyright 2024 - CClient. All rights reserved
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Menu</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground">Home</Link></li>
                <li><Link to="/dashboard" className="text-primary-foreground/80 hover:text-primary-foreground">Dashboard</Link></li>
                <li><Link to="/checkout" className="text-primary-foreground/80 hover:text-primary-foreground">Checkout</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>+1234-000000</li>
                <li>New York, New York</li>
                <li>Hello@CClient.com</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Social</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground">LinkedIn</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Facebook</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Twitter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
            <a href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;