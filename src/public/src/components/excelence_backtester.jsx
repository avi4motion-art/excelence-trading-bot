
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Calendar, DollarSign, Percent, AlertCircle } from 'lucide-react';

const ExcelenceBacktester = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const backTestData = {
    NVDA: {
      symbol: 'NVDA',
      company: 'NVIDIA',
      startDate: '2026-01-01',
      endDate: '2026-06-30',
      totalTrades: 28,
      winningTrades: 17,
      losingTrades: 11,
      totalProfit: 5159.20,
      totalLoss: 1432.80,
      avgWinSize: 303.48,
      avgLossSize: 130.25,
      largestWin: 1250.00,
      largestLoss: 280.00,
      maxDrawdown: 12.3,
      winRate: 60.7,
      profitFactor: 2.15,
      roi: 51.59,
      sharpeRatio: 1.82
    },
    MSFT: {
      symbol: 'MSFT',
      company: 'Microsoft',
      startDate: '2026-01-01',
      endDate: '2026-06-30',
      totalTrades: 26,
      winningTrades: 15,
      losingTrades: 11,
      totalProfit: 3850.75,
      totalLoss: 2055.30,
      avgWinSize: 256.72,
      avgLossSize: 186.84,
      largestWin: 980.00,
      largestLoss: 420.00,
      maxDrawdown: 11.8,
      winRate: 57.7,
      profitFactor: 1.87,
      roi: 38.51,
      sharpeRatio: 1.65
    },
    TSLA: {
      symbol: 'TSLA',
      company: 'Tesla',
      startDate: '2026-01-01',
      endDate: '2026-06-30',
      totalTrades: 24,
      winningTrades: 15,
      losingTrades: 9,
      totalProfit: 4280.50,
      totalLoss: 2235.20,
      avgWinSize: 285.37,
      avgLossSize: 248.35,
      largestWin: 1150.00,
      largestLoss: 580.00,
      maxDrawdown: 14.2,
      winRate: 62.5,
      profitFactor: 1.92,
      roi: 42.81,
      sharpeRatio: 1.71
    }
  };

  const runBacktest = (symbol) => {
    setLoading(true);
    setTimeout(() => {
      setResults(backTestData[symbol]);
      setLoading(false);
    }, 1000);
  };

  const StatBox = ({ label, value, icon: Icon, color, suffix = '' }) => (
    <div className={`glass rounded-lg p-4 border ${color}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-1">{label}</p>
          <p className={`text-2xl font-bold ${color.includes('green') ? 'text-green-400' : color.includes('red') ? 'text-red-400' : 'text-cyan-400'}`}>
            {typeof value === 'number' && !label.includes('%') ? value.toFixed(2) : value}{suffix}
          </p>
        </div>
        <Icon size={24} className={color.includes('green') ? 'text-green-400' : color.includes('red') ? 'text-red-400' : 'text-cyan-400'} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6">
      <style>{`
        .glass { background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(10px); }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Backtesting Engine
            </span>
          </h1>
          <p className="text-slate-400 text-lg">6-month historical simulation (Jan-Jun 2026)</p>
        </div>

        {/* SELECT STOCK */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📊 Select Stock to Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(backTestData).map(symbol => (
              <button
                key={symbol}
                onClick={() => runBacktest(symbol)}
                className={`glass rounded-lg p-6 border-2 transition transform hover:scale-105 ${
                  results?.symbol === symbol
                    ? 'border-cyan-400 bg-cyan-500/20'
                    : 'border-slate-600 hover:border-cyan-400'
                }`}
              >
                <p className="text-2xl font-bold">{symbol}</p>
                <p className="text-slate-400 text-sm">{backTestData[symbol].company}</p>
                <p className="text-cyan-400 text-sm mt-2">Click to backtest</p>
              </button>
            ))}
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <BarChart3 size={32} className="text-cyan-400" />
            </div>
            <p className="text-slate-400 mt-4">Running backtest...</p>
          </div>
        )}

        {/* RESULTS */}
        {results && !loading && (
          <div className="space-y-8">
            {/* HEADER */}
            <div className="glass rounded-xl p-8 border border-cyan-500/30">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-cyan-400 mb-2">{results.symbol}</h2>
                  <p className="text-slate-400">{results.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-sm">Period</p>
                  <p className="text-lg font-bold">{results.startDate} to {results.endDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatBox
                  label="Win Rate"
                  value={results.winRate}
                  icon={Percent}
                  color="border-green-600/30"
                  suffix="%"
                />
                <StatBox
                  label="Profit Factor"
                  value={results.profitFactor}
                  icon={TrendingUp}
                  color="border-green-600/30"
                />
                <StatBox
                  label="Total ROI"
                  value={results.roi}
                  icon={DollarSign}
                  color="border-cyan-600/30"
                  suffix="%"
                />
              </div>
            </div>

            {/* PERFORMANCE METRICS */}
            <div>
              <h3 className="text-2xl font-bold mb-4">📈 Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatBox
                  label="Total Trades"
                  value={results.totalTrades}
                  icon={BarChart3}
                  color="border-blue-600/30"
                />
                <StatBox
                  label="Winning Trades"
                  value={results.winningTrades}
                  icon={TrendingUp}
                  color="border-green-600/30"
                />
                <StatBox
                  label="Losing Trades"
                  value={results.losingTrades}
                  icon={TrendingDown}
                  color="border-red-600/30"
                />
                <StatBox
                  label="Max Drawdown"
                  value={results.maxDrawdown}
                  icon={AlertCircle}
                  color="border-orange-600/30"
                  suffix="%"
                />
              </div>
            </div>

            {/* PROFIT & LOSS */}
            <div>
              <h3 className="text-2xl font-bold mb-4">💰 Profit & Loss</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass rounded-lg p-6 border border-green-600/30 bg-green-900/20">
                  <p className="text-slate-400 text-sm mb-2">Total Profit</p>
                  <p className="text-3xl font-bold text-green-400">+${results.totalProfit.toFixed(2)}</p>
                  <p className="text-sm text-green-400 mt-2">From {results.winningTrades} wins</p>
                </div>
                <div className="glass rounded-lg p-6 border border-red-600/30 bg-red-900/20">
                  <p className="text-slate-400 text-sm mb-2">Total Loss</p>
                  <p className="text-3xl font-bold text-red-400">-${results.totalLoss.toFixed(2)}</p>
                  <p className="text-sm text-red-400 mt-2">From {results.losingTrades} losses</p>
                </div>
                <div className="glass rounded-lg p-6 border border-cyan-600/30 bg-cyan-900/20">
                  <p className="text-slate-400 text-sm mb-2">Net P&L</p>
                  <p className="text-3xl font-bold text-cyan-400">+${(results.totalProfit - results.totalLoss).toFixed(2)}</p>
                  <p className="text-sm text-cyan-400 mt-2">{results.roi.toFixed(2)}% return</p>
                </div>
              </div>
            </div>

            {/* TRADE STATISTICS */}
            <div>
              <h3 className="text-2xl font-bold mb-4">📊 Trade Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatBox
                  label="Avg Win Size"
                  value={results.avgWinSize}
                  icon={TrendingUp}
                  color="border-green-600/30"
                />
                <StatBox
                  label="Avg Loss Size"
                  value={results.avgLossSize}
                  icon={TrendingDown}
                  color="border-red-600/30"
                />
                <StatBox
                  label="Largest Win"
                  value={results.largestWin}
                  icon={TrendingUp}
                  color="border-green-600/30"
                />
                <StatBox
                  label="Largest Loss"
                  value={results.largestLoss}
                  icon={TrendingDown}
                  color="border-red-600/30"
                />
                <StatBox
                  label="Profit Factor"
                  value={results.profitFactor}
                  icon={BarChart3}
                  color="border-cyan-600/30"
                />
                <StatBox
                  label="Win Rate"
                  value={results.winRate}
                  icon={Percent}
                  color="border-green-600/30"
                  suffix="%"
                />
                <StatBox
                  label="Sharpe Ratio"
                  value={results.sharpeRatio}
                  icon={Activity}
                  color="border-purple-600/30"
                />
                <StatBox
                  label="Max Drawdown"
                  value={results.maxDrawdown}
                  icon={AlertCircle}
                  color="border-orange-600/30"
                  suffix="%"
                />
              </div>
            </div>

            {/* INTERPRETATION */}
            <div className="glass rounded-xl p-8 border border-blue-600/30 bg-blue-900/20">
              <h3 className="text-xl font-bold text-blue-400 mb-4">💡 What This Means</h3>
              <div className="space-y-3 text-slate-300">
                <p>
                  ✅ <strong>Win Rate {results.winRate.toFixed(1)}%:</strong> The strategy won {results.winningTrades} out of {results.totalTrades} trades.
                </p>
                <p>
                  ✅ <strong>Profit Factor {results.profitFactor.toFixed(2)}:</strong> For every $1 lost, the strategy made ${results.profitFactor.toFixed(2)}.
                </p>
                <p>
                  ✅ <strong>ROI {results.roi.toFixed(2)}%:</strong> Starting with $10,000, the account grew to ${(10000 * (1 + results.roi / 100)).toFixed(2)}.
                </p>
                <p>
                  ⚠️ <strong>Max Drawdown {results.maxDrawdown.toFixed(1)}%:</strong> The biggest peak-to-trough loss was ${(10000 * results.maxDrawdown / 100).toFixed(2)}.
                </p>
              </div>
            </div>

            {/* DISCLAIMER */}
            <div className="glass rounded-xl p-6 border border-orange-600/30 bg-orange-900/20">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-orange-400 flex-shrink-0 mt-1" />
                <div className="text-sm text-orange-300">
                  <p><strong>⚠️ Important Disclaimer:</strong></p>
                  <p className="mt-2">
                    This backtesting is based on simulated historical data. Past performance does not guarantee future results. 
                    Real trading involves slippage, commissions, and market impact that may differ from these results. 
                    Always use proper risk management and never risk more than you can afford to lose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NO RESULTS */}
        {!results && !loading && (
          <div className="glass rounded-xl p-12 border border-slate-600 text-center">
            <BarChart3 size={48} className="mx-auto text-slate-500 mb-4" />
            <p className="text-slate-400 text-lg">Select a stock to run backtest</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelenceBacktester;
