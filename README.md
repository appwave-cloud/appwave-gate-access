# 🔐 AppWave Gate Access

> **A modern platform for managing OpenVPN configurations from OpnSense Firewalls**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org/)
[![tRPC](https://img.shields.io/badge/tRPC-11.0.0-2596BE)](https://trpc.io/)

## 📋 Overview

AppWave Gate Access is a modern web platform that enables end users to securely download their OpenVPN configurations directly from OpnSense firewalls. The platform provides an intuitive interface for certificate management and OpenVPN profile generation, making VPN access simple and secure.

## ✨ Features

### 🔒 Certificate Management
- **User certificate generation** for OpenVPN profiles
- **Automatic certificate integration** with OpenVPN configurations
- **Secure certificate storage** and management
- **Certificate renewal** and lifecycle management

### 🌐 OpenVPN Configuration
- **Direct download** of OpenVPN configurations from OpnSense
- **Automatic certificate embedding** in OpenVPN profiles
- **Ready-to-use** configuration files
- **Secure authentication** with user certificates

### 🛡️ OpnSense Integration
- **REST API integration** with OpnSense firewalls
- **Secure communication** with firewall management
- **Real-time status** monitoring
- **User-friendly interface** for configuration management

### 🔐 Security & Authentication
- **Secure API communication** with OpnSense
- **Certificate-based** VPN authentication

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React Framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS Framework
- **Shadcn/ui** - Modern UI components
- **React Query** - Data fetching and caching

### Backend & API
- **tRPC** - End-to-end type-safe APIs
- **Zod** - Schema validation
- **SuperJSON** - Enhanced JSON serialization

### Development Tools
- **Biome** - Linter and formatter
- **pnpm** - Fast package manager

## 🚀 Installation

### Prerequisites

- **Node.js** (Version 18 or higher)
- **pnpm** (Package manager)
- **OpnSense Firewall** with API access enabled

### 1. Clone repository

```bash
git clone https://github.com/your-username/appwave-gate-access.git
cd appwave-gate-access
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in the required environment variables:

```env
# OpnSense API Configuration
OPNSENSE_API_URL="https://your-firewall-ip:443"
OPNSENSE_API_KEY="your-api-key"
OPNSENSE_API_SECRET="your-api-secret"

# Application Configuration
NODE_ENV="development"
```

### 4. Start development server

```bash
pnpm dev
```

The application is now available at `http://localhost:3000`.

## 📁 Project Structure

```
appwave-gate-access/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   └── trpc/          # tRPC API
│   │   ├── layout.tsx         # Root Layout
│   │   └── page.tsx           # Home Page
│   ├── server/                # Server-side Logic
│   │   └── api/              # tRPC Routers
│   ├── trpc/                  # tRPC Configuration
│   └── styles/                # Global Styles
├── public/                    # Static Assets
└── package.json              # Dependencies
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Create production build
pnpm start            # Start production server
pnpm preview          # Preview build

# Code Quality
pnpm check            # Check code with Biome
pnpm check:write      # Auto-format code
pnpm typecheck        # Check TypeScript types
```

## 🔌 OpnSense Integration

AppWave Gate Access communicates with your OpnSense firewall via the REST API to retrieve OpenVPN configurations and manage certificates.

### Prerequisites in OpnSense

1. **Enable API access** in your OpnSense installation
2. **Create API credentials** for secure communication
3. **Configure OpenVPN** with certificate authentication
4. **Enable HTTPS** for secure communication

### API Configuration in OpnSense

1. Go to **System > Access > Users**
2. Create a new API user or use existing user
3. Enable **API access** for the user
4. Note down the **API key** and **API secret**
5. Configure **OpenVPN** with certificate authentication

### OpenVPN Configuration

1. **Enable OpenVPN** in OpnSense
2. **Configure certificate authentication**
3. **Set up user certificates** for VPN access
4. **Configure firewall rules** for VPN traffic

## 🔐 Security Features

### Certificate Management
- **User-specific certificates** for VPN authentication
- **Automatic certificate generation** and renewal
- **Secure certificate storage** and distribution
- **Certificate revocation** capabilities

### API Security
- **HTTPS communication** with OpnSense
- **API key authentication** for secure access
- **Request validation** and sanitization
- **Rate limiting** and abuse prevention

## 🚀 Deployment

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables for Production

```env
# OpnSense Configuration
OPNSENSE_API_URL="https://your-firewall-domain:443"
OPNSENSE_API_KEY="your-production-api-key"
OPNSENSE_API_SECRET="your-production-api-secret"

# Application Configuration
NODE_ENV="production"
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Setting up development environment

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/appwave-cloud/appwave-gate-access/issues)
- **Documentation**: [Wiki](https://github.com/appwave-cloud/appwave-gate-access/wiki)
- **Email**: hello@appwave.cloud

## 🙏 Acknowledgments

- **OpnSense** - For the excellent firewall software
- **Shadcn/ui** - For the beautiful UI components
- **tRPC** - For type-safe APIs
- **Vercel** - For the Next.js framework

---

**Built with ❤️ by AppWave**
