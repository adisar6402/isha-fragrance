# Overview

This is a modern, luxury perfume e-commerce website for "ISHA'S FRAGRANCE" built with React, TypeScript, and Express. The application features a full-stack architecture with a futuristic dark-mode design, glassmorphism effects, and seamless WhatsApp integration for orders. The site showcases premium fragrances with detailed product information, shopping cart functionality, and a curated brand experience centered around owner Aisha Adoke's vision.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing with pages for Home, Shop, Product details, About, Contact, and Policy
- **State Management**: React Context API for cart state management and React Query for server state
- **UI Library**: Shadcn/ui components with Radix UI primitives for accessibility and consistency
- **Styling**: Tailwind CSS with custom design system featuring glassmorphism effects, dark-mode-first approach, and futuristic aesthetics
- **Animations**: Framer Motion for smooth page transitions and micro-interactions
- **Form Handling**: React Hook Form with Zod validation schemas

## Backend Architecture
- **Framework**: Express.js with TypeScript for API endpoints
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Vite integration for hot module replacement and seamless full-stack development
- **Session Management**: Express session handling with PostgreSQL session store configuration ready

## Data Storage
- **Database ORM**: Drizzle ORM configured for PostgreSQL with Neon Database
- **Schema**: User management schema with UUID primary keys
- **Product Data**: JSON-based product catalog stored in client-side data files for simplicity
- **Migration System**: Drizzle Kit for database schema migrations

## Authentication & Authorization
- **Session-Based**: Express sessions with PostgreSQL session storage
- **User Schema**: Username/password authentication with bcrypt-ready structure
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations

## Design System
- **Color Palette**: Primary purple (#9A8BFF) and accent cream (#F5E1C8) with comprehensive dark theme
- **Typography**: Playfair Display for headings and Inter for body text
- **Component Library**: Custom glassmorphism components with consistent spacing and elevation
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## Business Logic
- **Shopping Cart**: Local state management with WhatsApp checkout integration
- **Product Catalog**: Rich product data including fragrance families, notes, sizes, and pricing in Nigerian Naira
- **Search & Filtering**: Advanced filtering by price, gender, fragrance families, and availability
- **WhatsApp Integration**: Automated message generation for product inquiries and cart checkout

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for server state management
- **Build Tools**: Vite with React plugin, TypeScript compiler, ESBuild for production builds
- **Routing**: Wouter for lightweight client-side routing

## UI & Styling
- **Component Library**: Radix UI primitives for accessibility-compliant components
- **Styling**: Tailwind CSS with PostCSS, Autoprefixer for cross-browser compatibility  
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Icons**: Lucide React for consistent iconography

## Backend & Database
- **Server**: Express.js with TypeScript support
- **Database**: Neon Database (PostgreSQL) with Drizzle ORM
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod for schema validation and type safety

## Development Tools
- **Development Server**: TSX for TypeScript execution in development
- **Linting**: TypeScript compiler for type checking
- **Database Tools**: Drizzle Kit for migrations and schema management

## Business Integration
- **WhatsApp API**: Direct WhatsApp link generation for customer communication
- **Payment**: Nigerian Naira pricing with WhatsApp-based order processing
- **Analytics**: Replit development tools integration for debugging and monitoring

## Deployment Configuration
- **Production Build**: Vite build pipeline with static asset optimization
- **Environment**: Node.js with ES Modules support
- **Static Assets**: Public directory for brand assets, product images, and PWA files