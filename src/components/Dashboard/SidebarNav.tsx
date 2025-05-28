import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Bitcoin,
  FolderKanban,
  FileImage,
  Briefcase,
  Newspaper,
  Settings,
  HelpCircle,
  Share2,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
  badge?: string;
  children?: NavItem[];
}

const mainMenuItems: NavItem[] = [
  {
    id: 'analytics',
    label: 'Analytics',
    icon: LayoutDashboard,
    href: '#',
  },
  {
    id: 'crm',
    label: 'CRM',
    icon: Users,
    href: '#',
  },
  {
    id: 'ecommerce',
    label: 'Ecommerce',
    icon: ShoppingCart,
    href: '#',
  },
  {
    id: 'crypto',
    label: 'Crypto',
    icon: Bitcoin,
    href: '#',
    active: true,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderKanban,
    href: '#',
  },
  {
    id: 'nft',
    label: 'NFT',
    icon: FileImage,
    href: '#',
  },
  {
    id: 'job',
    label: 'Job',
    icon: Briefcase,
    href: '#',
  },
  {
    id: 'blog',
    label: 'Blog',
    icon: Newspaper,
    href: '#',
    badge: 'New',
  },
];

const utilityMenuItems: NavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '#',
  },
  {
    id: 'help',
    label: 'Help Center',
    icon: HelpCircle,
    href: '#',
  },
  {
    id: 'share',
    label: 'Share App',
    icon: Share2,
    href: '#',
  },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNavItem: React.FC<{ item: NavItem; isSubItem?: boolean }> = ({ item, isSubItem = false }) => {
  const [isOpen, setIsOpen] = React.useState(item.active || false);

  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    // else navigate or perform action via item.href
  };

  return (
    <li className="mb-1">
      <a
        href={item.href}
        onClick={hasChildren ? (e) => { e.preventDefault(); handleToggle(); } : undefined}
        className={cn(
          'flex items-center py-2.5 px-4 rounded-md transition-colors duration-200 ease-in-out',
          'hover:bg-sidebar-foreground hover:text-sidebar',
          item.active ? 'bg-sidebar-foreground text-sidebar font-semibold' : 'text-sidebar-foreground/80 hover:text-sidebar-foreground',
          isSubItem && 'pl-10'
        )}
      >
        <item.icon className={cn('h-5 w-5 shrink-0', isSubItem ? 'mr-2' : 'mr-3')} />
        <span className="flex-grow text-sm">{item.label}</span>
        {item.badge && (
          <Badge variant="secondary" className="ml-auto bg-accent text-accent-foreground scale-75 text-xs">
            {item.badge}
          </Badge>
        )}
        {hasChildren && (isOpen ? <ChevronDown className="h-4 w-4 ml-auto" /> : <ChevronRight className="h-4 w-4 ml-auto" />)}
      </a>
      {hasChildren && isOpen && (
        <ul className="mt-1">
          {item.children?.map((child) => (
            <SidebarNavItem key={child.id} item={child} isSubItem />
          ))}
        </ul>
      )}
    </li>
  );
};

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  return (
    <div className={cn('fixed top-0 left-0 h-full w-64 bg-sidebar text-sidebar-foreground flex flex-col shadow-lg z-20', className)}>
      <div className="h-[70px] flex items-center justify-center px-6 border-b border-sidebar-foreground/10">
        <h1 className="text-2xl font-bold text-sidebar-foreground">VELZON</h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h2 className="px-4 mb-2 text-xs font-semibold uppercase text-sidebar-foreground/60 tracking-wider">Main Menu</h2>
          <ul>
            {mainMenuItems.map((item) => (
              <SidebarNavItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="px-4 mb-2 text-xs font-semibold uppercase text-sidebar-foreground/60 tracking-wider">Utilities</h2>
          <ul>
            {utilityMenuItems.map((item) => (
              <SidebarNavItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-sidebar-foreground/10">
         {/* User settings or footer can go here */}
         <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-foreground hover:text-sidebar">
            Logout
         </Button>
      </div>
    </div>
  );
};

export default SidebarNav;
