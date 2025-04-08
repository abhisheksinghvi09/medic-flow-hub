
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Home, 
  Menu, 
  User, 
  X, 
  Stethoscope, 
  Pill, 
  Plane, 
  LogOut,
  FileText,
  Users,
  Activity,
  Settings,
  Building,
  AlertCircle,
  ShieldCheck,
  Heart,
  HeartPulse
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type SidebarItem = {
  name: string;
  href: string;
  icon: React.FC<{ className?: string }>;
  roles: string[];
  priority?: number; // Higher number means higher priority
};

const navItems: SidebarItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home, roles: ["patient", "doctor", "admin"], priority: 5 },
  { name: "Profile", href: "/profile", icon: User, roles: ["patient", "doctor", "admin"], priority: 4 },
  { name: "Disease Detection", href: "/disease-detection", icon: Stethoscope, roles: ["patient", "admin"], priority: 3 },
  { name: "Health Metrics", href: "/health-metrics", icon: HeartPulse, roles: ["patient", "admin"], priority: 3 },
  { name: "Appointments", href: "/appointments", icon: Calendar, roles: ["patient", "doctor", "admin"], priority: 2 },
  { name: "Medical Records", href: "/medical-records", icon: FileText, roles: ["patient", "admin"], priority: 2 },
  { name: "Pharmacy", href: "/pharmacy", icon: Pill, roles: ["patient", "admin"] },
  { name: "Medical Tourism", href: "/tourism", icon: Plane, roles: ["patient", "admin"] },
  
  // Doctor specific routes
  { name: "My Patients", href: "/doctor/patients", icon: Users, roles: ["doctor", "admin"], priority: 4 },
  { name: "Doctor Schedule", href: "/doctor/schedule", icon: Calendar, roles: ["doctor", "admin"], priority: 3 },
  { name: "Write Prescriptions", href: "/doctor/prescriptions", icon: Pill, roles: ["doctor", "admin"], priority: 3 },
  { name: "Order Tests", href: "/doctor/lab-tests", icon: Stethoscope, roles: ["doctor", "admin"] },
  { name: "Patient Vitals", href: "/doctor/vitals", icon: Activity, roles: ["doctor", "admin"] },
  { name: "Department", href: "/doctor/department", icon: Building, roles: ["doctor", "admin"] },

  // Admin specific routes
  { name: "User Management", href: "/admin/users", icon: Users, roles: ["admin"], priority: 4 },
  { name: "Departments", href: "/admin/departments", icon: Building, roles: ["admin"], priority: 3 },
  { name: "Doctor Verification", href: "/admin/verification", icon: ShieldCheck, roles: ["admin"], priority: 3 },
  { name: "System Settings", href: "/admin/settings", icon: Settings, roles: ["admin"] },
  { name: "System Logs", href: "/admin/logs", icon: FileText, roles: ["admin"] },
  { name: "Emergency Service", href: "/admin/emergency", icon: AlertCircle, roles: ["admin"], priority: 2 },
];

interface SidebarProps {
  userRole?: string;
}

export default function Sidebar({ userRole = "patient" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();
  
  // Use authenticated role if available
  const role = profile?.role || userRole;
  
  // Filter and sort menu items based on user role and priority
  const filteredItems = navItems
    .filter(item => item.roles.includes(role))
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));

  // Group items by category
  const frequentItems = filteredItems.filter(item => (item.priority || 0) >= 3);
  const otherItems = filteredItems.filter(item => !item.priority || item.priority < 3);

  // Effect to handle sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', String(newState));
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div 
      className={cn(
        "relative h-screen transition-all duration-300 ease-in-out bg-sidebar text-sidebar-foreground border-r", 
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Heart className="text-medical-primary" size={24} />
            <span className="text-xl font-bold text-medical-primary">MedicFlow</span>
          </div>
        )}
        <button 
          onClick={toggleCollapse}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      
      <div className="px-2 py-4 overflow-y-auto max-h-[calc(100vh-180px)] scrollbar-thin">
        {frequentItems.length > 0 && (
          <div className="mb-4">
            {!isCollapsed && <div className="px-4 mb-1 text-xs font-medium text-gray-500">MAIN MENU</div>}
            <ul className="space-y-1">
              {frequentItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      location.pathname === item.href 
                        ? "bg-medical-primary text-white" 
                        : "hover:bg-sidebar-accent/50"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "")} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {otherItems.length > 0 && (
          <div>
            {!isCollapsed && <div className="px-4 mb-1 text-xs font-medium text-gray-500">OTHER</div>}
            <ul className="space-y-1">
              {otherItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      location.pathname === item.href 
                        ? "bg-medical-primary text-white" 
                        : "hover:bg-sidebar-accent/50"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "")} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full border-t border-sidebar-border">
        {!isCollapsed && profile && (
          <div className="px-4 py-3 mb-2">
            <p className="text-sm text-gray-400">Signed in as:</p>
            <p className="font-medium truncate">{profile.name || 'User'}</p>
            <p className="text-xs text-gray-400 capitalize">{profile.role}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-3 mb-2 transition-colors text-red-300 hover:bg-red-900/20 hover:text-red-200",
            isCollapsed ? "justify-center" : ""
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
