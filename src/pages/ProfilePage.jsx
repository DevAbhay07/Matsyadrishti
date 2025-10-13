import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarBottom from '../components/NavbarBottom';
import Icons from '../components/Icons';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const userStats = {
    totalScans: 24,
    speciesDiscovered: 15,
    accuracy: 96,
    joinDate: 'Jan 2024'
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const achievements = [
    { icon: 'Trophy', title: 'First Scan', unlocked: true },
    { icon: 'Target', title: 'Eagle Eye', unlocked: true },
    { icon: 'Fish', title: 'Species Explorer', unlocked: true },
    { icon: 'Rocket', title: 'Streak Master', unlocked: false }
  ];

  return (
    <div className="min-h-screen bg-underwater relative">
      <div className={`relative z-10 pb-20 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* Profile Header */}
        <header className="text-center pt-8 pb-6 px-4">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
            <Icons.User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Marine Explorer</h1>
          <p className="text-white/90 text-sm drop-shadow-md">Your aquatic discovery journey</p>
        </header>

        <div className="px-4 space-y-6">
          
          {/* Statistics Section */}
          <section className="glass-panel">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Your Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center stat-card">
                <Icons.Search className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{userStats.totalScans}</div>
                <div className="text-sm text-gray-600">Total Scans</div>
              </div>
              <div className="text-center stat-card">
                <Icons.Fish className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{userStats.speciesDiscovered}</div>
                <div className="text-sm text-gray-600">Species Found</div>
              </div>
              <div className="text-center stat-card">
                <Icons.Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{userStats.accuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center stat-card">
                <Icons.Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{userStats.joinDate}</div>
                <div className="text-sm text-gray-600">Member Since</div>
              </div>
            </div>
          </section>

          {/* Achievements Section */}
          <section className="glass-panel">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg glass-card">
                  <div className={achievement.unlocked ? 'text-yellow-500' : 'text-gray-400'}>
                    {React.createElement(Icons[achievement.icon], { className: "w-6 h-6" })}
                  </div>
                  <span className={`font-medium ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                    {achievement.title}
                  </span>
                  {achievement.unlocked && <div className="w-3 h-3 bg-green-500 rounded-full ml-auto"></div>}
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="space-y-3">
            <button
              onClick={() => navigate('/scanner')}
              className="w-full btn-primary py-4 px-6 font-semibold flex items-center justify-center space-x-3"
            >
              <Icons.Search className="w-6 h-6" />
              <span>Start New Scan</span>
            </button>

            <button
              onClick={() => navigate('/help')}
              className="w-full btn-glass py-3 px-6 font-medium flex items-center justify-center space-x-3"
            >
              <Icons.Question className="w-5 h-5" />
              <span>Help & Support</span>
            </button>
          </section>
        </div>
      </div>

      <NavbarBottom />
    </div>
  );
};

export default ProfilePage;
