export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA4_ID

declare global {
  interface Window {
    gtag: Function;
  }
}

// Function to track pageview
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}