# 🐟 Matsya Drishti - AI-Powered Fish Recognition App

A modern, responsive React application for fish identification and nutritional analysis using AI technology.

## ✨ Features

- **🔍 Fish Recognition**: AI-powered fish species identification with confidence scores
- **📊 Nutritional Analysis**: Detailed nutritional information including protein, omega-3, vitamins, and calories
- **🎯 Freshness Assessment**: Real-time fish freshness evaluation
- **📏 Size Estimation**: Weight and volume estimation based on image analysis
- **📱 Mobile-First Design**: Optimized for mobile devices with responsive layout
- **🕒 Scan History**: Save and track previous fish scans
- **👤 User Profile**: Personalized settings and preferences
- **❓ Help & Support**: Comprehensive FAQ and usage instructions

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1 with Vite
- **Styling**: Tailwind CSS with custom marine theme
- **Routing**: React Router DOM v6
- **Icons**: React Icons
- **Charts**: Recharts for nutritional data visualization
- **Images**: Unsplash API for fish species images

## 🚀 Live Demo

🌐 **Live App**: [Matsya Drishti on Netlify](https://matsya-drishti.netlify.app)

## 📋 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/matsya-drishti.git
cd matsya-drishti

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 🌐 Deployment

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy! 🚀

The project includes:
- `netlify.toml` - Netlify configuration
- `public/_redirects` - SPA routing support
- **HTTP Client**: Axios for API calls
- **Icons**: Emoji-based icons for cross-platform compatibility
- **Design**: Mobile-first responsive design

## 📱 App Structure

### Pages & Routes
- `/` - **HomePage**: Main dashboard with scan button and popular fish
- `/scanner` - **ScannerScreen**: Camera interface for fish scanning
- `/result` - **ResultPage**: Detailed analysis results and nutritional info
- `/history` - **HistoryPage**: Previous scan history and statistics
- `/profile` - **ProfilePage**: User settings and account management
- `/help` - **HelpPage**: FAQ, instructions, and support contact

### Components
- `NavbarBottom` - Bottom navigation bar
- `FishCard` - Reusable fish display card
- `ScanButton` - Main CTA scan button
- `PopularFishSlider` - Horizontal fish species slider
- `ResultInfoCard` - Nutritional information cards
- `NutrientBarChart` - Visual nutrition data representation
- `Loader` - Loading animations and states

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd matsya-drishti
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 📂 Project Structure

```
matsya-drishti/
├── public/
│   ├── fish-icon.svg           # App favicon
│   └── ...
├── src/
│   ├── components/             # Reusable components
│   │   ├── NavbarBottom.jsx
│   │   ├── FishCard.jsx
│   │   ├── ScanButton.jsx
│   │   ├── PopularFishSlider.jsx
│   │   ├── ResultInfoCard.jsx
│   │   ├── NutrientBarChart.jsx
│   │   └── Loader.jsx
│   ├── pages/                  # Main application pages
│   │   ├── HomePage.jsx
│   │   ├── ScannerScreen.jsx
│   │   ├── ResultPage.jsx
│   │   ├── HistoryPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── HelpPage.jsx
│   ├── utils/
│   │   └── api.js              # API utilities and mock data
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx               # React entry point
│   └── index.css              # Tailwind CSS and custom styles
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── package.json
```

## 🎨 Design System

### Color Palette
- **Primary Marine**: Blue ocean-inspired colors (`marine-50` to `marine-900`)
- **UI Elements**: Clean whites and grays
- **Accents**: Green for success, red for errors, yellow for warnings

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Rounded-full design with smooth transitions
- **Navigation**: Bottom-fixed mobile navigation

## 🔧 Configuration

### Tailwind CSS Custom Theme
```js
theme: {
  extend: {
    colors: {
      marine: {
        50: '#f0f9ff',
        // ... full marine color palette
        900: '#0c4a6e',
      }
    },
    animation: {
      'spin-slow': 'spin 2s linear infinite',
      'pulse-slow': 'pulse 3s ease-in-out infinite',
    }
  }
}
```

### API Configuration
Mock API functions are configured in `src/utils/api.js`:
- `uploadFishImage()` - Image upload and analysis
- `fetchScanResult()` - Get scan results
- `getHistory()` - Retrieve scan history
- `saveToHistory()` - Save scan to history
- `getPopularFish()` - Get popular fish data
- `getUserProfile()` - Get user profile

## 📱 Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **Touch-Friendly**: Large touch targets and gestures
- **Performance**: Optimized images and lazy loading
- **PWA Ready**: Structured for Progressive Web App conversion

## 🔄 State Management

- **React Hooks**: useState and useEffect for component state
- **Navigation State**: React Router for URL state
- **Local Storage**: Browser storage for user preferences
- **Props**: Component communication via props

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **ESLint**: Configured with React best practices
- **Component Structure**: Functional components with hooks
- **File Naming**: PascalCase for components, camelCase for utilities

## 🌟 Features in Detail

### Fish Recognition
- Upload or capture fish images
- AI-powered species identification
- Confidence percentage scoring
- Support for 50+ fish species

### Nutritional Analysis
- Protein content analysis
- Omega-3 fatty acids information
- Vitamin and mineral breakdown
- Calorie estimation
- Visual bar charts

### Freshness Assessment
- Real-time freshness evaluation
- Color-coded freshness indicators
- Quality recommendations

### User Experience
- Smooth animations and transitions
- Loading states and feedback
- Error handling and validation
- Offline-first approach (coming soon)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Frontend Development**: React + Tailwind CSS
- **UI/UX Design**: Mobile-first responsive design
- **AI Integration**: Fish recognition and analysis APIs

## 📞 Support

- **Email**: support@matsyadrishti.com
- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)

---

**Made with ❤️ for fish enthusiasts and marine life lovers**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
