import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bitcoin, Gem, Coins, Landmark, Gauge, MoreHorizontal, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

interface CryptoStat {
  id: string;
  name: string;
  ticker: string;
  icon: React.ElementType;
  iconColor: string;
  price: string;
  change: number; // Percentage
  sparklineData: { value: number }[];
}

const generateSparklineData = (points: number, base: number, volatility: number): { value: number }[] => {
  const data = [];
  let lastVal = base;
  for (let i = 0; i < points; i++) {
    lastVal += (Math.random() - 0.5) * volatility;
    lastVal = Math.max(0, lastVal); // Ensure no negative values
    data.push({ value: parseFloat(lastVal.toFixed(2)) });
  }
  return data;
};

const cryptoStatsData: CryptoStat[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    ticker: 'BTC',
    icon: Bitcoin,
    iconColor: 'text-orange-500',
    price: '$1,523,647',
    change: 13.11,
    sparklineData: generateSparklineData(15, 50, 10),
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    ticker: 'LTC',
    icon: Coins,
    iconColor: 'text-gray-500',
    price: '$2,145,687',
    change: 15.08,
    sparklineData: generateSparklineData(15, 60, 12),
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    ticker: 'ETC', // Note: image uses ETC, commonly ETH for Ethereum
    icon: Gem,
    iconColor: 'text-indigo-500',
    price: '$3,312,870',
    change: 8.57,
    sparklineData: generateSparklineData(15, 70, 8),
  },
  {
    id: 'binance',
    name: 'Binance',
    ticker: 'BNB',
    icon: Landmark,
    iconColor: 'text-yellow-500',
    price: '$1,820,045',
    change: -9.21,
    sparklineData: generateSparklineData(15, 40, 15),
  },
  {
    id: 'dash',
    name: 'Dash',
    ticker: 'DASH',
    icon: Gauge, // Using Gauge as a stand-in, as seen in some UIs for Dash
    iconColor: 'text-blue-500',
    price: '$9,458,153',
    change: 12.07,
    sparklineData: generateSparklineData(15, 80, 5),
  },
];

interface CryptoStatCardProps {
  stat: CryptoStat;
}

const CryptoStatCard: React.FC<CryptoStatCardProps> = ({ stat }) => {
  const isPositiveChange = stat.change >= 0;
  const IconComponent = stat.icon;

  return (
    <Card className="shadow overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
        <div className="flex items-center space-x-2">
          <IconComponent className={cn('h-7 w-7', stat.iconColor)} />
          <h3 className="font-medium text-card-foreground text-base">{stat.name}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Trade</DropdownMenuItem>
            <DropdownMenuItem>Add to Watchlist</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="text-2xl font-bold text-card-foreground">{stat.price}</div>
        <div className={cn(
            'text-xs flex items-center mt-1',
            isPositiveChange ? 'text-accent-green' : 'text-accent-red'
          )}>
          {isPositiveChange ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          <span>{Math.abs(stat.change).toFixed(2)}%</span>
          <span className="text-muted-foreground ml-1">({stat.ticker})</span>
        </div>
        <div className="h-16 mt-4 -mx-5 -mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stat.sparklineData}>
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                labelStyle={{ display: 'none' }}
                itemStyle={{ color: isPositiveChange ? 'hsl(var(--prd-accent-green))' : 'hsl(var(--prd-accent-red))' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, null]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositiveChange ? 'hsl(var(--prd-accent-green))' : 'hsl(var(--prd-accent-red))'}
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

interface CryptoStatCardGridProps {
  className?: string;
}

const CryptoStatCardGrid: React.FC<CryptoStatCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6', className)}>
      {cryptoStatsData.map((stat) => (
        <CryptoStatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};

export default CryptoStatCardGrid;
