const reportWebVitals = async (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      await Promise.all([
        getCLS(onPerfEntry),
        getFID(onPerfEntry),
        getFCP(onPerfEntry),
        getLCP(onPerfEntry),
        getTTFB(onPerfEntry)
      ]);
    } catch (error) {
      console.error('Error loading web-vitals:', error);
    }
  }
};

export default reportWebVitals;
