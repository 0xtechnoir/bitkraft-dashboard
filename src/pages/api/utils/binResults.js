import axios from "axios";

export const TOTAL_BINS = 20;

// export interface Liq {
//   owner: string;
//   liqPrice: number;
//   collateral: string;
//   collateralAmount: string;
//   extra?: {
//     displayName?: string;
//     url: string;
//   };
// }

// export interface Bins {
//   [token: string]: {
//     bins: {
//       [bin: number]: number;
//     };
//     binSize: number;
//     price: number;
//   };
// }

export async function binResults(liqs) {
  const tokens = new Set();
  liqs.map((liq) => tokens.add(liq.collateral.toLowerCase()));
  const prices = (
    await axios.post("https://coins.llama.fi/prices", {
      coins: Array.from(tokens),
    })
  )
  console.log(prices);
  const bins = Object.values(prices).reduce(
    (all, token) => ({
      ...all,
      token: {
        bins: {},
        binSize: token.price / TOTAL_BINS,
        price: token.price,
      },
    })
  );
  const skippedTokens = new Set();
  liqs.map((liq) => {
    const tokenAddress = liq.collateral.toLowerCase();
    const token = prices[tokenAddress];
    if (token === undefined) {
      skippedTokens.add(tokenAddress);
      return;
    }
    const binSize = bins[token.symbol].binSize;
    const bin = Math.floor(liq.liqPrice / binSize);
    if (bins[token.symbol].bins[bin] === undefined) {
      bins[token.symbol].bins[bin] = 0;
    }
    bins[token.symbol].bins[bin] += Number(liq.collateralAmount) / 10 ** token.decimals;
  });
  return { skippedTokens, bins };
}