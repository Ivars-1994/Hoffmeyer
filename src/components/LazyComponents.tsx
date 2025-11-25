import { lazy } from 'react';

// Lazy load non-critical components for better performance
export const LazyCertifications = lazy(() => import('./home/Certifications'));
export const LazyReviews = lazy(() => import('./home/Reviews'));
export const LazyPaymentOptions = lazy(() => import('./home/PaymentOptions'));
export const LazyContact = lazy(() => import('./home/Contact'));
export const LazyAboutUs = lazy(() => import('./home/AboutUs'));
export const LazyProcessSteps = lazy(() => import('./home/ProcessSteps'));
export const LazyGeneralFAQ = lazy(() => import('./home/GeneralFAQ'));
export const LazyServiceFAQ = lazy(() => import('./home/ServiceFAQ'));
export const LazyServices = lazy(() => import('./home/Services'));