import { useQuery } from "@tanstack/react-query";

const chartTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
});

async function fetchCoinChart({ queryKey }) {
  const [, coinId] = queryKey;
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch chart data.");
  }

  const data = await response.json();

  return data.prices.map(([timestamp, price]) => ({
    time: chartTimeFormatter.format(new Date(timestamp)),
    timestamp,
    price,
  }));
}

export function useCoinChart(coinId) {
  return useQuery({
    queryKey: ["coinChart", coinId],
    queryFn: fetchCoinChart,
    refetchInterval: 15_000,
    staleTime: 10_000,
  });
}
