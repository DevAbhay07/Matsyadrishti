import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarBottom from '../components/NavbarBottom';
import Icons from '../components/Icons';

const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Component mount logic can go here if needed
  }, []);

  const ParticleField = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="particle absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );

  const teamMembers = [
    {
      name: "Dr. Sarah Ocean",
      role: "Marine Biologist & AI Researcher",
      icon: "🧬",
      expertise: "Deep Learning, Marine Ecosystem Analysis"
    },
    {
      name: "Alex Rivera",
      role: "Computer Vision Engineer",
      icon: "👁️",
      expertise: "Image Recognition, Neural Networks"
    },
    {
      name: "Dr. Kai Tanaka",
      role: "Ichthyologist",
      icon: "🐠",
      expertise: "Fish Species Classification, Marine Biology"
    }
  ];

  const features = [
    {
      icon: "Search",
      title: "Instant Recognition",
      description: "AI identifies species in real-time using advanced computer vision algorithms",
      accent: "from-blue-500 to-cyan-500"
    },
    {
      icon: "Chart",
      title: "Nutritional Insights",
      description: "Complete macro & micronutrient analysis with health recommendations",
      accent: "from-green-500 to-emerald-500"
    },
    {
      icon: "Chart",
      title: "Freshness AI",
      description: "Computer vision quality assessment for optimal freshness detection",
      accent: "from-purple-500 to-pink-500"
    },
    {
      icon: "Wave",
      title: "Ocean Conservation",
      description: "Supporting sustainable fishing practices through data-driven insights",
      accent: "from-teal-500 to-blue-500"
    }
  ];

  const stats = [
    { icon: 'Fish', value: '50+', label: 'Species', description: 'Marine database' },
    { icon: 'Target', value: '95%', label: 'Accuracy', description: 'AI precision' },
    { icon: 'Rocket', value: '<3s', label: 'Speed', description: 'Analysis time' },
    { icon: 'Globe', value: '24/7', label: 'Available', description: 'Global access' }
  ];

  return (
    <div className="min-h-screen bg-underwater relative overflow-hidden">
      {/* Particle field background */}
      <ParticleField />

      <div className="relative z-10 pb-20">
        {/* Header */}
        <header className="text-center pt-8 pb-6 px-4">
          <div className="animate-slide-down">
            <h1 className="text-4xl font-bold aurora-text mb-4 glow-text">
              About Matsya Drishti
            </h1>
            <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
              Revolutionizing marine intelligence through cutting-edge AI technology
            </p>
          </div>
        </header>

        {/* Mission Section */}
        <section className="px-4 mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
            <div className="relative glass-panel">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 text-blue-400 flex justify-center">
                  <Icons.Wave className="w-16 h-16" />
                </div>
                <h2 className="text-2xl font-bold aurora-text glow-text mb-4">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-center">
                We're dedicated to making marine knowledge accessible to everyone. Through advanced AI and computer vision, 
                we bridge the gap between complex marine science and everyday users, promoting ocean conservation and 
                sustainable fishing practices worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="stat-card group"
                style={{animationDelay: `${0.4 + index * 0.1}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-marine-400 to-neon-blue opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300 text-blue-400">
                    {React.createElement(Icons[stat.icon], { className: "w-8 h-8 mx-auto" })}
                  </div>
                  <div className="text-xl font-bold text-gradient mb-1 group-hover:text-neon-blue transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-800 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {stat.description}
                  </div>
                </div>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 mb-12 animate-slide-up" style={{animationDelay: '0.6s'}}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
            <div className="relative glass-panel">
              <h2 className="text-xl font-bold aurora-text glow-text mb-6 text-center">
                Advanced AI Features
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="glass-card p-4 flex items-center space-x-4 group hover:bg-opacity-20 transition-all duration-500"
                    style={{animationDelay: `${0.6 + index * 0.1}s`}}
                  >
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-500`}></div>
                      <div className="text-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-300 text-blue-400">
                        {React.createElement(Icons[feature.icon], { className: "w-8 h-8" })}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 group-hover:text-gray-700 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                    <div className="text-gray-600 group-hover:text-gray-700 transform group-hover:translate-x-1 transition-all duration-300">
                      →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 mb-12 animate-slide-up" style={{animationDelay: '0.8s'}}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
            <div className="relative glass-panel">
              <h2 className="text-xl font-bold aurora-text glow-text mb-6 text-center">
                Meet Our Team
              </h2>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index}
                    className="glass-card p-4 group hover:bg-opacity-20 transition-all duration-500"
                    style={{animationDelay: `${0.8 + index * 0.1}s`}}
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                        {member.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-gray-700 transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300 ml-12">
                      {member.expertise}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="px-4 py-8 text-center animate-fade-in" style={{animationDelay: '1s'}}>
          <div className="glass rounded-2xl p-6 max-w-sm mx-auto">
            <div className="text-4xl mb-4 text-blue-400 flex justify-center">
              <Icons.Rocket className="w-12 h-12" />
            </div>
            <h3 className="text-lg font-bold aurora-text glow-text mb-2">
              Join the Revolution
            </h3>
            <p className="text-marine-200 text-sm mb-4">
              Experience the future of marine intelligence
            </p>
            <button
              onClick={() => navigate('/scan')}
              className="btn-glass w-full group"
            >
              <span className="flex items-center justify-center space-x-2">
                <Icons.Wave className="w-5 h-5 text-blue-400" />
                <span>Start Scanning</span>
              </span>
            </button>
          </div>
        </section>
      </div>

      {/* Floating Navigation */}
      <NavbarBottom />
    </div>
  );
};

export default AboutPage;