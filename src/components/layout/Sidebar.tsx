import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, toggleSidebar, className }) => {
  return (
    <>
      {/* Backdrop for mobile, appears when sidebar is open */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[15] bg-black/50 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* 
        SidebarNav is already a fixed component with its own base styling (width, height, bg, z-index).
        The className prop passed here adds transform utilities for mobile slide-in/out behavior.
        - SidebarNav's z-index is 20 (from its own definition).
        - Header's z-index is 10 (from TopHeader's definition).
        - Backdrop's z-index is 15, correctly placing it between Header and SidebarNav on mobile.
      */}
      <SidebarNav
        className={cn(
          'transition-transform duration-300 ease-in-out',
          'md:translate-x-0', // Ensures sidebar is visible and correctly positioned on md+ screens
          isMobileOpen ? 'translate-x-0' : '-translate-x-full', // Controls slide-in/out on smaller screens
          className
        )}
      />
    </>
  );
};

export default Sidebar;