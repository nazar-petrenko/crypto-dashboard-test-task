import { Alert, Card, Typography } from "antd";
import CoinsTable from "../components/CoinsTable.jsx";
import { useCoins } from "../hooks/useCoins.js";

const { Paragraph, Title } = Typography;

function CoinsPage() {
    const { data = [], isLoading, isError, error } = useCoins();

    return (
        <Card>
            <Title level={2}>Cryptocurrency Table</Title>
            <Paragraph type="secondary">
                Top 50 coins from CoinGecko with client-side sorting.
            </Paragraph>
            {isError ? (
                <Alert
                    type="error"
                    showIcon
                    message="Unable to load cryptocurrency data."
                    description={error.message}
                />
            ) : (
                <CoinsTable coins={data} loading={isLoading} />
            )}
        </Card>
    );
}

export default CoinsPage;
