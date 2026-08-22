# 🍔 Bumble Burger Website (بامبل برجر - أسيوط)

A production-grade, ultra-fast, mobile-first website for **Bumble Burger** located in **Al Walideyah Al Qebleyah, Assiut, Egypt**.

---

## 🌟 Features & Highlights

- **Bilingual Arabic & English (RTL & LTR)**: Native Egyptian Arabic marketing copy with full Arabic typography (Cairo/Tajawal fonts) and an instant English toggle.
- **Conversion-Optimized**: 6 primary conversion actions (WhatsApp ordering, Phone calls, Google Maps directions, Interactive Menu, Google Reviews, Social links).
- **Interactive Menu**: Category filtering, instant live search, and dynamic WhatsApp order generation with custom notes.
- **Special Promotional Packages**: 3 pre-built promotional combo offers.
- **NFC Card & Google Reviews Ready**: Centralized `GOOGLE_REVIEW_URL` constant prepared for tap-to-review NFC cards and stickers.
- **Centralized Configuration**: All restaurant details, phone numbers, URLs, prices, and menu items live in `data/restaurant-data.js`.
- **Local SEO & Schema Markup**: JSON-LD Structured Data (`Restaurant` & `LocalBusiness`) optimized for Assiut search queries.
- **Zero Bloat & Blazing Fast**: Pure HTML5, CSS3 Custom Properties, and Vanilla ES6+ modules with 0 heavy runtime dependencies.

---

## 📁 Project Structure

```
bumble-burger-website/
├── index.html                  # Semantic, SEO-optimized HTML document with Schema
├── css/
│   ├── main.css                # Design tokens, typography, CSS reset, layout utilities
│   ├── components.css          # Navigation, hero, cards, menu items, reviews, footer
│   └── responsive.css          # Mobile-first breakpoints, RTL/LTR styles, animations
├── js/
│   ├── app.js                  # Main controller, menu filtering, search, i18n switcher
│   └── whatsapp-order.js       # Dynamic WhatsApp order message generator
├── data/
│   └── restaurant-data.js      # Centralized restaurant profile, menu, offers, and translations
├── assets/
│   └── images/                 # High-resolution vector food illustrations, logo, and favicon
└── README.md                   # Project documentation & deployment guide
```

---

## 🚀 How to Run Locally

Because the project uses modern ES6 JavaScript modules (`import/export`), it should be served via any local HTTP server:

### Option 1: Using Node (npx)
```bash
npx serve .
# or
npx http-server -p 8080
```

### Option 2: Using Python
```bash
python -m http.server 8080
```

Open your browser at `http://localhost:8080`.

---

## ✏️ How to Update Restaurant Info, Prices & Menu

All restaurant information is centrally managed in **`data/restaurant-data.js`**:

1. **Phone & WhatsApp**:
   Update `RESTAURANT_CONFIG.contact.phone` and `RESTAURANT_CONFIG.contact.whatsappNumber`.
2. **Google Maps Link**:
   Update `RESTAURANT_CONFIG.contact.googleMapsUrl`.
3. **Google Reviews / NFC Link**:
   Update `GOOGLE_REVIEW_URL` at the top of `data/restaurant-data.js`.
4. **Menu Items & Prices**:
   Modify or add items in the `MENU_ITEMS` array. You can adjust `suggestedPrice`, `priceNote`, `name`, `description`, `badge`, and `image`.
5. **Special Offers**:
   Update the packages inside the `SPECIAL_OFFERS` array.
6. **Social Media Accounts**:
   Update links in `RESTAURANT_CONFIG.contact.socialMedia`.

---

## 🌐 How to Deploy Online

### Telegram order notifications on Netlify
- Add a Netlify Function environment variable named `TELEGRAM_BOT_TOKEN` containing the bot token.
- Add `TELEGRAM_CHAT_ID` containing the destination group or chat ID.
- Never put either value in browser JavaScript or commit them to the repository.
- The confirmation button saves the order first, then calls `/.netlify/functions/telegram-order`.

### 1. Vercel / Netlify (Recommended - 1 Click)
- Drag and drop the `bumble-burger-website` folder directly into [Netlify Drop](https://app.netlify.com/drop) or push to GitHub and deploy on [Vercel](https://vercel.com).
- No build command required. Publish directory: `./`.

### 2. GitHub Pages
- Push the code to a GitHub repository.
- Go to **Settings** > **Pages** > Select `main` branch root folder and save.

### 3. Traditional Web Hosting (cPanel / Apache / Nginx)
- Upload all files from the folder to your `public_html` directory via cPanel File Manager or FTP.

---

© 2026 Bumble Burger (بامبل برجر - أسيوط). All rights reserved.
