import { lazy } from 'react';

// Lazy load components that are not immediately visible
export const LazyServices = lazy(() => import('./home/Services'));
export const LazyCertifications = lazy(() => import('./home/Certifications'));
export const LazyReviews = lazy(() => import('./home/Reviews'));
export const LazyPaymentOptions = lazy(() => import('./home/PaymentOptions'));
export const LazyContact = lazy(() => import('./home/Contact'));
export const LazyAboutUs = lazy(() => import('./home/AboutUs'));