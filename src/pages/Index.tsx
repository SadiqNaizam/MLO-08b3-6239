import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import CryptoOverviewStatCards from '@/components/Dashboard/CryptoOverviewStatCards';
import MyPortfolioChart from '@/components/Dashboard/MyPortfolioChart';
import MarketGraphWidget from '@/components/Dashboard/MarketGraphWidget';
import CryptoStatCardGrid from '@/components/Dashboard/CryptoStatCardGrid';

/**
 * IndexPage serves as the main dashboard page, specifically the Crypto Overview Dashboard.
 * It utilizes AdminLayout to provide the overall page structure (sidebar, header, main content area)
 * and then populates the main content area with various crypto-related widgets.
 */
const IndexPage: React.FC = () => {
  return (
    <AdminLayout>
      {/* Subtle page/section title, as seen in the reference image below the main header. */}
      <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-4 tracking-wider">
        Crypto
      </h2>
      
      {/* Main content container with vertical spacing between widget sections. */}
      <div className="space-y-6">
        {/* First row: Overview statistic cards. This component handles its own internal grid. */}
        <CryptoOverviewStatCards />

        {/* Second row: Portfolio chart and Market graph, arranged in a responsive grid.
            On large screens (lg), MyPortfolioChart takes 1/3 and MarketGraphWidget takes 2/3 of the width.
            On smaller screens, they stack vertically. 
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MyPortfolioChart className="lg:col-span-1" />
          <MarketGraphWidget className="lg:col-span-2" />
        </div>

        {/* Third row: Grid of individual cryptocurrency statistic cards. This component handles its own internal grid. */}
        <CryptoStatCardGrid />
      </div>
    </AdminLayout>
  );
};

export default IndexPage;
