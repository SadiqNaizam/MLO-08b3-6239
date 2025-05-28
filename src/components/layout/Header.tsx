import React from 'react';
import TopHeader from '../Dashboard/TopHeader';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleSidebar: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, className }) => {
  // The TopHeader component, as per context code, handles its own fixed positioning,
  // height, background, z-index, and responsive left margin (md:left-64) 
  // to accommodate the sidebar on larger screens.
  // This Header component primarily acts as a wrapper to pass down necessary props.
  return (
    <TopHeader
      onToggleSidebar={onToggleSidebar}
      className={cn(className)} // Allows for additional styling if needed
    />
  );
};

export default Header;