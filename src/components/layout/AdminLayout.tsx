import React, { useState, useCallback, ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
  className?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, className }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        toggleSidebar={toggleMobileSidebar} 
      />
      
      {/* Header is fixed. Its positioning (top, left, right, height, z-index) 
          is managed by the TopHeader component itself. 
          Notably, TopHeader uses `md:left-64` to align correctly next to the sidebar on desktop. */}
      <Header onToggleSidebar={toggleMobileSidebar} />

      {/* 
        Main content area configuration:
        - `mt-[70px]`: Accounts for the fixed header's height (h-[70px]).
        - `md:ml-64`: Accounts for the fixed sidebar's width (w-64) on medium screens and up.
        - `p-6`: Standard padding for the content within the main area.
        - `min-h-[calc(100vh-70px)]`: Ensures the main content area (below the header) 
          can fill the remaining viewport height, useful for sticky footers or full-height content.
        - `overflow-y-auto`: Enables scrolling for content that exceeds the viewport height.
        - `min-w-0`: Essential for flexbox or grid children to prevent them from overflowing 
          the main content area if their content is too wide.
        - `transition-all`: Added for potential future layout shifts, though not strictly necessary 
          for current margin-based adjustments.
      */}
      <main className={cn(
        "transition-all duration-300 ease-in-out",
        "mt-[70px]", 
        "md:ml-64",
        "p-6", 
        "min-h-[calc(100vh-70px)]", 
        "overflow-y-auto",
        "min-w-0"
      )}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;