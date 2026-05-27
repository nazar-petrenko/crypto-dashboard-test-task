import { Avatar, Space, Table, Typography } from "antd";
import {
    formatCompactUsd,
    formatPercentage,
    formatUsdPrice,
} from "../utils/formatters.js";

const changeColors = {
    positive: "#389e0d",
    negative: "#cf1322",
    neutral: "inherit",
};

const columns = [
    {
        title: "#",
        dataIndex: "market_cap_rank",
        key: "market_cap_rank",
        sorter: (a, b) => a.market_cap_rank - b.market_cap_rank,
        defaultSortOrder: "ascend",
        width: 90,
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (_, coin) => (
            <Space size="middle">
                <Avatar src={coin.image} alt={coin.name} />
                <Space orientation="vertical" size={0}>
                    <Typography.Text strong>{coin.name}</Typography.Text>
                    <Typography.Text type="secondary">
                        {coin.symbol.toUpperCase()}
                    </Typography.Text>
                </Space>
            </Space>
        ),
    },
    {
        title: "Price",
        dataIndex: "current_price",
        key: "current_price",
        sorter: (a, b) => a.current_price - b.current_price,
        align: "right",
        render: (value) => formatUsdPrice(value),
    },
    {
        title: "24h %",
        dataIndex: "price_change_percentage_24h",
        key: "price_change_percentage_24h",
        sorter: (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h,
        align: "right",
        render: (value) => {
            const color =
                value > 0
                    ? changeColors.positive
                    : value < 0
                      ? changeColors.negative
                      : changeColors.neutral;

            return <span style={{ color }}>{formatPercentage(value)}</span>;
        },
    },
    {
        title: "Market Cap",
        dataIndex: "market_cap",
        key: "market_cap",
        sorter: (a, b) => a.market_cap - b.market_cap,
        align: "right",
        render: (value) => formatCompactUsd(value),
    },
    {
        title: "Volume 24h",
        dataIndex: "total_volume",
        key: "total_volume",
        sorter: (a, b) => a.total_volume - b.total_volume,
        align: "right",
        render: (value) => formatCompactUsd(value),
    },
];

function CoinsTable({
    coins = [],
    loading = false,
    pagination = false,
    onChange,
    scrollY = 640,
}) {
    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={coins}
            loading={loading}
            pagination={pagination}
            onChange={onChange}
            scroll={{ y: scrollY }}
        />
    );
}

export default CoinsTable;
