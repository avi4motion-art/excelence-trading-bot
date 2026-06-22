import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap, Target, AlertTriangle, Clock, DollarSign, CheckCircle, BarChart3, Activity } from 'lucide-react';

const DailyTradingDashboard = () => {
  const [topStocks, setTopStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [savedStocks, setSavedStocks] = useState(JSON.parse(localStorage.getItem('savedStocks') || '[]'));

  const dailyRecommendations = [
    {
      id: 1,
      symbol: 'NVDA',
      company: 'NVIDIA',
      currentPrice: 142.50,
      confidence: 92,
      weekTarget: 149,
      monthTarget: 165,
      entryZone: 140,
      stopLoss: 138.50,
      reason: 'RSI oversold (28), support at MA50, AI momentum',
    },
    {
      id: 2,
      symbol: 'MSFT',
      company: 'Microsoft',
      currentPrice: 418.75,
      confidence: 87,
      weekTarget: 435,
      monthTarget: 470,
      entryZone: 418,
      stopLoss: 410.00,
      reason: 'Cloud growth story, consolidating at support',
    },
    {
      id: 3,
      symbol: 'TSLA',
      company: 'Tesla',
      currentPrice: 238.30,
      confidence: 85,
      weekTarget: 260,
      monthTarget: 295,
      entryZone: 235,
      stopLoss: 230.00,
      reason: 'Extreme oversold, earnings catalyst',
    },
  ];

  useEffect(() => {
    setTopStocks(dailyRecommendations);
  }, []);

  const toggleSavedStock = (stock) => {
    const isAlreadySaved = savedStocks.find(s => s.symbol === stock.symbol);
    if (isAlreadySaved) {
      setSavedStocks(savedStocks.filter(s => s.symbol !== stock.symbol));
    } else {
      setSavedStocks([...savedStocks, stock]);
    }
  };

  useEffect(() => {
    localStorage.setItem('savedStocks', JSON.stringify(savedStocks));
  }, [savedStocks]);

  const StockCard = ({ stock, index }) => {
    const isSaved = savedStocks.find(s => s.symbol === stock.symbol);
    const isSelected = selectedStock?.symbol === stock.symbol;

    return (
      <div
        onClick={() => setSelectedStock(isSelected ? null : stock)}
        className={`cursor-pointer rounded-2xl p-6 transition-all transform hover:scale-105 ${
          isSelected
            ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400'
            : 'bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600 hover:border-cyan-400'
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-white">{stock.symbol}</h2>
            <p className="text-slate-400 text-sm mt-1">{stock.company}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSavedStock(stock);
            }}
            className="p-2 hover:bg-red-500/20 rounded-lg transition"
          >
            <CheckCircle
              size={24}
              className={isSaved ? 'fill-red-500 text-red-500' : 'text-slate-400'}
            />
          </button>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-slate-400 text-sm mb-1">Current Price</p>
            <p className="text-4xl font-bold text-white">${stock.currentPrice.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
              {stock.confidence}% Signal
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-slate-400 text-xs mb-1">WEEK TARGET</p>
            <p className="text-2xl font-bold text-green-400">${stock.weekTarget}</p>
            <p className="text-xs text-green-400 mt-1">+{((stock.weekTarget - stock.currentPrice) / stock.currentPrice * 100).toFixed(1)}%</p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-slate-400 text-xs mb-1">MONTH TARGET</p>
            <p className="text-2xl font-bold text-cyan-400">${stock.monthTarget}</p>
            <p className="text-xs text-cyan-400 mt-1">+{((stock.monthTarget - stock.currentPrice) / stock.currentPrice * 100).toFixed(1)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3 text-center">
            <p className="text-slate-400 text-xs">STOP LOSS</p>
            <p className="text-lg font-bold text-red-400">${stock.stopLoss}</p>
          </div>
          <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3 text-center">
            <p className="text-slate-400 text-xs">ENTRY</p>
            <p className="text-lg font-bold text-blue-400">${stock.entryZone}</p>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3 text-center">
            <p className="text-slate-400 text-xs">CONFIDENCE</p>
            <p className="text-lg font-bold text-yellow-400">{stock.confidence}%</p>
          </div>
        </div>
      </div>
    );
  };

  const DetailView = ({ stock }) => {
    return (
      <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-cyan-500/30 backdrop-blur">
        <h3 className="text-2xl font-bold text-white mb-4">📊 {stock.symbol} - Full Analysis</h3>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">{stock.reason}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-bold text-green-400 mb-3">✅ Why Buy Now?</h4>
            <ul className="space-y-2">
              <li className="text-slate-300 flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Technical Setup: RSI Oversold</span>
              </li>
              <li className="text-slate-300 flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Support Level Confirmation</span>
              </li>
              <li className="text-slate-300 flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Positive Catalysts Ahead</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-red-400 mb-3">⚠️ Watch Out For:</h4>
            <ul className="space-y-2">
              <li className="text-slate-300 flex items-start gap-2">
                <span className="text-red-400 mt-1">⚠</span>
                <span>Market Reversal</span>
              </li>
              <li className="text-slate-300 flex items-start gap-2">
                <span className="text-red-400 mt-1">⚠</span>
                <span>Earnings Risk</span>
              </li>
              <li className="text-slate-300 flex items-start gap-2">
                <span className="text-red-400 mt-1">⚠</span>
                <span>Sector Rotation</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <p className="text-blue-400 font-semibold mb-3">📈 Price Targets:</p>
          <div className="space-y-2 text-slate-300">
            <p>Week: ${stock.weekTarget} (+{((stock.weekTarget - stock.currentPrice) / stock.currentPrice * 100).toFixed(1)}%)</p>
            <p>Month: ${stock.monthTarget} (+{((stock.monthTarget - stock.currentPrice) / stock.currentPrice * 100).toFixed(1)}%)</p>
            <p>Stop Loss: ${stock.stopLoss}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6">
      <style>{`
        .glass { background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(10px); }
        .glow { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Daily Trading Picks
            </span>
          </h1>
          <p className="text-slate-400 text-lg">3 stocks with highest profit potential this week</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Avg Profit (Week)</p>
            <p className="text-3xl font-bold text-green-400">+5.9%</p>
          </div>
          <div className="glass rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Avg Confidence</p>
            <p className="text-3xl font-bold text-cyan-400">88%</p>
          </div>
          <div className="glass rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Signals Today</p>
            <p className="text-3xl font-bold text-yellow-400">3</p>
          </div>
          <div className="glass rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-1">Saved Stocks</p>
            <p className="text-3xl font-bold text-yellow-400">{savedStocks.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {topStocks.map((stock, index) => (
            <StockCard key={stock.id} stock={stock} index={index} />
          ))}
        </div>

        {selectedStock && (
          <div className="mb-8">
            <DetailView stock={selectedStock} />
          </div>
        )}

        {savedStocks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              💾 My Watchlist ({savedStocks.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedStocks.map(stock => (
                <div key={stock.symbol} className="glass rounded-lg p-4 border border-slate-600 hover:border-cyan-400 transition cursor-pointer"
                  onClick={() => setSelectedStock(stock)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-bold">{stock.symbol}</p>
                      <p className="text-slate-400 text-sm">${stock.currentPrice.toFixed(2)}</p>
                    </div>
                    <p className="text-green-400 font-bold">+5%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyTradingDashboard;
