import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpCircle, ArrowDownCircle, DollarSign, BarChartBig } from 'lucide-react';

interface StatCardData {
  id: string;
  title: string;
  value: string;
  percentageChange: number;
  icon: React.ElementType;
  iconBgColor: string;
}

const statsData: StatCardData[] = [
  {
    id: 'total_invested',
    title: 'TOTAL INVESTED',
    value: '$2,390.68',
    percentageChange: 6.24,
    icon: DollarSign,
    iconBgColor: 'bg-blue-100 dark:bg-blue-900',
  },
  {
    id: 'total_change',
    title: 'TOTAL CHANGE',
    value: '$19,523.25',
    percentageChange: 3.67,
    icon: ArrowUpCircle,
    iconBgColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    id: 'day_change',
    title: 'DAY CHANGE',
    value: '$14,799.44',
    percentageChange: -4.80,
    icon: ArrowDownCircle,
    iconBgColor: 'bg-red-100 dark:bg-red-900',
  },
  {
    id: 'volume_24h',
    title: 'VOLUME 24H',
    value: '$7,832,190.12',
    percentageChange: 1.52,
    icon: BarChartBig,
    iconBgColor: 'bg-yellow-100 dark:bg-yellow-900',
  },
];

interface StatCardProps {
  data: StatCardData;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ data, className }) => {
  const isPositiveChange = data.percentageChange >= 0;
  const IconComponent = data.icon;

  return (
    <Card className={cn('shadow', className)}>
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {data.title}
          </p>
          <h3 className="text-2xl font-bold text-card-foreground mt-1">{data.value}</h3>
          <div className={cn(
            'text-xs mt-2 flex items-center',
            isPositiveChange ? 'text-accent-green' : 'text-accent-red'
          )}>
            {isPositiveChange ? 
              <ArrowUpCircle className="h-3.5 w-3.5 mr-1" /> : 
              <ArrowDownCircle className="h-3.5 w-3.5 mr-1" />
            }
            <span>{Math.abs(data.percentageChange).toFixed(2)}%</span>
            <span className="text-muted-foreground ml-1">vs last month</span>
          </div>
        </div>
        <div className={cn('p-3 rounded-full', data.iconBgColor)}>
          <IconComponent className={cn(
            'h-6 w-6',
            isPositiveChange && data.id !== 'total_invested' && data.id !== 'volume_24h' ? 'text-accent-green' : 
            !isPositiveChange && data.id !== 'total_invested' && data.id !== 'volume_24h' ? 'text-accent-red' : 
            data.id === 'total_invested' ? 'text-blue-500' : 'text-yellow-500'
          )} />
        </div>
      </CardContent>
    </Card>
  );
};

interface CryptoOverviewStatCardsProps {
  className?: string;
}

const CryptoOverviewStatCards: React.FC<CryptoOverviewStatCardsProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {statsData.map((stat) => (
        <StatCard key={stat.id} data={stat} />
      ))}
    </div>
  );
};

export default CryptoOverviewStatCards;
