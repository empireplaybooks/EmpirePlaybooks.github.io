# Calculator Maintenance Guide

This guide provides a simple checklist for keeping your Travel Healthcare Pay Calculator accurate and up-to-date.

## Annual Maintenance (Every January)

**Time required:** 15-20 minutes per year

**When:** The IRS and Social Security Administration typically announce new rates in the fall for the upcoming year. It is best to perform this update in early January.

### Checklist:

1.  [ ] **Update Federal Tax Brackets:**
    -   **Source:** Search for "IRS tax brackets [current year]" (e.g., "IRS tax brackets 2027").
    -   **File to edit:** `calculator.js`
    -   **Section:** `federalTaxBrackets`
    -   **Action:** Replace the `max` values for `single`, `married`, and `hoh` with the new numbers.

2.  [ ] **Update Standard Deduction:**
    -   **Source:** Same IRS announcement as tax brackets.
    -   **File to edit:** `calculator.js`
    -   **Section:** `standardDeductions`
    -   **Action:** Replace the values for `single`, `married`, and `hoh`.

3.  [ ] **Update FICA Limits:**
    -   **Source:** Search for "Social Security wage base limit [current year]".
    -   **File to edit:** `calculator.js`
    -   **Section:** `FICA`
    -   **Action:** Update the `socialSecurityLimit` value.

4.  [ ] **Update "Last Updated" Timestamp:**
    -   **File to edit:** `index.html`
    -   **Section:** In the `<footer>`, find the `.last-updated` div.
    -   **Action:** Change the year to the current year (e.g., "January 2027").

5.  [ ] **Re-upload Files:**
    -   Upload the modified `calculator.js` and `index.html` files to your GitHub repository.
    -   The changes will automatically reflect on your website.

## Quarterly Maintenance (Every 3 Months)

**Time required:** 5 minutes

### Checklist:

1.  [ ] **Check Affiliate Links:**
    -   **Action:** Click on the affiliate links in your calculator to ensure they are still working and haven't been redirected or broken.
    -   If a link is broken, log in to your affiliate program dashboard to get the new URL.
    -   Update the link in the `CONFIG` section of `calculator.js`.

## As-Needed Maintenance

### State Tax Rate Changes

-   **How you'll know:** This is rare, but you can set up a Google Alert for "[State Name] income tax rate change".
-   **Action:** If a state changes its rate, update the `stateTaxRates` object in `calculator.js`.

### Text or Copy Changes

-   **Action:** To change any text on the calculator (instructions, labels, disclaimers), find the text in `index.html` and edit it directly.

## Email Reminder Setup

To ensure you don't forget the annual update, you can set up a free email reminder.

**Using Zapier (or similar service like IFTTT):**

1.  Sign up for a free Zapier account.
2.  Click **Create Zap**.
3.  **Trigger:** Select **Schedule by Zapier**.
4.  **Event:** Choose **Every Year**.
5.  **Customize:** Set the **Month** to January and **Day of the Month** to 5.
6.  **Action:** Select **Email by Zapier**.
7.  **Event:** Choose **Send Outbound Email**.
8.  **Customize:**
    -   **To:** Your email address
    -   **Subject:** Reminder: Update Your Travel Pay Calculator
    -   **Body:** "It's January! Time to update the tax brackets, FICA limits, and standard deduction on your calculator. Follow the steps in your MAINTENANCE.md file."
9.  **Test and activate** the Zap.

Now you will get an automated reminder every year, so you can keep your calculator accurate with just a few minutes of work.
