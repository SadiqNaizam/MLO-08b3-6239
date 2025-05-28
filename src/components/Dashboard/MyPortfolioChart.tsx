import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { Bitcoin, Coins, Gem, CircleDollarSign } from 'lucide-react'; // Using CircleDollarSign for Dash

interface PortfolioItem {
  name: string;
  value: number; // USD value
  cryptoAmount: string;
  ticker: string;
  color: string;
  icon: React.ElementType;
}

const portfolioData: PortfolioItem[] = [
  {
    name: 'Bitcoin',
    value: 46503.42, // Example: 45% of $106416 (approx)
    cryptoAmount: '0.00584875 BTC',
    ticker: 'BTC',
    color: '#FF9900', // Orange
    icon: Bitcoin,
  },
  {
    name: 'Ethereum',
    value: 30860.64, // Example: 30% 
    cryptoAmount: '2.25842108 ETH',
    ticker: 'ETH',
    color: '#627EEA', // Purple-ish blue
    icon: Gem,
  },
  {
    name: 'Litecoin',
    value: 15962.40, // Example: 15%
    cryptoAmount: '10.58963217 LTC',
    ticker: 'LTC',
    color: '#cccccc', // Silver/gray
    icon: Coins,
  },
  {
    name: 'Dash',
    value: 13019.54, // Example: 10%
    cryptoAmount: '204.28565885 DASH',
    ticker: 'DASH',
    color: '#0074D9', // Blue
    icon: CircleDollarSign, // Using a generic icon for Dash
  },
];

const totalPortfolioValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

interface MyPortfolioChartProps {
  className?: string;
}

const MyPortfolioChart: React.FC<MyPortfolioChartProps> = ({ className }) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<string>('btc');

  const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border border-border rounded shadow-lg">
          <p className="text-sm font-medium">{`${payload[0].name}: $${payload[0].value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="mt-4 space-y-3">
        {payload.map((entry: any, index: number) => {
          const item = portfolioData[index];
          const Icon = item.icon;
          return (
          <li key={`item-${index}`} className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Icon className="h-5 w-5 mr-2" style={{ color: entry.color }} />
              <span className="text-card-foreground">{item.name}</span>
              <span className="text-muted-foreground ml-1.5">({item.ticker})</span>
            </div>
            <div className="text-right">
                <p className="font-medium text-card-foreground">{item.cryptoAmount}</p>
                <p className="text-xs text-muted-foreground">${item.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </div>
          </li>
        );}
      )}
      </ul>
    );
  };

  return (
    <Card className={cn('shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">My Portfolio</CardTitle>
        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
          <SelectTrigger className="w-[100px] h-8 text-xs">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="btc">BTC</SelectItem>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="eth">ETH</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-5">
        <div className="h-[250px] w-full relative mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="100%"
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                stroke="hsl(var(--card))" // Use card background for stroke to create separation
                strokeWidth={3}
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold text-card-foreground">
              ${totalPortfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </p>
          </div>
        </div>
        <Legend content={renderLegend} />
      </CardContent>
    </Card>
  );
};

export default MyPortfolioChart;
