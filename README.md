# HL-SIGNAL — Hyperliquid Perpetuals Dashboard

> A free, real-time trading dashboard for Hyperliquid perpetuals — signal screener, trade journal, alerts, and wallet sync. No login. No install. Open the file and go.

![HL-SIGNAL Dashboard](https://raw.githubusercontent.com/alexchan1028/hl-signal/main/preview.png)

---

## ✨ Features

### 📊 Live Screener
- **Top 50 markets** ranked by open interest, refreshed every 30 seconds
- **WebSocket live prices** — real-time mark price streaming via `wss://api.hyperliquid.xyz/ws`
- Funding rate with **annual APR** on mouseover
- 24h change, open interest, volume — all in one view
- ⭐ Watchlist to pin your favourite pairs

### 🧠 Signal Engine
- Multi-factor signal score per ticker: momentum, volume surge, RSI, CAN SLIM volume, funding-adjusted bias
- **LONG / SHORT / NEUTRAL** badge with numeric score
- Half-Kelly position sizing with ATR-based leverage suggestion
- Full trade setup builder (entry, stop-loss, take-profit, risk %)

### 🔔 Price & Signal Alerts
- Set **price above/below** or **signal threshold** alerts on any coin
- In-page toast notifications (works on `file://` with no browser permissions needed)
- OS notifications when available

### 🔗 Wallet Sync (Read-Only)
- Paste your Hyperliquid address → auto-pulls open positions
- Positions sync to your **Trade Journal** automatically
- No private key, no signing — read-only via public REST API
- Each wallet address gets its own isolated journal

### 📒 Trade Journal
- Log trades manually or sync from wallet
- Three-way sync: **update** existing / **add** new / **auto-close** orphaned positions
- Open positions with live unrealised PnL
- Full trade history with realised PnL, R:R ratio, PnL %

### 📊 Analytics Dashboard
- **Equity curve** — cumulative PnL line chart across all closed trades
- **Monthly PnL heatmap** — 12-month grid, green/red intensity by performance
- **Key stats** — win rate, profit factor, avg R:R, best/worst trade, avg hold time
- **PnL by coin** — horizontal bar chart of top performers
- CSV export

### 🎯 Target Tracker
- Set a profit target and starting balance
- Track progress toward your goal trade-by-trade

---

## 🚀 How to Use

**Zero installation.** This is a single HTML file.

```
1. Download index.html
2. Open it in Chrome or Firefox
3. Markets load automatically
```

Or use the hosted version: **https://alexchan1028.github.io/hl-signal/**

### Wallet Sync
1. Paste your `0x…` Hyperliquid wallet address in the top bar
2. Click **Sync →**
3. Open positions appear in your Journal automatically

### Setting Alerts
1. Click 🔔 in the top bar
2. Choose a coin, type (Price / Signal / Funding), condition, and value
3. Click **+ Add Alert** — you'll get a toast when it fires

---

## 🛠 Technical Details

| Property | Value |
|---|---|
| Stack | Vanilla JS, single HTML file |
| No build step | ✅ Just open the file |
| Data source | [Hyperliquid REST API](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api) |
| Live prices | WebSocket `wss://api.hyperliquid.xyz/ws` |
| Persistence | `localStorage` (stays in your browser) |
| Privacy | No servers, no tracking, no accounts |
| Chart library | [lightweight-charts v4](https://github.com/tradingview/lightweight-charts) |

---

## 📁 Project Structure

```
hl-signal/
└── index.html   ← the entire app (HTML + CSS + JS)
```

---

## ☕ Support

HL-SIGNAL is built and maintained by one person, completely free with no ads or paywalls.

If this dashboard has helped your trading, please consider a small donation — it keeps the project alive and improving.

**EVM Wallet (ETH / Arbitrum / Base / any EVM chain):**
```
0x21f923f18be7c9f4f1806fe101be7c0bdfefa071
```

Follow for updates and trade setups: **[@alexchan1028](https://x.com/alexchan1028)** on X

---

## 📜 Disclaimer

This dashboard is for **informational purposes only**. Signal scores are algorithmic indicators — not financial advice. Always do your own research and manage your risk. Crypto trading involves significant risk of loss.

---

## 🗺 Roadmap

- [ ] Discord webhook alert integration
- [ ] Multi-timeframe signal confluence (1H / 4H / 1D)
- [ ] PWA — install to desktop / mobile
- [ ] Liquidation heatmap overlay
- [ ] Portfolio cross-margin overview

---

*Made with ❤️ for the Hyperliquid community*
