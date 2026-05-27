import { useState } from "react";
import { Alert, Card, Typography } from "antd";
import CoinsTable from "../components/CoinsTable.jsx";
import { useCoins } from "../hooks/useCoins.js";

const { Paragraph, Title } = Typography;

const pageSize = 20;
const totalCoins = 400;

function CoinsPagedPage() {
    const [page, setPage] = useState(1);
    const { data = [], isLoading, isFetching, isError, error } = useCoins({
        page,
        perPage: pageSize,
    });

    return (
        <Card>
            <Title level={2}>Paginated Coins</Title>
            <Paragraph type="secondary">
                CoinGecko market data loaded page by page.
            </Paragraph>
            {isError ? (
                <Alert
                    type="error"
                    showIcon
                    message="Unable to load cryptocurrency data."
                    description={error.message}
                />
            ) : (
                <CoinsTable
                    coins={data}
                    loading={isLoading || isFetching}
                    pagination={{
                        current: page,
                        pageSize,
                        total: totalCoins,
                        showSizeChanger: false,
                        onChange: setPage,
                    }}
                />
            )}
        </Card>
    );
}

export default CoinsPagedPage;
