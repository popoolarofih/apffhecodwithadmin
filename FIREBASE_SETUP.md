# Firebase Setup Guide — APFFHECOD

## What Firebase is used for
| Service | Purpose |
|---------|---------|
| **Firestore** | Stores gallery item metadata (title, category, date, URL, etc.) |
| **Firebase Storage** | Where you upload your actual image/video files to get URLs |

> The website itself **never uploads files directly**. The admin pastes a public URL into the dashboard, and only that URL + metadata is written to Firestore.

---

## Step 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → follow the wizard
3. Once created, click **Web** (</>) to register a web app
4. Copy the config object shown — you'll need it in Step 3

---

## Step 2 — Enable Firestore

1. In the Firebase console sidebar → **Build → Firestore Database**
2. Click **Create database** → choose **Start in test mode** (you can tighten rules later)
3. Pick a region close to Nigeria (e.g. `europe-west1`)

### Recommended Firestore Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for gallery
    match /gallery/{doc} {
      allow read: if true;
      allow write: if false; // writes happen server-side / admin only
    }
  }
}
```

---

## Step 3 — Enable Firebase Storage (for hosting your files)

1. In the sidebar → **Build → Storage**
2. Click **Get started** → test mode → choose region
3. Upload images/videos directly from the Firebase console or using the Storage browser

### How to get a public download URL
1. Open **Storage** in the Firebase console
2. Upload a file
3. Click the file → copy the **Download URL** (it looks like `https://firebasestorage.googleapis.com/v0/b/…`)
4. Paste that URL into the admin upload form

---

## Step 4 — Configure environment variables

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and replace every placeholder:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

   NEXT_PUBLIC_ADMIN_USERNAME=admin
   NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
   ```

3. Restart the dev server:
   ```bash
   npm run dev
   ```

---

## Step 5 — Run the project

```bash
npm install
npm run dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) to log in.

---

## Admin workflow

1. Upload your image/video to **Firebase Storage** via the console
2. Copy the **Download URL**
3. Log in to `/admin` → **Upload Media**
4. Paste the URL, fill in the title + details, click **Publish**
5. The item appears instantly on the public `/activities` page

---

## Deployment (Vercel recommended)

1. Push the repo to GitHub
2. Import into [vercel.com](https://vercel.com)
3. Add all `NEXT_PUBLIC_FIREBASE_*` and `NEXT_PUBLIC_ADMIN_*` variables in the Vercel project settings
4. Deploy — done!
