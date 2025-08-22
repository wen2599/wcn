import React, { useState, useEffect } from 'react';
import './GameLobby.css';

const GameLobby = ({ onSelectGame, matchingStatus, onPractice }) => {
  const [announcement, setAnnouncement] = useState('');
  const [onlineCount, setOnlineCount] = useState(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch('/api/get_announcement.php');
        const data = await response.json();
        if (data.success && data.text) setAnnouncement(data.text);
      } catch (error) { /* ignore */ }
    };
    fetchAnnouncement();
    const intervalId = setInterval(fetchAnnouncement, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchOnlineCount = async () => {
      try {
        const resp = await fetch('/api/get_online_count.php');
        const data = await resp.json();
        if (data.success) setOnlineCount(data.onlineCount);
      } catch (err) { setOnlineCount(null); }
    };
    fetchOnlineCount();
    const intervalId = setInterval(fetchOnlineCount, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="lobby-container">
      <header className="lobby-header">
        <h1 className="lobby-title">游戏大厅</h1>
        <p className="lobby-subtitle">选择你的战场，开启荣耀之旅</p>
        <div style={{ marginTop: 8, fontSize: '1rem', color: '#ff8a80', fontWeight: 500 }}>
          当前在线人数：{onlineCount !== null ? onlineCount : '...'}
        </div>
      </header>

      {announcement && (
        <div className="announcement-banner">
          📢 {announcement}
        </div>
      )}

      <main className="game-card-grid">
        {/* 十三张卡片 */}
        <div className="game-card thirteen-bg">
          <div className="game-card-overlay">
            <div className="game-content">
              <h2 className="game-title">经典十三张</h2>
              <p className="game-description">策略与运气的巅峰对决</p>
            </div>
            <div className="game-actions">
              <button className="btn btn-primary"
                onClick={() => onSelectGame('thirteen')}
              >
                进入游戏
              </button>
            </div>
          </div>
        </div>
        {/* 八张卡片 */}
        <div className="game-card eight-bg">
          <div className="game-card-overlay">
            <div className="game-content">
              <h2 className="game-title">急速八张</h2>
              <p className="game-description">快节奏的竞技体验</p>
            </div>
            <div className="game-actions">
              <button className="btn btn-primary"
                onClick={() => onSelectGame('eight')}
              >
                进入游戏
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameLobby;