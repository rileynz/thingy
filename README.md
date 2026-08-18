# Cloudflare Pages website

This is the redesigned **Connected Device Registry** site for the two Thingy:91 NFC URLs.

The firmware URLs are unchanged:

- `https://thingy.rileybylsma.tech/thingy/1/`
- `https://thingy.rileybylsma.tech/thingy/2/`

You can redesign or update these pages later without rebuilding or reflashing the NFC firmware, as long as those URLs remain available.

## Deploy with GitHub → Cloudflare Pages

1. Put the **contents of this `website` folder** at the root of the GitHub repository connected to Cloudflare Pages, or configure the project to deploy the `website` directory.
2. Framework preset: **None**.
3. Build command: leave blank.
4. Output directory: `.` when these files are at the repository root; otherwise use `website` when deploying this bundle layout.
5. Keep the custom domain `thingy.rileybylsma.tech` attached.
6. After deployment, test `/`, `/thingy/1/`, `/thingy/2/`, and an invalid path for the 404 page.

## Device-specific settings

Edit `assets/config.js` to change each unit's display name, role, description, or nRF Cloud shortcut. Do not store API keys, passwords, tokens, precise private locations, or other secrets in browser-side files.
