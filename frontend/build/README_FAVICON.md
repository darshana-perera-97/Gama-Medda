# Favicon Setup Instructions

The website uses a custom SVG favicon with Avurudu Ulela branding (sun symbol with letter "A").

## If the favicon is still showing the React default:

1. **Hard refresh your browser:**
   - Chrome/Edge: `Ctrl + Shift + R` or `Ctrl + F5`
   - Firefox: `Ctrl + Shift + R` or `Ctrl + F5`
   - Safari: `Cmd + Shift + R`

2. **Clear browser cache:**
   - Go to browser settings → Clear browsing data → Cached images and files

3. **Generate favicon.ico (optional):**
   - Visit https://realfavicongenerator.net/ or https://favicon.io/favicon-converter/
   - Upload `favicon.svg`
   - Download the generated `favicon.ico`
   - Place it in the `public` folder

4. **Restart the development server:**
   ```bash
   npm start
   ```

## Current Favicon Design:
- Sun symbol with 8 rays (representing Avurudu/New Year)
- Letter "A" for Avurudu
- Brand colors: Gold (#d4af37) and Red (#dc143c)

The SVG favicon is prioritized for modern browsers, with ICO as fallback for older browsers.

