import { useState } from "react";
import { Alert, Button, Card, Segmented, Space, Spin, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCoinChart } from "../hooks/useCoinChart.js";
import { formatUsdPrice } from "../utils/formatters.js";

const { Paragraph, Title } = Typography;

const coins = [
  { label: "Bitcoin", value: "bitcoin" },
  { label: "Ethereum", value: "ethereum" },
  { label: "Dogecoin", value: "dogecoin" },
];

function ChartPage() {
  const [coinId, setCoinId] = useState("bitcoin");
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useCoinChart(coinId);

  async function handleRefresh() {
    setIsManualRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsManualRefreshing(false);
    }
  }

  const showChartLoader = isLoading || isManualRefreshing;

  return (
    <Card>
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <Space
          align="start"
          style={{
            width: "100%",
            justifyContent: "space-between",
            gap: 16,
          }}
          wrap
        >
          <div>
            <Title level={2}>Price Chart</Title>
            <Paragraph type="secondary">
              Last 7 days of market price from CoinGecko.
            </Paragraph>
          </div>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            loading={isManualRefreshing}
            onClick={handleRefresh}
          >
            Оновити
          </Button>
        </Space>

        <Segmented options={coins} value={coinId} onChange={setCoinId} />

        {isError ? (
          <Alert
            type="error"
            showIcon
            message="Unable to load chart data."
            description={error.message}
          />
        ) : (
          <Spin spinning={showChartLoader}>
            <div
              style={{
                width: "100%",
                minWidth: 0,
                height: 420,
                minHeight: 420,
              }}
            >
              {data.length > 0 && (
                <ResponsiveContainer width="100%" height={420}>
                  <LineChart
                    data={data}
                    margin={{
                      top: 16,
                      right: 24,
                      bottom: 8,
                      left: 8,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" minTickGap={32} tickLine={false} />
                    <YAxis
                      tickFormatter={(value) => formatUsdPrice(value)}
                      width={96}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value) => [formatUsdPrice(value), "Price"]}
                      labelFormatter={(label) => label}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#1677ff"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </Spin>
        )}
      </Space>
    </Card>
  );
}

export default ChartPage;
