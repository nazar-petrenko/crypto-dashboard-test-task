const usdPriceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

const compactUsdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

export function formatUsdPrice(value) {
    if (typeof value !== "number") {
        return "-";
    }

    return usdPriceFormatter.format(value);
}

export function formatPercentage(value) {
    if (typeof value !== "number") {
        return "-";
    }

    return `${percentFormatter.format(value)}%`;
}

export function formatCompactUsd(value) {
    if (typeof value !== "number") {
        return "-";
    }

    return compactUsdFormatter.format(value);
}
