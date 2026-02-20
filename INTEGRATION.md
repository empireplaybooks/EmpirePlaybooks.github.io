# WordPress Integration Guide

This guide will walk you through embedding the Travel Healthcare Pay Calculator on your WordPress.com site. Since you are on the Starter plan, we will use the **iframe method** with **GitHub Pages** for hosting.

**Time required:** 10-15 minutes

## Step 1: Create a GitHub Account

If you don't already have one, sign up for a free account at [github.com](https://github.com).

## Step 2: Create a New Repository

1.  On the GitHub homepage, click the **+** icon in the top right and select **New repository**.
2.  For the **Repository name**, it must be exactly `yourusername.github.io` (replace `yourusername` with your actual GitHub username).
3.  Make sure the repository is set to **Public**.
4.  Check the box that says **Add a README file**.
5.  Click **Create repository**.

## Step 3: Upload the Calculator Files

1.  Go to your newly created repository (`yourusername.github.io`).
2.  Click the **Add file** button and select **Upload files**.
3.  Drag and drop the entire `travel-healthcare-calculator` folder into the upload area.
4.  In the **Commit changes** box, type "Initial calculator upload" and click **Commit changes**.

## Step 4: Enable GitHub Pages

1.  In your repository, go to the **Settings** tab.
2.  In the left sidebar, click on **Pages**.
3.  Under **Branch**, make sure it says `main` and `/root`.
4.  Click **Save**.
5.  Your site will be live in a few minutes at `https://yourusername.github.io/travel-healthcare-calculator/`.

## Step 5: Embed on Your WordPress Site

1.  Log in to your WordPress.com dashboard.
2.  Go to **Pages** and either create a new page or edit the page where you want the calculator to appear.
3.  Click the **+** icon to add a new block.
4.  Search for and select the **Embed** block.
5.  Paste the URL of your calculator from Step 4:
    `https://yourusername.github.io/travel-healthcare-calculator/`
6.  Click **Embed**.
7.  You should see a preview of the calculator appear in the editor.
8.  **Save** or **Publish** your WordPress page.

That's it! The calculator is now live on your site.

## Adjusting the Height

If the calculator looks cut off, you may need to adjust the height of the iframe.

1.  In the WordPress editor, click the three dots on the Embed block and select **Edit as HTML**.
2.  You will see code like this:
    `<iframe src="..." width="..." height="..."></iframe>`
3.  Change the `height` value to a larger number, like `height="2800"`.
4.  Preview until it looks right.

## Updating the Calculator

To update the calculator (e.g., change text, update tax rates):

1.  Edit the files on your local computer.
2.  Go back to your GitHub repository.
3.  Click **Add file** > **Upload files**.
4.  Re-upload the changed files.
5.  Commit the changes.

Your embedded calculator will update automatically within a few minutes.
