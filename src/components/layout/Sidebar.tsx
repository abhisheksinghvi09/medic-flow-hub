
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Home, 
  Menu, 
  User, 
  X, 
  Stethoscope, 
  Pill, 
  Plane, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItem = {
  name: string;
  href: string;
  icon: React.FC<{ className?: string }>;
  roles: string[];
};

const navItems: SidebarItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home, roles: ["patient", "doctor", "admin"] },
  { name: "Profile", href: "/profile", icon: User, roles: ["patient", "doctor", "admin"] },
  { name: "Appointments", href: "/appointments", icon: Calendar, roles: ["patient", "doctor", "admin"] },
  { name: "Disease Detection", href: "/disease-detection", icon: Stethoscope, roles: ["patient", "doctor", "admin"] },
  { name: "Pharmacy", href: "/pharmacy", icon: Pill, roles: ["patient", "doctor", "admin"] },
  { name: "Medical Tourism", href: "/tourism", icon: Plane, roles: ["patient", "doctor", "admin"] },
];

interface SidebarProps {
  userRole?: string;
}

export default function Sidebar({ userRole = "patient" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  // Filter menu items based on user role
  const filteredItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <div 
      className={cn(
        "relative h-screen transition-all duration-300 ease-in-out bg-sidebar text-sidebar-foreground", 
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex justify-between items-center p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-medical-primary">MedicFlow</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      
      <nav className="px-2 py-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  location.pathname === item.href 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "")} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-4 w-full px-2">
        <Link
          to="/auth/login"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-300 hover:bg-red-900/20 hover:text-red-200",
            isCollapsed ? "justify-center" : ""
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}
