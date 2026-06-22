
import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

const ExcelenceOrderFormat = () => {
  const [copySuccess, setCopySuccess] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const dailyPicks = [
    {
      symbol: 'NVDA',
      company: 'NVIDIA',
      currentPrice: 142.50,
      confidence: 92,
      
      excelenceOrder: {
        account_id: "YOUR_ACCOUNT_ID",
        symbol: "NVDA",
        side: "buy",
        quantity: 100,
        order_type: "limit",
        price: 140.00,
        time_in_force: "day",
        stop_loss: 138.50,
        comment: "Daily Pick: NVDA - RSI oversold (28), support at MA50, AI momentum. Target: $149 week, $165 month"
      },
      
      takeProfitOrders: [
        {
          account_id: "YOUR_ACCOUNT_ID",
          symbol: "NVDA",
          side: "sell",
          quantity: 50,
          order_type: "limit",
          price: 149.00,
          time_in_force: "gtc",
          comment: "Take profit 50% at week target (+4.6%)"
        },
        {
          account_id: "YOUR_ACCOUNT_ID",
          symbol: "NVDA",
          side: "sell",
          quantity: 50,
          order_type: "limit",
          price: 165.00,
          time_in_force: "gtc",
          comment: "Take profit rest at month target (+15.8%)"
        }
      ],

      weekTarget: 149,
      monthTarget: 165,
      stopLoss: 138.50,
      entryZone: 140,
      reason: 'RSI oversold (28), support at MA50, AI momentum'
    },

    {
      symbol: 'MSFT',
      company: 'Microsoft',
      currentPrice: 418.75,
      confidence: 87,
      
      excelenceOrder: {
        account_id: "YOUR_ACCOUNT_ID",
        symbol: "MSFT",
        side: "buy",
        quantity: 100,
        order_type: "limit",
        price: 418.00,
        time_in_force: "day",
        stop_loss: 410.00,
        comment: "Daily Pick: MSFT - Cloud growth story, consolidating at support. Target: $435 week, $470 month"
      },

      takeProfitOrders: [
        {
          account_id: "YOUR_ACCOUNT_ID",
          symbol: "MSFT",
          side: "sell",
          quantity: 50,
          order_type: "limit",
          price: 435.00,
          time_in_force: "gtc",
          comment: "Take profit 50% at week target (+3.9%)"
        },
        {
          account_id: "YOUR_ACCOUNT_ID",
          symbol: "MSFT",
          side: "sell",
          quantity: 50,
          order_type: "limit",
          price: 470.00,
          time_in_force: "gtc",
          comment: "Take profit rest at month target (+12.2%)"
        }
      ],

      weekTarget: 435,
      monthTarget: 470,
      stopLoss: 410.00,
      entryZone: 418,
      reason: 'Cloud growth, consolidating at support'
    },

    {
      symbol: 'TSLA',
      company: 'Tesla',
      currentPrice: 238.30,
      confidence: 85,
      
      excelenceOrder: {
        account_id: "YOUR_ACCOUNT_ID",
        symbol: "TSLA",
        side: "buy",
        quantity: 100,
        order_type: "limit",
        price: 235.00,
        time_in_force: "day",
        stop_loss: 230.00,
        comment: "Daily Pick: TSLA - Extreme oversold (RSI 26), earnings catalyst next week. Target: $260 week, $295 month"
      },

      takeProfitOrders: [
        {
          account_id: "YOUR_ACCOUNT_ID",
          symbol: "TSLA",
          side: "sell",
          quantity: 50,
          order_type: "limit",
          price: 260.00,
          time_in_force: "gtc",
          comment: "Take profit 50% at week target (+9.1%)"
        },
        {
          account_id: "YOUR_ACCOUNT_ID",
          symbol: "TSLA",
          side: "sell",
          quantity: 50,
          order_type: "limit",
          price: 295.00,
          time_in_force: "gtc",
          comment: "Take profit rest at month target (+23.8%)"
        }
      ],

      weekTarget: 260,
      monthTarget: 295,
      stopLoss: 230.00,
      entryZone: 235,
      reason: 'Extreme oversold, earnings catalyst'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6">
      <style>{`
        .glass { background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(10px); }
        .code-block {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 8px;
          padding: 16px;
          overflow-x: auto;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.5;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Excelence Order Format
            </span>
          </h1>
          <p className="text-slate-400 text-lg">בדיוק כמו Excelence מצפה - Copy-Paste Ready</p>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">🎯 Daily Picks - Ready for Excelence</h2>

          {dailyPicks.map(stock => (
            <div key={stock.symbol} className="glass rounded-xl p-8 border border-slate-600 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-cyan-400">{stock.symbol}</h3>
                  <p className="text-slate-400">{stock.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${stock.currentPrice.toFixed(2)}</p>
                  <p className="text-green-400 font-bold">{stock.confidence}% Signal</p>
                </div>
              </div>

              {/* ENTRY ORDER */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-green-400 mb-3">✅ BUY ORDER (Entry)</h4>
                <div className="bg-slate-800/50 rounded-lg p-4 mb-3">
                  <div className="code-block">
                    {JSON.stringify(stock.excelenceOrder, null, 2)}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(stock.excelenceOrder), `${stock.symbol}-buy`)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded flex items-center gap-2 text-sm"
                >
                  <Copy size={16} /> Copy Entry Order
                </button>
              </div>

              {/* TAKE PROFIT ORDERS */}
              <div>
                <h4 className="text-lg font-bold text-cyan-400 mb-3">📈 TAKE PROFIT ORDERS (Exit)</h4>
                {stock.takeProfitOrders.map((tpOrder, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="text-sm text-slate-400 mb-2">
                      {idx === 0 ? `50% at Week Target ($${stock.weekTarget})` : `50% at Month Target ($${stock.monthTarget})`}
                    </p>
                    <div className="bg-slate-800/50 rounded-lg p-4 mb-2">
                      <div className="code-block text-xs">
                        {JSON.stringify(tpOrder, null, 2)}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(tpOrder), `${stock.symbol}-tp-${idx}`)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded flex items-center gap-2 text-sm"
                    >
                      <Copy size={16} /> Copy Order
                    </button>
                  </div>
                ))}
              </div>

              {/* SUMMARY */}
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                <p className="text-blue-400 font-semibold mb-2">📊 Summary</p>
                <div className="text-sm space-y-1 text-slate-300">
                  <p>Entry: ${stock.entryZone}</p>
                  <p>Stop Loss: ${stock.stopLoss}</p>
                  <p>Week Target: ${stock.weekTarget}</p>
                  <p>Month Target: ${stock.monthTarget}</p>
                  <p>Reason: {stock.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INSTRUCTIONS */}
        <div className="glass rounded-xl p-8 border border-green-600/30 bg-green-900/20">
          <h2 className="text-2xl font-bold text-green-400 mb-4">✅ How to Use</h2>
          <ol className="space-y-3 text-slate-300">
            <li>1. <strong>Copy Entry Order</strong> - Click button above</li>
            <li>2. <strong>Go to Excelence</strong> - Open your trading platform</li>
            <li>3. <strong>Replace YOUR_ACCOUNT_ID</strong> - Paste your actual account ID</li>
            <li>4. <strong>Paste Order</strong> - Paste into Excelence API or order form</li>
            <li>5. <strong>Send Order</strong> - Submit to execute</li>
            <li>6. <strong>Set Take Profits</strong> - After order fills, send TP orders</li>
          </ol>

          <p className="text-slate-400 mt-6 text-sm">
            💡 Tip: All orders are in Excelence's native format. You can copy-paste directly into their system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExcelenceOrderFormat;
