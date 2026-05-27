import { keepPreviousData, useQuery } from "@tanstack/react-query";

async function fetchCoins({ queryKey }) {
    const [, params] = queryKey;
    const searchParams = new URLSearchParams({
        vs_currency: params.vsCurrency,
        per_page: String(params.perPage),
        page: String(params.page),
    });

    const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?${searchParams.toString()}`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch coins.");
    }

    return response.json();
}

export function useCoins(options = {}) {
    const { vsCurrency = "usd", perPage = 50, page = 1 } = options;

    return useQuery({
        queryKey: ["coins", { vsCurrency, perPage, page }],
        queryFn: fetchCoins,
        placeholderData: keepPreviousData,
        staleTime: 30_000,
    });
}
