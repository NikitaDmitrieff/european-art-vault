# feedback-chat Onboarding Issues

Errors encountered while installing `@nikitadmitrieff/feedback-chat` in this Next.js project.

---

## 1. Dependencies not saved to `package.json` — Vercel build fails

**Where:** Step 2

**Severity:** High — production deploy is completely broken.

If the dependencies were already present in `node_modules` from a previous install attempt, running `npm install <packages>` reports "up to date" but does **not** add them to `package.json` if they were installed without `--save` originally. This causes the Vercel build to fail with `Module not found: Can't resolve '@nikitadmitrieff/feedback-chat'` because Vercel does a fresh `npm install` from `package.json`.

**Observed error on Vercel:**
```
Turbopack build failed with 4 errors:
Module not found: Can't resolve '@nikitadmitrieff/feedback-chat'
Module not found: Can't resolve '@nikitadmitrieff/feedback-chat/server'
Module not found: Can't resolve '@nikitadmitrieff/feedback-chat/styles.css'
```

**Fix:** Verify packages appear in `package.json` after install. If they show as "extraneous" in `npm ls`, re-run `npm install <packages> --save`.

**Suggestion:** Step 2 should note that users should verify `package.json` was updated, especially if packages were partially installed from a prior attempt.

---

## 2. Webhook returns 401 — agent not picking up issues

**Where:** Step 10 (webhook) + post-install runtime

**Severity:** Critical — the entire feedback-to-implementation pipeline is broken.

After completing all onboarding steps, the GitHub webhook fires correctly on issue creation but the dashboard agent returns **401 Unauthorized** for every delivery — including the initial ping.

**Observed webhook deliveries (all 401):**
```
ping           → 401
issues/opened  → 401
issues/labeled → 401
issues/labeled → 401
```

The webhook was configured with the exact secret and URL provided in the onboarding instructions:
- URL: `https://feedback-chat-dashboard.vercel.app/api/webhook/df53f352-b0e6-4f03-aa41-df79c1fcc15a`
- Secret: `2e650293ed73b47d22760b096984859eacaa89692b0178a79838a7addd414c5e`

The 401 on ping means the dashboard-side agent either doesn't exist, isn't active, or the webhook secret doesn't match what was registered.

**Impact:** Issues are created with the correct labels (`feedback-bot`, `auto-implement`) but the agent never processes them. The user sees "request submitted" but nothing happens.

**Suggestion:** The onboarding flow should verify the webhook handshake succeeded (ping returned 200) before considering setup complete. If the agent UUID or secret are pre-generated, ensure they're active on the dashboard before distributing them.
