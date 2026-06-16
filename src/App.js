import React, { useState } from 'react';
import DailyTradingDashboard from './components/daily_trading_dashboard';
import ExcelenceOrderFormat from './components/excelence_order_format';
import ExcelenceBacktester from './components/excelence_backtester';

function App() {
  const [tab, setTab] = useState('dashboard');

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <nav style={{ padding: '20px', background: '#1a1a1a', color: 'white', display: 'flex', gap: '10px' }}>
        <button onClick={() => setTab('dashboard')} style={{ padding: '10px 20px', background: tab === 'dashboard' ? '#0891b2' : '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
          📊 Dashboard
        </button>
        <button onClick={() => setTab('orders')} style={{ padding: '10px 20px', background: tab === 'orders' ? '#0891b2' : '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
          📋 Orders
        </button>
        <button onClick={() => setTab('backtest')} style={{ padding: '10px 20px', background: tab === 'backtest' ? '#0891b2' : '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
          🧪 Backtest
        </button>
      </nav>

      {tab === 'dashboard' && <DailyTradingDashboard />}
      {tab === 'orders' && <ExcelenceOrderFormat />}
      {tab === 'backtest' && <ExcelenceBacktester />}
    </div>
  );
}

export default App;
