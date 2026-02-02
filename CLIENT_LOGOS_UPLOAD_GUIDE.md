# Client Logos Upload Guide

## Overview
The client logos section is now configured and ready to display company logos. You need to upload the actual logo images through Sanity Studio.

## Current Status
✅ Client data structure created (6 companies)
✅ Component configured to display logos
✅ Scrolling animation working
⚠️ Logo images need to be uploaded

## Companies Configured
1. **Addax Petroleum** (client-1)
2. **Chevron** (client-2)
3. **Deltatek Offshore** (client-3)
4. **ExxonMobil** (client-4)
5. **Nigeria LNG Limited** (client-5)
6. **NNPC** (client-6)

## How to Upload Logos

### Method 1: Through Sanity Studio (Recommended)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open Sanity Studio:**
   - Navigate to: http://localhost:3000/studio
   - Or use the hosted studio: https://miresourcesgroup.sanity.studio

3. **Navigate to Clients section:**
   - Click on "Clients" in the left sidebar
   - You should see the "Clients" document

4. **Upload each logo:**
   - Scroll down to "Client Logos" section
   - You'll see 6 client entries
   - For each client:
     - Click on the client entry
     - Click on the "Logo" field
     - Click "Upload" or drag and drop the logo image
     - The image will be automatically uploaded to Sanity's CDN

5. **Save changes:**
   - Click "Publish" button at the bottom

### Method 2: Using the Upload Script

If you have logo files saved locally:

1. **Create a logos folder:**
   ```bash
   mkdir -p public/logos
   ```

2. **Add logo files with these exact names:**
   - `addax-petroleum.png` - Addax Petroleum logo
   - `chevron.png` - Chevron logo
   - `deltatek.png` - Deltatek Offshore logo
   - `exxonmobil.png` - ExxonMobil logo
   - `nlng.png` - Nigeria LNG Limited logo
   - `nnpc.png` - NNPC logo

3. **Run the upload script:**
   ```bash
   node scripts/upload-logos-from-folder.js
   ```

## Logo Image Requirements

### Format
- **Preferred:** PNG with transparent background
- **Alternative:** SVG, JPG, or WebP
- **Size:** Minimum 200x100px, Maximum 800x400px
- **Aspect Ratio:** Approximately 2:1 (width:height)

### Quality Guidelines
- High resolution for crisp display
- Transparent or white background works best
- Company logos should be official versions
- Ensure you have rights to use the logos

## Where to Find Official Logos

### Option 1: Company Websites
Visit each company's official website and look for:
- Press/Media kits
- Brand guidelines
- About pages
- Footer sections

### Option 2: Brand Resource Centers
Many companies have dedicated brand resource pages:
- Chevron: https://www.chevron.com/brand-resources
- ExxonMobil: https://corporate.exxonmobil.com/
- NNPC: https://nnpcgroup.com/

### Option 3: Request from Companies
Contact the companies' marketing departments to request official logo files for partnership display purposes.

## Verification

After uploading logos, verify they appear correctly:

1. **Check in Studio:**
   - Open http://localhost:3000/studio
   - Navigate to Clients
   - Verify each logo shows a thumbnail

2. **Check on Website:**
   - Visit http://localhost:3000
   - Scroll to "Industry Leaders We Serve" section
   - Logos should scroll horizontally
   - Hover over logos to test pause effect

3. **Run test script:**
   ```bash
   node scripts/test-clients-content.js
   ```

## Troubleshooting

### Logos not appearing?
1. Check if images are uploaded in Studio
2. Clear browser cache (Cmd+Shift+R on Mac)
3. Restart dev server
4. Check browser console for errors

### Images look pixelated?
- Upload higher resolution images
- Use PNG or SVG format
- Ensure minimum 200x100px size

### Scrolling not working?
- Check browser console for JavaScript errors
- Verify animation settings in Sanity Studio
- Try different browser

## Technical Details

### How It Works
1. Images uploaded to Sanity are stored in Sanity's CDN
2. Images are automatically optimized (WebP format, responsive sizes)
3. Component fetches image URLs from Sanity
4. Images are displayed with Next.js Image component for optimization
5. CSS animation creates infinite scroll effect

### Image Optimization
- Sanity automatically creates multiple sizes
- WebP format for modern browsers
- Lazy loading for performance
- Responsive images for different screen sizes

## Next Steps

1. ✅ Upload all 6 company logos through Sanity Studio
2. ✅ Verify logos display correctly on homepage
3. ✅ Test scrolling animation and hover effects
4. ✅ Check mobile responsiveness
5. ✅ Commit and push changes

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review Sanity Studio for upload errors
3. Verify environment variables are set correctly
4. Check network tab for failed image requests

## Legal Note

⚠️ **Important:** Ensure you have permission to use company logos. Logos are typically trademarked and should only be used with proper authorization, especially for commercial purposes. Using logos to show client relationships is generally acceptable, but verify with each company's brand guidelines.
