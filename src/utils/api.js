import axios from 'axios';

// Mock API base URL - replace with actual API endpoint
const API_BASE_URL = 'https://api.matsyadrishti.com';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for development
const MOCK_FISH_DATA = {
  name: 'Indian Mackerel',
  confidence: 92,
  freshness: 'Fresh',
  nutritionalInfo: {
    protein: 18.6,
    omega3: 2.3,
    fat: 12.4,
    calories: 205,
    vitamins: ['B12', 'D', 'B6'],
  },
  volumeWeight: {
    estimatedWeight: '250g',
    volume: '180ml',
  },
  timestamp: new Date().toISOString(),
};

const MOCK_POPULAR_FISH = [
  { id: 1, name: 'Tuna', image: '/fish images/tuna.jpeg', confidence: 95 },
  { id: 2, name: 'Rohu', image: '/fish images/rohu.jpeg', confidence: 92 },
  { id: 3, name: 'Catla', image: '/fish images/catla.jpeg', confidence: 90 },
  { id: 4, name: 'Pomfret', image: '/fish images/pomfret.jpeg', confidence: 89 },
  { id: 5, name: 'Tilapia', image: '/fish images/talipia.jpeg', confidence: 93 },
  { id: 6, name: 'Common Carp', image: '/fish images/common carp.jpeg', confidence: 88 },
  { id: 7, name: 'Silver Carp', image: '/fish images/silver carp.jpeg', confidence: 87 },
  { id: 8, name: 'Mrigal', image: '/fish images/mrigal.jpeg', confidence: 91 },
  { id: 9, name: 'Gurame', image: '/fish images/gurame.jpeg', confidence: 86 },
];

const MOCK_HISTORY = [
  {
    id: 1,
    fishName: 'Indian Mackerel',
    confidence: 92,
    timestamp: '2024-03-15T10:30:00Z',
    thumbnail: '/images/mackerel-thumb.jpg',
    freshness: 'Fresh',
  },
  {
    id: 2,
    fishName: 'Pomfret',
    confidence: 88,
    timestamp: '2024-03-14T16:45:00Z',
    thumbnail: '/images/pomfret-thumb.jpg',
    freshness: 'Moderately Fresh',
  },
  {
    id: 3,
    fishName: 'Salmon',
    confidence: 95,
    timestamp: '2024-03-13T12:20:00Z',
    thumbnail: '/images/salmon-thumb.jpg',
    freshness: 'Very Fresh',
  },
];

// Mock API functions
export const uploadFishImage = async (imageFile) => {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    // In a real app, this would upload the image and return scan results
    // const formData = new FormData();
    // formData.append('image', imageFile);
    // const response = await api.post('/scan', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });
    
    // Return mock data for now
    return {
      success: true,
      data: {
        ...MOCK_FISH_DATA,
        id: Date.now(),
        image: URL.createObjectURL(imageFile),
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to upload image. Please try again.'
    };
  }
};

export const fetchScanResult = async (scanId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // const response = await api.get(`/scan/${scanId}`);
    
    return {
      success: true,
      data: MOCK_FISH_DATA
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch scan result.'
    };
  }
};

export const getHistory = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // const response = await api.get('/history');
    
    return {
      success: true,
      data: MOCK_HISTORY
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch history.'
    };
  }
};

export const saveToHistory = async (scanData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    // const response = await api.post('/history', scanData);
    
    return {
      success: true,
      message: 'Scan saved to history successfully!'
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to save to history.'
    };
  }
};

export const clearHistory = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    // const response = await api.delete('/history');
    
    return {
      success: true,
      message: 'History cleared successfully!'
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to clear history.'
    };
  }
};

export const getPopularFish = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    // const response = await api.get('/popular-fish');
    
    return {
      success: true,
      data: MOCK_POPULAR_FISH
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch popular fish.'
    };
  }
};

export const getUserProfile = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  try {
    return {
      success: true,
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        language: 'English',
        units: 'Metric',
        theme: 'Light',
        notifications: true,
        location: 'Mumbai, India',
        memberSince: '2024-01-15',
        totalScans: 45,
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch user profile.'
    };
  }
};

export default api;