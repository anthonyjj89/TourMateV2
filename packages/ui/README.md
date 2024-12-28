# @repo/ui

A shared UI component library for the TourMate application.

## Components

### Button

A customizable button component with different variants and states.

```tsx
import { Button } from "@repo/ui";

<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>
```

Props:
- `variant`: "primary" | "secondary" | "outline"
- `size`: "sm" | "md" | "lg"
- `isLoading`: boolean
- All standard button HTML attributes

### Card

A flexible card component for containing content.

```tsx
import { Card } from "@repo/ui";

<Card variant="default" padding="md">
  Card content goes here
</Card>
```

Props:
- `variant`: "default" | "bordered"
- `padding`: "none" | "sm" | "md" | "lg"
- All standard div HTML attributes

### Code

A code block component with syntax highlighting.

```tsx
import { Code } from "@repo/ui";

<Code 
  code="const hello = 'world';" 
  language="javascript"
/>
```

Props:
- `code`: string - The code to display
- `language`: string - Programming language for syntax highlighting
- `className`: string - Additional CSS classes

## Installation

Since this is a private package within the monorepo, it's automatically available to other packages and apps in the workspace.

## Development

1. Make changes to components in the `src` directory
2. Run `npm run build` to compile
3. Run `npm run lint` to check for any issues
4. Import and use in other packages/apps within the monorepo
