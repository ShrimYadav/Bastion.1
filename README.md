# Bastion - Autonomous AI Cyber Defense Arena

Bastion is a modern React 19 + TypeScript + Vite application.

---

## Why does opening `index.html` directly not work?

If you double-click `index.html` in your file manager (opening `file:///.../index.html`), the browser will show a blank white screen. 

This happens because:
1. **TypeScript & React JSX (`.tsx`)**: Browsers cannot directly execute raw `.tsx` files (`/src/main.tsx`). They must be compiled and bundled by Vite.
2. **Browser Security & CORS**: Browsers block ES Module imports (`type="module"`) when opened directly from the filesystem (`file://`) due to standard web security policies.

To run Bastion on your system, you just need Node.js installed.

---

## Quick Start (Run Locally)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or newer).

### Step 1: Open Terminal in the `bastion` folder
Open your terminal (Command Prompt, PowerShell, or macOS/Linux Terminal) and navigate to the extracted folder:
```bash
cd bastion
```

### Step 2: Install Dependencies
Run:
```bash
npm install
```

### Step 3: Start the Development Server
Run:
```bash
npm run dev
```

You will see output like:
```
  VITE v6.2.3  ready in 250 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Open your browser and visit: **`http://localhost:3000`**

---

## Production Build (To generate standalone HTML/JS files)

If you want to create a compiled production build in the `dist` directory:

```bash
npm run build
```

To test the compiled production build locally:
```bash
npm run preview
```
or
```bash
npx serve dist
```
