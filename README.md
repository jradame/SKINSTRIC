# SKINTRIC

AI-powered skin analysis app that creates personalized skincare routines.

## What it does

SKINTRIC uses AI to analyze your skin and give you a custom skincare routine. You can take a photo with your camera or upload one from your gallery, and the app analyzes your skin type, concerns, and demographics to recommend products.

## Features

- **Camera integration** - Take photos directly in the browser using MediaStream API
- **Image capture** - Capture and preview images with base64 encoding
- **AI analysis** - Sends images to demographics analysis API endpoint
- **Multiple pages** - Home intro, analysis page with camera/upload, and results page
- **Responsive design** - Works on mobile, tablet, and desktop
- **Clean UI** - Minimalist design with Tailwind CSS

## Built with

- React
- Vite
- Tailwind CSS
- JavaScript/JSX

## Pages

1. **Home (Intro)** - Landing page with hero section and navigation
2. **Introduce/Analysis** - Camera capture or gallery upload for skin photos
3. **Results** - AI analysis results and recommendations

## Setup


## Deployment

Hosted on Vercel. Push to main branch to deploy automatically.

## How it works

The app captures your photo through the camera or file upload, converts it to base64, and sends it to the AI analysis endpoint. The API processes your skin data and returns personalized recommendations based on your unique skin profile.

---

Made by me while learning React and working with camera APIs in the browser.

