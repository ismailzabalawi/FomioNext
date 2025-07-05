# **App Name**: Fomio

## Core Features:

- Bottom Dock Navigation: Persistent bottom dock with dynamic highlighting and icon switching for Home, Discover, Create, Notifications, and Profile tabs.
- Home Feed: Display of a feed with the latest content.
- Search: Implements the search functionality.
- List of Bytes in Teret: Display list of bytes in a teret with a back button.
- Theme Mode Toggle: Toggle between light, dark, and reader modes and persist using AsyncStorage.
- Discourse API Integration: Set up a base api.ts file to fetch latest bytes (topics), terets (tags or categories), byte details, posts, and user profiles from Discourse.

## Style Guidelines:

- Primary color: Deep blue (#3B82F6) to evoke trust and a sense of community. The color should work well with both light and dark themes.
- Background color: Very light grey (#F9FAFB) for light mode, very dark grey (#1F2937) for dark mode, each with a hue similar to the primary color.
- Accent color: Soft violet (#A855F7) to complement the primary blue and add a touch of modernity. This should stand out against both light and dark backgrounds.
- Body font: 'Inter', sans-serif, for a modern and readable user interface.
- Headline font: 'Space Grotesk', sans-serif, for headlines and short amounts of body text; provides a techy feel.
- Use Phosphor Icons throughout the application for a consistent and modern look.
- Flat and direct component structure, avoiding nested layers.