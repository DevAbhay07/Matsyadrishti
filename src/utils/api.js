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
  { id: 1, name: 'Salmon', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop', confidence: 95 },
  { id: 2, name: 'Tuna', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=200&fit=crop', confidence: 92 },
  { id: 3, name: 'Rohu', image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=300&h=200&fit=crop', confidence: 88 },
  { id: 4, name: 'Catla', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop', confidence: 90 },
  { id: 5, name: 'Hilsa', image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=300&h=200&fit=crop', confidence: 94 },
  { id: 6, name: 'Pomfret', image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=300&h=200&fit=crop', confidence: 89 },
  { id: 7, name: 'Mackerel', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=300&h=200&fit=crop', confidence: 91 },
  { id: 8, name: 'Cod', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop', confidence: 87 },
  { id: 9, name: 'Tilapia', image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=300&h=200&fit=crop', confidence: 93 },
  { id: 10, name: 'Carp', image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop', confidence: 86 },
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