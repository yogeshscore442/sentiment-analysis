import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockSentimentStats, mockTrendData, mockWordFrequency } from '@/data/mockData';
import type { SentimentStats, TrendData, WordFrequency } from '@/services/api';

interface ChartSectionProps {
  sentimentStats?: SentimentStats;
  trendData?: TrendData[];
  wordFrequency?: WordFrequency[];
}

const COLORS = {
  positive: 'hsl(142, 76%, 36%)',
  negative: 'hsl(0, 84%, 60%)',
  neutral: 'hsl(38, 92%, 50%)',
};

const ChartSection = ({
  sentimentStats = mockSentimentStats,
  trendData = mockTrendData,
  wordFrequency = mockWordFrequency,
}: ChartSectionProps) => {
  const pieData = useMemo(() => [
    { name: 'Positive', value: sentimentStats.positive, color: COLORS.positive },
    { name: 'Negative', value: sentimentStats.negative, color: COLORS.negative },
    { name: 'Neutral', value: sentimentStats.neutral, color: COLORS.neutral },
  ], [sentimentStats]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-sm mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-positive-muted border-positive/20">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-positive">
              {sentimentStats.positive.toLocaleString()}
            </div>
            <p className="text-sm text-positive/80">Positive Reviews</p>
          </CardContent>
        </Card>
        <Card className="bg-negative-muted border-negative/20">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-negative">
              {sentimentStats.negative.toLocaleString()}
            </div>
            <p className="text-sm text-negative/80">Negative Reviews</p>
          </CardContent>
        </Card>
        <Card className="bg-neutral-muted border-neutral/20">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-neutral">
              {sentimentStats.neutral.toLocaleString()}
            </div>
            <p className="text-sm text-neutral/80">Neutral Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">
              {sentimentStats.averageRating.toFixed(1)} ★
            </div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="distribution" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="words">Word Cloud</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sentiment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sentiment Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pieData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sentiment Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      }
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="positive"
                      stroke={COLORS.positive}
                      strokeWidth={2}
                      dot={false}
                      name="Positive"
                    />
                    <Line
                      type="monotone"
                      dataKey="negative"
                      stroke={COLORS.negative}
                      strokeWidth={2}
                      dot={false}
                      name="Negative"
                    />
                    <Line
                      type="monotone"
                      dataKey="neutral"
                      stroke={COLORS.neutral}
                      strokeWidth={2}
                      dot={false}
                      name="Neutral"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="words">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Most Frequent Words</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wordFrequency.slice(0, 10)} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="word"
                      type="category"
                      width={100}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="count"
                      fill="hsl(217, 91%, 60%)"
                      radius={[0, 4, 4, 0]}
                      name="Mentions"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChartSection;