# UterLIZ Order + Chat site (GitHub Pages + Firebase)

This is a static GitHub Pages frontend connected to Firebase for Google login, order storage, live project chat, and an admin order panel. **It will not work as a shared live order system until you create/configure a Firebase project.** Never put private service-account keys in this repository. The web config below is client-side config; access is protected by Firestore rules.

## 1) Create Firebase project (phone-friendly)
1. Open https://console.firebase.google.com/ and create a project, e.g. `uterliz-orders`.
2. In Project settings → General, add a Web app (`</>` icon). Copy its Firebase config.
3. In Authentication → Sign-in method, enable **Google**. Set a support email.
4. In Authentication → Settings → Authorized domains, add `uterLIZ1.github.io` (the hostname only; no `https://` or path). If it already exists, leave it.
5. Open Firestore Database → Create database. Start in production mode and choose a region.

## 2) Paste web config
1. In GitHub repository `Myintroduction.github.io`, open `app.js` → pencil/edit.
2. Replace the placeholder values in `firebaseConfig` near the top with the real values from your Firebase web app. Do not share screenshots that expose anything you consider secret; the web config is intended for browser apps.
3. Commit the change.

## 3) Apply database security rules
1. Firebase Console → Firestore Database → Rules.
2. Replace the rules with the contents of `firestore.rules` in this folder and Publish.
3. Admin panel access is tied to the signed-in email `utkarshgamer.ug@gmail.com`. Make sure Google sign-in uses that exact account. Do not use client-only email checks as security; these Firestore rules enforce access too.

## 4) Upload files to GitHub Pages
Upload/replace these files at the **repository root** (not inside a nested folder):
- `index.html`
- `style.css`
- `app-extra.css`
- `app.js`
- `minecraft-hero.png`

`firestore.rules` and this setup guide are for reference; you can keep them in the repo, but do not put Firebase service-account credentials in the repository. Commit changes. GitHub Pages usually republishes within a few minutes.

## Features
- Removes the old generic contact system.
- Customers sign in with Google, book one of the three services, and get an order with a live message thread.
- Admin email above can see all orders, change statuses, and open any customer's chat.
- Customers can only read their own orders/messages.
- Order data and chat messages are stored in Firestore, not just the visitor's browser.

## Important notes
- GitHub Pages is static hosting; Firebase supplies the backend/auth/database.
- Google sign-in popups may behave differently on mobile. The app falls back to redirect when the browser blocks popups.
- For the admin list's compound query, if Firebase shows a message with a link to create a Firestore index, open that link and create the suggested index. The owner order query may request an index depending on your Firestore setup.
