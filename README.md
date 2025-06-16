# Ron AI's flagship product, Nira.AI Pilot - Enhanced React Application

A modern React application built with Vite, enhanced with advanced UI components, AI integrations, and developer tooling. This project combines the best of both Vite's fast development experience and Next.js-inspired configurations.

## 🚀 Features

### Core Technologies
- **React 18** with TypeScript
- **Vite** for blazing fast development
- **Tailwind CSS** with custom cyberpunk theme
- **shadcn/ui** components with Radix UI primitives
- **React Router** for navigation
- **Framer Motion** for animations
- **React Hook Form** with Zod validation

### AI & Developer Tools
- **Google Generative AI** integration
- **LangChain** for AI workflows
- **OpenAI** API support
- **Monaco Editor** for code editing
- **React Syntax Highlighter** for code display
- **React Markdown** with GitHub Flavored Markdown

### Enhanced UI Components
- **50+ Radix UI components** (Accordion, Dialog, Dropdown, etc.)
- **Custom cyberpunk theme** with glow effects
- **Responsive design** with mobile-first approach
- **Dark/Light mode** support
- **Interactive animations** and transitions

### Developer Experience
- **ESLint** with TypeScript support
- **Hot Module Replacement** for instant updates
- **Path aliases** (@/components, @/lib, etc.)
- **Component auto-tagging** in development
- **Build optimization** with code splitting

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nira-ai-pilot-home
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with cleanup
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run cleanup` - Kill existing dev servers

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── pages/              # Application pages/routes
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles

public/                 # Static assets
scripts/                # Build and utility scripts
```

## 🎨 Theming

The project includes a comprehensive cyberpunk-inspired theme with:

### Custom Colors
- **Electric Cyan**: `#00f3ff` 
- **Cyber Magenta**: `#ff00ff`
- **Acid Green**: `#7dff7d`
- **Volcanic Orange**: `#ff5e1a`
- **Alert Red**: `#ff1a1a`

### Glow Effects
- Multiple glow shadow variants (cyan, magenta)
- Panel glow effects for cards and dialogs
- Inner edge effects for glass morphism

### Animations
- Pulse glow effects
- Projector flicker
- Smooth accordion transitions
- Task completion animations

## 🔧 Configuration

### TypeScript
- Configured for modern React development
- Path aliases for clean imports
- Strict mode disabled for flexibility

### Vite
- Optimized dependencies bundling
- Code splitting for vendor and UI libraries
- Fast refresh for instant development feedback

### Tailwind CSS
- Custom color palette
- Extended animations and keyframes
- Typography plugin included
- Mobile-first responsive design

## 🤖 AI Integration

The project supports multiple AI providers:

### Google Generative AI
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
```

### OpenAI (via LangChain)
```typescript
import { OpenAI } from '@langchain/openai';
```

### Environment Variables
```env
VITE_OPENAI_API_KEY=your_openai_key
VITE_GOOGLE_AI_API_KEY=your_google_ai_key
```

## 📱 Components

### UI Components
All shadcn/ui components are available:
- Accordion, Alert Dialog, Avatar
- Button, Card, Checkbox
- Dialog, Dropdown Menu, Form
- Input, Label, Navigation Menu
- Popover, Progress, Radio Group
- Scroll Area, Select, Separator
- Sheet, Slider, Switch
- Table, Tabs, Toast
- Toggle, Tooltip, and more

### Custom Components
- Enhanced with cyberpunk styling
- Glow effects and animations
- Responsive design patterns

## 🔍 Development Tips

1. **Hot Reload**: Changes are instantly reflected
2. **Component Tagging**: Development mode tags components for easy debugging
3. **Type Safety**: Full TypeScript support with IntelliSense
4. **Path Aliases**: Use `@/` for clean imports
5. **Linting**: ESLint catches issues early

## 🚦 Build & Deploy

### Development Build
```bash
npm run build:dev
```

### Production Build
```bash
npm run build
```

The build output will be in the `dist` directory, optimized for production deployment.

## 📋 Original Lovable Project

**URL**: https://lovable.dev/projects/024c8007-3aab-419d-99c7-f056e1c09e92

This project was originally created with Lovable and has been enhanced with additional features and configurations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions and support:
- Check the documentation
- Review the component examples
- Open an issue on GitHub

---

Built with ❤️ using React, Vite, and modern web technologies.
