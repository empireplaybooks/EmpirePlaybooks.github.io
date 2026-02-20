# Travel Healthcare Pay Calculator - Documentation

## Overview

This is a standalone Travel Healthcare Pay Calculator built with HTML, CSS, and JavaScript. It allows users to calculate their estimated take-home pay from contract offers, compare multiple contracts, and understand the long-term financial implications of their pay structure.

It is designed to be embedded into any website, including WordPress.com sites on any plan, using an iframe.

**Live Demo:** [Link to live demo will be provided upon deployment]

## Features

- **Single Contract Calculation:** Detailed breakdown of weekly and total contract net pay.
- **Comparison Mode:** Side-by-side comparison of two contract offers.
- **Accurate Tax Estimates:** Uses 2026 tax data for federal and state withholding, plus FICA.
- **Tax Home Logic:** Correctly calculates tax liability based on whether the user maintains a tax home.
- **Long-Term Impact Visibility:** Shows users how their pay structure affects mortgage qualification, Social Security, and retirement.
- **Mobile-Responsive:** Clean, modern UI that works on any device.
- **Easy to Customize:** Colors, affiliate links, and text can be changed easily in the configuration section.

## File Structure

- `index.html`: The main HTML structure of the calculator.
- `styles.css`: The CSS for styling the calculator.
- `calculator.js`: The JavaScript logic for all calculations.
- `README.md`: This documentation file.
- `INTEGRATION.md`: Step-by-step guide for embedding the calculator.
- `MAINTENANCE.md`: Checklist for annual updates.

## How to Use

1.  **Host the files:** Upload the `travel-healthcare-calculator` directory to a static hosting service like GitHub Pages or Netlify.
2.  **Embed on your site:** Follow the instructions in `INTEGRATION.md` to embed the calculator on your WordPress site.

## Customization

All major customizations can be done in the `calculator.js` file within the `CONFIG` object at the top.

```javascript
// === CONFIGURATION SECTION ===
const CONFIG = {
    // Affiliate Links (replace with your actual affiliate URLs)
    affiliateLinks: {
        taxSpecialist: 'https://your-tax-specialist-affiliate-link.com',
        taxSoftware: 'https://your-tax-software-affiliate-link.com',
        housing: 'https://your-housing-affiliate-link.com'
    },
    
    // Email capture endpoint (replace with your email service)
    emailCaptureEndpoint: 'https://your-email-service.com/subscribe',
    
    // Current tax year
    taxYear: 2026
};
```

- **Affiliate Links:** Change the URLs to your own affiliate links.
- **Email Capture:** Update the endpoint to your email marketing service's form submission URL.
- **Tax Year:** Update this when you update the tax data.

To change colors, edit the `:root` section at the top of `styles.css`.

## Maintenance

Tax data needs to be updated annually. Follow the simple checklist in `MAINTENANCE.md` to keep the calculator accurate.

## Technical Details

- **Frontend:** Vanilla HTML, CSS, and JavaScript.
- **No Backend:** All calculations are performed client-side. There is no database or server-side logic.
- **Dependencies:** None. The calculator is self-contained.

## Disclaimers

The calculator provides estimates for informational and comparison purposes only. It is not a substitute for professional tax advice. All users should consult with a qualified tax professional for advice tailored to their individual situation.
