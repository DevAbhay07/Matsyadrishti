const Icons = {
  // Search/Magnifying glass icon
  Search: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),

  // Fish icon
  Fish: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.5 3C8.8 3 6 5.8 6 9.5c0 1.8.7 3.4 1.8 4.6L2 20l6.8-5.8c1.2 1.1 2.8 1.8 4.6 1.8 3.7 0 6.5-2.8 6.5-6.5S16.2 3 12.5 3zm2.5 8c-.8 0-1.5-.7-1.5-1.5S14.2 8 15 8s1.5.7 1.5 1.5S15.8 11 15 11z"/>
    </svg>
  ),

  // Target/Accuracy icon
  Target: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
    </svg>
  ),

  // Wave/Ocean icon
  Wave: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9.2-.26.43-.51.69-.73 1.14-.98 2.6-1.58 4.2-1.58.86 0 1.68.17 2.42.47 1.94.79 3.29 2.73 3.29 4.97 0 2.97-2.4 5.37-5.37 5.37-.86 0-1.68-.2-2.4-.56-.54-.27-1.02-.64-1.4-1.08-.2-.23-.37-.48-.52-.75-.3-.54-.46-1.16-.46-1.82 0-.82.27-1.58.73-2.19.23-.31.52-.58.85-.79.66-.42 1.44-.68 2.28-.68.42 0 .83.06 1.21.17.76.22 1.42.65 1.91 1.23.25.29.44.62.57.98.13.36.2.74.2 1.13 0 .39-.07.77-.2 1.13-.13.36-.32.69-.57.98-.49.58-1.15 1.01-1.91 1.23-.38.11-.79.17-1.21.17-.84 0-1.62-.26-2.28-.68-.33-.21-.62-.48-.85-.79-.46-.61-.73-1.37-.73-2.19 0-.66.16-1.28.46-1.82.15-.27.32-.52.52-.75.38-.44.86-.81 1.4-1.08.72-.36 1.54-.56 2.4-.56 2.97 0 5.37 2.4 5.37 5.37 0 2.24-1.35 4.18-3.29 4.97-.74.3-1.56.47-2.42.47-1.6 0-3.06-.6-4.2-1.58-.26-.22-.49-.47-.69-.73-1.06-1.35-1.69-3.05-1.69-4.9 0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
  ),

  // Chart/Analytics icon
  Chart: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),

  // Trophy/Achievement icon  
  Trophy: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C13.1 2 14 2.9 14 4V6H16C17.1 6 18 6.9 18 8V16C18 17.1 17.1 18 16 18H8C6.9 18 6 17.1 6 16V8C6 6.9 6.9 6 8 6H10V4C10 2.9 10.9 2 12 2ZM12 4V6H12V4ZM8 8V16H16V8H8ZM9 19H15V21H9V19Z"/>
    </svg>
  ),

  // Mobile/Phone icon
  Mobile: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
    </svg>
  ),

  // Globe/World icon
  Globe: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),

  // Camera icon (already used in HomePage)
  Camera: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),

  // Rocket/Launch icon
  Rocket: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C12.6 2 13.1 2.2 13.5 2.6L21.4 10.5C21.8 10.9 22 11.4 22 12S21.8 13.1 21.4 13.5L13.5 21.4C13.1 21.8 12.6 22 12 22S10.9 21.8 10.5 21.4L2.6 13.5C2.2 13.1 2 12.6 2 12S2.2 10.9 2.6 10.5L10.5 2.6C10.9 2.2 11.4 2 12 2M12 4.8L4.8 12L12 19.2L19.2 12L12 4.8M12 8C13.1 8 14 8.9 14 10S13.1 12 12 12 10 11.1 10 10 10.9 8 12 8Z"/>
    </svg>
  ),

  // Calendar icon
  Calendar: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),

  // Info/About icon
  Info: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),

  // User/Profile icon
  User: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),

  // Clock/History icon
  Clock: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),

  // Question/Help icon
  Question: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),

  // Home icon
  Home: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
};

export default Icons;