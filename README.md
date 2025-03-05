# QSet

Manage sets when playing sports. Add as many teams as you'd like. Built with SvelteKit.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (version 1.2.0 or higher)
- A modern web browser

### Installation

1. Clone the repository

```bash
git clone https://github.com/qorporate/qset-sveltekit.git
```

2. Install dependencies

```bash
bun install
```

3. Start the development server

```bash
 bun run dev --open
```

## Deployment

This project is configured for deployment to GitHub Pages using GitHub Actions. The deployment workflow is triggered automatically when changes are pushed to the `master` branch.

To deploy to your own GitHub Pages:

1. Fork this repository
2. Enable GitHub Pages in your repository settings
3. Set the GitHub Pages source to "GitHub Actions"
4. Push changes to the `master` branch

The deployment workflow can be found here: `.github/workflows/deploy.yml`.

## Development Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run check` - Run type checking
- `bun run format` - Format code using Prettier
- `bun run lint` - Run linting checks
