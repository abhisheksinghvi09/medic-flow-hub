
import { useState } from 'react';
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
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
  { name: "Medical Records", href: "/medical-records", icon: FileText, roles: ["patient", "admin"] },
  { name: "Health Metrics", href: "/health-metrics", icon: Activity, roles: ["patient", "admin"] },
  { name: "Disease Detection", href: "/disease-detection", icon: Stethoscope, roles: ["patient", "admin"] },
  { name: "Pharmacy", href: "/pharmacy", icon: Pill, roles: ["patient", "admin"] },
  { name: "Medical Tourism", href: "/tourism", icon: Plane, roles: ["patient", "admin"] },
  
  // Doctor specific routes
  { name: "My Patients", href: "/doctor/patients", icon: Users, roles: ["doctor", "admin"] },
  { name: "Doctor Schedule", href: "/doctor/schedule", icon: Calendar, roles: ["doctor", "admin"] },
  { name: "Write Prescriptions", href: "/doctor/prescriptions", icon: Pill, roles: ["doctor", "admin"] },
  { name: "Order Tests", href: "/doctor/lab-tests", icon: Stethoscope, roles: ["doctor", "admin"] },
  { name: "Patient Vitals", href: "/doctor/vitals", icon: Activity, roles: ["doctor", "admin"] },
  { name: "Department", href: "/doctor/department", icon: Building, roles: ["doctor", "admin"] },

  // Admin specific routes
  { name: "User Management", href: "/admin/users", icon: Users, roles: ["admin"] },
  { name: "Departments", href: "/admin/departments", icon: Building, roles: ["admin"] },
  { name: "Doctor Verification", href: "/admin/verification", icon: ShieldCheck, roles: ["admin"] },
  { name: "System Settings", href: "/admin/settings", icon: Settings, roles: ["admin"] },
  { name: "System Logs", href: "/admin/logs", icon: FileText, roles: ["admin"] },
  { name: "Emergency Service", href: "/admin/emergency", icon: AlertCircle, roles: ["admin"] },
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
  
  // Filter menu items based on user role
  const filteredItems = navItems.filter(item => item.roles.includes(role));

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
      
      <nav className="px-2 py-4 overflow-y-auto max-h-[calc(100vh-180px)]">
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

      <div className="absolute bottom-20 w-full px-2">
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
            "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors text-red-300 hover:bg-red-900/20 hover:text-red-200",
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
