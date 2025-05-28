import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area
} from 'recharts';

// Simplified Candlestick Data Structure
interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const generateCandlestickData = (numPoints: number): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let lastClose = 100;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - numPoints);

  for (let i = 0; i < numPoints; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const open = lastClose + (Math.random() - 0.5) * 5; // Open around last close
    const close = open + (Math.random() - 0.5) * 10;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;
    lastClose = close;
    data.push({
      time: `${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });
  }
  // Add some more volatility
  if (data.length > 10) {
    data[Math.floor(data.length / 3)].high *= 1.1;
    data[Math.floor(data.length / 3)].low *= 0.9;
    data[Math.floor(data.length * 2 / 3)].high *= 1.15;
    data[Math.floor(data.length * 2 / 3)].low *= 0.85;
  }
  return data;
};

const marketData: CandlestickData[] = generateCandlestickData(50);

const timeRanges = ['1H', '1D', '7D', '1M', '1Y', 'ALL'] as const;
type TimeRange = typeof timeRanges[number];

interface MarketGraphWidgetProps {
  className?: string;
}

const MarketGraphWidget: React.FC<MarketGraphWidgetProps> = ({ className }) => {
  const [activeTimeRange, setActiveTimeRange] = React.useState<TimeRange>('1M');

  // Filter data based on time range (simplified for demo)
  const currentData = React.useMemo(() => {
    // This is a placeholder for actual time range filtering logic
    // For a real app, this would fetch or slice data appropriately
    switch (activeTimeRange) {
      case '1H': return marketData.slice(-7); // Example: last 7 points for '1H'
      case '1D': return marketData.slice(-15); // Example: last 15 points for '1D'
      case '7D': return marketData.slice(-20);
      case '1M': return marketData.slice(-30);
      case '1Y': return marketData;
      case 'ALL': return marketData;
      default: return marketData;
    }
  }, [activeTimeRange]);

  const lastDataPoint = currentData[currentData.length - 1];

  // Custom Tooltip for chart
  const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as CandlestickData;
      return (
        <div className="bg-background p-3 border border-border rounded shadow-lg text-sm">
          <p className="font-bold text-card-foreground mb-1">{`Time: ${label}`}</p>
          <p className="text-muted-foreground">{`Open: $${data.open.toFixed(2)}`}</p>
          <p className="text-muted-foreground">{`High: $${data.high.toFixed(2)}`}</p>
          <p className="text-muted-foreground">{`Low: $${data.low.toFixed(2)}`}</p>
          <p className="text-primary font-medium">{`Close: $${data.close.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn('shadow', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold mb-2 sm:mb-0">Market Graph</CardTitle>
          <ToggleGroup 
            type="single" 
            defaultValue="1M" 
            value={activeTimeRange} 
            onValueChange={(value: TimeRange) => {if (value) setActiveTimeRange(value)}}
            className="justify-start sm:justify-end"
            size="sm"
          >
            {timeRanges.map((range) => (
              <ToggleGroupItem key={range} value={range} className="px-2.5 py-1 text-xs md:px-3 md:py-1.5">
                {range}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
          <span className="text-2xl font-bold text-card-foreground">
            {lastDataPoint ? `$${lastDataPoint.close.toFixed(4)}` : '$--.--'}
          </span>
          <span className="text-accent-green">+1.99%</span> {/* Placeholder value */}
          <span className="text-muted-foreground">
            High: <span className="text-card-foreground font-medium">{lastDataPoint ? `$${lastDataPoint.high.toFixed(4)}` : '$--.--'}</span>
          </span>
          <span className="text-muted-foreground">
            Low: <span className="text-card-foreground font-medium">{lastDataPoint ? `$${lastDataPoint.low.toFixed(4)}` : '$--.--'}</span>
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {/* Using LineChart as a robust alternative. A true CandlestickChart in Recharts is more complex. */}
            {/* To implement Candlestick: use ComposedChart with custom Bar shapes for body & wicks or multiple Bar series.*/}
            <ComposedChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false}/>
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis 
                orientation="right" 
                domain={['dataMin - 5', 'dataMax + 5']} 
                tickFormatter={(value) => `$${value.toFixed(0)}`} 
                tick={{ fontSize: 12 }} 
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="close" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorClose)" strokeWidth={2} />
              <Line type="monotone" dataKey="close" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
               {/* For a simplified candlestick visual, you could add Bar components here: */}
               {/* <Bar dataKey="open" fill="#8884d8" /> */}
               {/* <Bar dataKey="close" fill="#82ca9d" /> */}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex justify-around text-center border-t border-border pt-4">
            <div>
                <p className="text-xs text-muted-foreground">Total Balance</p>
                <p className="text-lg font-semibold text-card-foreground">$72.8k</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground">Profit</p>
                <p className="text-lg font-semibold text-accent-green">+$49.7k</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground">Loss</p>
                <p className="text-lg font-semibold text-accent-red">-$23.1k</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketGraphWidget;
