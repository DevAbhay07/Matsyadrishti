import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarBottom from '../components/NavbarBottom';

const HelpPage = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState(null);

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

  const faqData = [
    {
      question: 'How accurate is the fish identification?',
      answer: 'Our AI model achieves 95%+ accuracy using advanced computer vision and deep learning algorithms trained on thousands of fish species images.',
      icon: '🎯'
    },
    {
      question: 'What types of fish can be identified?',
      answer: 'The app can identify 50+ marine and freshwater species including salmon, tuna, bass, trout, and many tropical fish varieties.',
      icon: '🐟'
    },
    {
      question: 'How does freshness detection work?',
      answer: 'Our AI analyzes visual cues like eye clarity, skin color, fin condition, and overall appearance to assess fish freshness and quality.',
      icon: '✨'
    },
    {
      question: 'Can I use the app offline?',
      answer: 'Currently, the app requires an internet connection for AI processing. We\'re working on offline capabilities for future versions.',
      icon: '📶'
    },
    {
      question: 'How do I get better scan results?',
      answer: 'Ensure good lighting, keep the fish centered and in focus, avoid shadows, and capture the whole fish when possible for best results.',
      icon: '💡'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we prioritize your privacy. Images are processed securely and not stored permanently. Your scan history is kept locally on your device.',
      icon: '🔒'
    }
  ];

  const quickActions = [
    {
      icon: '🔍',
      title: 'Start Scanning',
      description: 'Begin identifying fish with AI',
      action: () => navigate('/scan'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📞',
      title: 'Contact Support',
      description: 'Get help from our team',
      action: () => window.open('mailto:support@matsyadrishti.com'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🌊',
      title: 'Learn About Us',
      description: 'Discover our mission',
      action: () => navigate('/about'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '📱',
      title: 'App Tutorial',
      description: 'Interactive guide',
      action: () => alert('Tutorial coming soon!'),
      color: 'from-orange-500 to-red-500'
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      <ParticleField />
      <div className="relative z-10 pb-20">
        <header className="text-center pt-8 pb-6 px-4">
          <div className="animate-slide-down">
            <div className="text-5xl mb-4 animate-float">❓</div>
            <h1 className="text-3xl font-bold aurora-text mb-2 glow-text">
              Help & Support
            </h1>
            <p className="text-marine-200 text-sm">
              Everything you need to know about Matsya Drishti
            </p>
          </div>
        </header>

        <div className="px-4 space-y-6">
          {/* Quick Actions */}
          <section className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
              <div className="relative glass-panel p-6">
                <h2 className="text-xl font-bold aurora-text glow-text mb-4 text-center">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="glass-card p-4 text-center group hover:bg-opacity-20 transition-all duration-500"
                      style={{animationDelay: `${0.2 + index * 0.1}s`}}
                    >
                      <div className="relative mb-3">
                        <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-500`}></div>
                        <div className="text-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                          {action.icon}
                        </div>
                      </div>
                      <h3 className="font-semibold text-white group-hover:text-marine-200 transition-colors duration-300 text-sm mb-1">
                        {action.title}
                      </h3>
                      <p className="text-xs text-marine-400 group-hover:text-marine-300 transition-colors duration-300">
                        {action.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
              <div className="relative glass-panel p-6">
                <h2 className="text-xl font-bold aurora-text glow-text mb-6 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <div 
                      key={index}
                      className="glass-card transition-all duration-500"
                      style={{animationDelay: `${0.4 + index * 0.1}s`}}
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-xl transform group-hover:scale-110 transition-transform duration-300">
                            {faq.icon}
                          </div>
                          <h3 className="font-semibold text-white group-hover:text-marine-200 transition-colors duration-300">
                            {faq.question}
                          </h3>
                        </div>
                        <div className={`text-marine-400 group-hover:text-marine-300 transform transition-all duration-300 ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`}>
                          ⌄
                        </div>
                      </button>
                      
                      {expandedFaq === index && (
                        <div className="px-4 pb-4 animate-fade-in">
                          <div className="pl-8 border-l-2 border-marine-600 border-opacity-30">
                            <p className="text-marine-300 text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* App Features Overview */}
          <section className="animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
              <div className="relative glass-panel p-6">
                <h2 className="text-xl font-bold aurora-text glow-text mb-4 text-center">
                  Key Features
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: '🔍',
                      title: 'AI Fish Recognition',
                      description: 'Instantly identify fish species with 95%+ accuracy'
                    },
                    {
                      icon: '📊',
                      title: 'Freshness Analysis',
                      description: 'Computer vision assessment of fish quality and freshness'
                    },
                    {
                      icon: '🥗',
                      title: 'Nutritional Data',
                      description: 'Detailed nutritional information and health benefits'
                    },
                    {
                      icon: '📱',
                      title: 'Easy to Use',
                      description: 'Simple camera interface with instant results'
                    },
                    {
                      icon: '🕒',
                      title: 'Scan History',
                      description: 'Keep track of all your fish identifications'
                    },
                    {
                      icon: '🌊',
                      title: 'Ocean Conservation',
                      description: 'Learn about sustainable fishing and marine protection'
                    }
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="glass-card p-4 flex items-center space-x-4 group hover:bg-opacity-20 transition-all duration-500"
                      style={{animationDelay: `${0.6 + index * 0.1}s`}}
                    >
                      <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-marine-200 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-marine-300 group-hover:text-marine-200 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="animate-slide-up" style={{animationDelay: '0.8s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
              <div className="relative glass-panel p-6 text-center">
                <h2 className="text-xl font-bold aurora-text glow-text mb-4">
                  Still Need Help?
                </h2>
                <p className="text-marine-300 mb-6">
                  Our support team is here to assist you with any questions or issues.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => window.open('mailto:support@matsyadrishti.com')}
                    className="btn-3d w-full group"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <span className="text-xl">📧</span>
                      <span>Email Support</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
                  </button>
                  
                  <button
                    onClick={() => navigate('/about')}
                    className="btn-glass w-full group"
                  >
                    <span className="flex items-center justify-center space-x-3">
                      <span className="text-xl">ℹ️</span>
                      <span>About Matsya Drishti</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
};

export default HelpPage;