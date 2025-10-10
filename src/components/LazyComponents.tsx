import { lazy } from 'react';

// Services is NOT lazy anymore for SEO/SSR - needs to be in initial DOM
export const LazyCertifications = lazy(() => import('./home/Certifications'));
export const LazyReviews = lazy(() => import('./home/Reviews'));
export const LazyPaymentOptions = lazy(() => import('./home/PaymentOptions'));
export const LazyContact = lazy(() => import('./home/Contact'));
export const LazyAboutUs = lazy(() => import('./home/AboutUs'));