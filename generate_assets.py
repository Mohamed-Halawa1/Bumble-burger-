import os

assets_dir = r"C:\Users\mohha\.gemini\antigravity\scratch\bumble-burger-website\assets\images"
os.makedirs(assets_dir, exist_ok=True)

# 1. Logo SVG
logo_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80">
  <defs>
    <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD000" />
      <stop offset="100%" stop-color="#FF9500" />
    </linearGradient>
    <linearGradient id="flameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF4B2B" />
      <stop offset="100%" stop-color="#FF416C" />
    </linearGradient>
  </defs>
  
  <g transform="translate(10, 10)">
    <circle cx="30" cy="30" r="28" fill="url(#yellowGrad)" opacity="0.15" />
    <circle cx="30" cy="30" r="26" fill="#1C1C24" stroke="url(#yellowGrad)" stroke-width="2" />
    <path d="M16 26 C16 17, 44 17, 44 26 Z" fill="url(#yellowGrad)" />
    <circle cx="24" cy="21" r="1" fill="#FFF" opacity="0.9" />
    <circle cx="30" cy="19" r="1" fill="#FFF" opacity="0.9" />
    <circle cx="36" cy="22" r="1" fill="#FFF" opacity="0.9" />
    <rect x="15" y="27.5" width="30" height="4" rx="2" fill="#E63946" />
    <path d="M17 31 L20 37 L24 31 L29 36 L34 31 L39 35 L43 31 Z" fill="#FFB800" />
    <rect x="16" y="32" width="28" height="5" rx="2.5" fill="#5A2E17" />
    <path d="M17 39 C17 43, 43 43, 43 39 Z" fill="url(#yellowGrad)" />
  </g>
  
  <g transform="translate(75, 26)">
    <text x="0" y="20" font-family="'Cairo', 'Outfit', sans-serif" font-size="25" font-weight="900" fill="#FFFFFF" letter-spacing="1">
      BUMBLE <tspan fill="url(#yellowGrad)">BURGER</tspan>
    </text>
    <text x="2" y="38" font-family="'Cairo', 'Tajawal', sans-serif" font-size="12" font-weight="700" fill="#FFB800" letter-spacing="2">
      بامبل برجر • أسيوط
    </text>
  </g>
</svg>'''

with open(os.path.join(assets_dir, "logo.svg"), "w", encoding="utf-8") as f:
    f.write(logo_svg)

# 2. Favicon SVG
favicon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E1E24" />
      <stop offset="100%" stop-color="#0E0E12" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD000" />
      <stop offset="100%" stop-color="#FF9500" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="2"/>
  <path d="M14 26 C14 14, 50 14, 50 26 Z" fill="url(#goldGrad)" />
  <circle cx="26" cy="20" r="1.5" fill="#FFF" />
  <circle cx="34" cy="18" r="1.5" fill="#FFF" />
  <circle cx="41" cy="22" r="1.5" fill="#FFF" />
  <path d="M12 28 C20 28, 22 36, 28 29 C34 37, 40 28, 52 28" fill="none" stroke="#FFB800" stroke-width="4" stroke-linecap="round" />
  <rect x="13" y="32" width="38" height="8" rx="4" fill="#6B3319" />
  <path d="M15 42 C15 49, 49 49, 49 42 Z" fill="url(#goldGrad)" />
</svg>'''

with open(os.path.join(assets_dir, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(favicon_svg)

def make_food_card_svg(title_en, title_ar, color_accent, icon_type, badge_text="BUMBLE SIGNATURE"):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 380" width="500" height="380">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#262633" />
      <stop offset="100%" stop-color="#101015" />
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  
  <rect width="500" height="380" rx="24" fill="url(#bgGrad)"/>
  <circle cx="250" cy="180" r="140" fill="{color_accent}" opacity="0.12" />
  <circle cx="250" cy="180" r="90" fill="#FFB800" opacity="0.08" />
  <circle cx="250" cy="180" r="130" fill="none" stroke="{color_accent}" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.25"/>
  
  <ellipse cx="250" cy="275" rx="160" ry="24" fill="#050508" opacity="0.8"/>
  <ellipse cx="250" cy="270" rx="140" ry="14" fill="#0C0C10" opacity="0.9" stroke="{color_accent}" stroke-width="1" stroke-opacity="0.3"/>
  
  <g transform="translate(130, 60)" filter="url(#shadow)">
    {get_inner_graphic(icon_type, color_accent)}
  </g>
  
  <g transform="translate(30, 30)">
    <rect width="170" height="34" rx="17" fill="#181822" stroke="{color_accent}" stroke-width="1.5"/>
    <text x="85" y="21" font-family="'Outfit', 'Cairo', sans-serif" font-size="12" font-weight="800" fill="#FFB800" text-anchor="middle" letter-spacing="1">
      {badge_text}
    </text>
  </g>
  
  <rect x="30" y="315" width="440" height="42" rx="12" fill="#14141C" stroke="#2C2C38" stroke-width="1"/>
  <text x="50" y="341" font-family="'Cairo', sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">
    {title_ar}
  </text>
  <text x="450" y="340" font-family="'Outfit', sans-serif" font-size="14" font-weight="700" fill="#FFB800" text-anchor="end">
    {title_en}
  </text>
</svg>'''

def get_inner_graphic(icon_type, accent):
    if icon_type == "island":
        return '''
        <!-- Brioche Top Bun -->
        <path d="M20 70 C20 15, 220 15, 220 70 Z" fill="#E5983B" stroke="#D38222" stroke-width="2"/>
        <ellipse cx="80" cy="42" rx="3.5" ry="2" fill="#FFF8DC"/>
        <ellipse cx="120" cy="35" rx="3.5" ry="2" fill="#FFF8DC"/>
        <ellipse cx="160" cy="45" rx="3.5" ry="2" fill="#FFF8DC"/>
        <!-- Golden Onion Ring sitting on top layer -->
        <ellipse cx="120" cy="72" rx="45" ry="14" fill="#ECC94B" stroke="#D69E2E" stroke-width="4"/>
        <ellipse cx="120" cy="72" rx="28" ry="8" fill="#111116"/>
        <!-- White cheese & Cheddar lava cascade -->
        <path d="M30 65 Q120 85, 210 65 L215 90 Q120 120, 25 90 Z" fill="#FFFBEB" opacity="0.95"/>
        <path d="M50 80 L55 110 L65 85 L100 120 L115 85 L150 115 L165 85 L190 105 Z" fill="#FFB800"/>
        <!-- Huge Crispy Fried Chicken -->
        <path d="M10 88 Q40 75, 80 92 Q130 70, 180 92 Q225 80, 230 105 Q225 130, 180 125 Q120 135, 60 125 Q10 128, 10 88 Z" fill="#C05621" stroke="#9C4221" stroke-width="2"/>
        <circle cx="55" cy="102" r="3.5" fill="#FBD38D"/>
        <circle cx="110" cy="108" r="4" fill="#FBD38D"/>
        <circle cx="165" cy="104" r="3.5" fill="#FBD38D"/>
        <!-- Lettuce & Bun -->
        <path d="M15 120 Q120 135, 225 120" stroke="#48BB78" stroke-width="6" stroke-linecap="round"/>
        <path d="M20 126 C20 155, 220 155, 220 126 Z" fill="#D38222" stroke="#B76B13" stroke-width="2"/>
        '''
    elif icon_type == "matafi":
        return '''
        <!-- Red/Spicy Glazed Chicken -->
        <path d="M20 70 C20 15, 220 15, 220 70 Z" fill="#E5983B" stroke="#D38222" stroke-width="2"/>
        <ellipse cx="80" cy="42" rx="3.5" ry="2" fill="#FFF8DC"/>
        <ellipse cx="140" cy="38" rx="3.5" ry="2" fill="#FFF8DC"/>
        <!-- Fiery Red Glaze Drops -->
        <path d="M15 72 Q120 90, 225 72 L225 82 Q120 100, 15 82 Z" fill="#E53E3E"/>
        <!-- Spicy Crunchy Chicken Breast -->
        <path d="M10 80 Q50 68, 100 85 Q160 68, 225 82 Q235 110, 200 122 Q130 130, 60 125 Q5 115, 10 80 Z" fill="#9B2C2C" stroke="#742A2A" stroke-width="2"/>
        <!-- Chili Red Dots -->
        <circle cx="45" cy="95" r="3.5" fill="#E53E3E"/>
        <circle cx="95" cy="102" r="4" fill="#FC8181"/>
        <circle cx="150" cy="98" r="3.5" fill="#E53E3E"/>
        <circle cx="195" cy="100" r="3" fill="#FC8181"/>
        <!-- Jalapeno slices -->
        <circle cx="70" cy="115" r="8" fill="#276749" stroke="#2F855A" stroke-width="2"/>
        <circle cx="130" cy="117" r="8" fill="#276749" stroke="#2F855A" stroke-width="2"/>
        <circle cx="175" cy="115" r="8" fill="#276749" stroke="#2F855A" stroke-width="2"/>
        <!-- Bottom Bun -->
        <path d="M20 126 C20 155, 220 155, 220 126 Z" fill="#D38222" stroke="#B76B13" stroke-width="2"/>
        '''
    elif icon_type == "overdose":
        return '''
        <!-- Massive Tower Burger -->
        <path d="M30 40 C30 -5, 210 -5, 210 40 Z" fill="#E5983B" stroke="#D38222" stroke-width="2"/>
        <!-- Layer 1 Chicken -->
        <rect x="25" y="45" width="190" height="22" rx="8" fill="#C05621"/>
        <path d="M25 60 Q120 75, 215 60" stroke="#FFB800" stroke-width="5"/>
        <!-- Middle Bun separator -->
        <rect x="35" y="68" width="170" height="12" rx="4" fill="#ECC94B"/>
        <!-- Layer 2 Chicken -->
        <rect x="20" y="82" width="200" height="24" rx="8" fill="#9C4221"/>
        <path d="M20 100 Q120 115, 220 100" stroke="#FFFBEB" stroke-width="5"/>
        <!-- Layer 3 Chicken -->
        <rect x="25" y="108" width="190" height="22" rx="8" fill="#C05621"/>
        <path d="M25 125 Q120 140, 215 125" stroke="#48BB78" stroke-width="6"/>
        <!-- Bottom Bun -->
        <path d="M30 132 C30 165, 210 165, 210 132 Z" fill="#D38222" stroke="#B76B13" stroke-width="2"/>
        '''
    elif icon_type == "paparazzi":
        return '''
        <!-- Paparazzi Burger with Bumble Topper -->
        <path d="M20 70 C20 15, 220 15, 220 70 Z" fill="#E5983B" stroke="#D38222" stroke-width="2"/>
        <!-- Brand Flag Topper -->
        <rect x="117" y="10" width="6" height="35" fill="#FFF"/>
        <rect x="100" y="5" width="40" height="20" rx="4" fill="#0A0A0D" stroke="#FFB800" stroke-width="1.5"/>
        <text x="120" y="19" font-family="'Outfit', sans-serif" font-size="8" font-weight="900" fill="#FFB800" text-anchor="middle">BUMBLE</text>
        <!-- Glazed Crispy Chicken -->
        <path d="M15 80 Q60 65, 120 82 Q180 65, 225 80 Q230 110, 190 120 Q120 128, 50 120 Q10 110, 15 80 Z" fill="#C05621" stroke="#9C4221" stroke-width="2"/>
        <path d="M25 116 Q120 130, 215 116" stroke="#E53E3E" stroke-width="6"/>
        <path d="M20 126 C20 155, 220 155, 220 126 Z" fill="#D38222"/>
        '''
    elif icon_type == "babu":
        return '''
        <!-- Babu Hulk-Style Big Chicken & Cheddar Lava -->
        <path d="M20 70 C20 15, 220 15, 220 70 Z" fill="#E5983B" stroke="#D38222" stroke-width="2"/>
        <!-- Giant Golden Crispy Fillet -->
        <path d="M10 75 Q60 55, 120 78 Q180 55, 230 75 Q240 115, 190 125 Q120 135, 50 125 Q5 115, 10 75 Z" fill="#D69E2E" stroke="#B7791F" stroke-width="3"/>
        <!-- Overloaded Orange Cheddar Lava -->
        <path d="M20 85 C50 85, 60 120, 80 100 C100 125, 130 90, 150 120 C170 95, 190 125, 220 90 L220 105 C190 135, 170 110, 150 135 C130 105, 100 135, 80 115 C60 130, 50 100, 20 100 Z" fill="#DD6B20"/>
        <!-- Bottom Bun -->
        <path d="M20 126 C20 155, 220 155, 220 126 Z" fill="#D38222"/>
        '''
    elif icon_type == "barco":
        return '''
        <!-- Barco with Pastrami / Beef Bacon -->
        <path d="M20 70 C20 15, 220 15, 220 70 Z" fill="#E5983B" stroke="#D38222" stroke-width="2"/>
        <!-- Brand Flag Topper -->
        <rect x="117" y="10" width="6" height="35" fill="#FFF"/>
        <rect x="100" y="5" width="40" height="20" rx="4" fill="#0A0A0D" stroke="#FFB800" stroke-width="1.5"/>
        <text x="120" y="19" font-family="'Outfit', sans-serif" font-size="8" font-weight="900" fill="#FFB800" text-anchor="middle">BUMBLE</text>
        <!-- Pastrami / Bacon wavy strips -->
        <path d="M25 80 Q60 65, 100 82 Q140 65, 180 82 Q205 70, 220 80" stroke="#742A2A" stroke-width="8" stroke-linecap="round"/>
        <path d="M35 88 Q70 75, 110 90 Q150 75, 205 88" stroke="#9B2C2C" stroke-width="7" stroke-linecap="round"/>
        <!-- Crispy Chicken Patty -->
        <rect x="15" y="94" width="210" height="25" rx="8" fill="#C05621"/>
        <path d="M20 126 C20 155, 220 155, 220 126 Z" fill="#D38222"/>
        '''
    elif icon_type == "buzz":
        return '''
        <!-- Buzz Beef + Mozzarella Stick Patty -->
        <path d="M20 60 C20 10, 220 10, 220 60 Z" fill="#E5983B" stroke="#D38222" stroke-width="2"/>
        <!-- Golden Fried Mozzarella Stick Patty -->
        <rect x="30" y="65" width="180" height="20" rx="10" fill="#ECC94B" stroke="#D69E2E" stroke-width="2"/>
        <ellipse cx="120" cy="75" rx="70" ry="6" fill="#FFFBEB" opacity="0.9"/>
        <!-- Melted White Cheese dripping down -->
        <path d="M40 82 Q120 115, 200 82 L200 95 Q120 125, 40 95 Z" fill="#FFFBEB"/>
        <!-- Grilled Smashed Beef Patty -->
        <rect x="15" y="98" width="210" height="24" rx="8" fill="#4A2511" stroke="#361706" stroke-width="2"/>
        <!-- Pickles -->
        <circle cx="65" cy="120" r="10" fill="#276749" stroke="#2F855A" stroke-width="2"/>
        <circle cx="120" cy="122" r="10" fill="#276749" stroke="#2F855A" stroke-width="2"/>
        <circle cx="175" cy="120" r="10" fill="#276749" stroke="#2F855A" stroke-width="2"/>
        <!-- Bottom Bun -->
        <path d="M20 128 C20 158, 220 158, 220 128 Z" fill="#D38222"/>
        '''
    elif icon_type == "elpop":
        return '''
        <!-- Loaded Pop Dish / Bowl -->
        <ellipse cx="120" cy="110" rx="110" ry="50" fill="#1A202C" stroke="#4A5568" stroke-width="3"/>
        <ellipse cx="120" cy="100" rx="95" ry="38" fill="#9C4221"/>
        <!-- Salami Slices arranged around -->
        <circle cx="60" cy="90" r="18" fill="#9B2C2C" stroke="#742A2A" stroke-width="2"/>
        <circle cx="180" cy="90" r="18" fill="#9B2C2C" stroke="#742A2A" stroke-width="2"/>
        <circle cx="85" cy="115" r="18" fill="#9B2C2C" stroke="#742A2A" stroke-width="2"/>
        <circle cx="155" cy="115" r="18" fill="#9B2C2C" stroke="#742A2A" stroke-width="2"/>
        <!-- Shredded Mozzarella in center -->
        <rect x="100" y="88" width="40" height="8" rx="3" fill="#FFFBEB" transform="rotate(15 120 92)"/>
        <rect x="105" y="98" width="35" height="7" rx="3" fill="#FFFBEB" transform="rotate(-10 120 102)"/>
        '''
    else:
        return '''
        <path d="M20 70 C20 15, 220 15, 220 70 Z" fill="#E5983B"/>
        <rect x="12" y="96" width="216" height="24" rx="8" fill="#4A2511"/>
        <path d="M20 126 C20 155, 220 155, 220 126 Z" fill="#D38222"/>
        '''

# All items to generate
items_to_generate = [
    ("chicken-island.svg", "Chicken Island", "اتشيكن ايلاند", "#FFB800", "island", "BEST SELLER 🔥"),
    ("el-matafi.svg", "El Matafi (Fire Blaze)", "المطافي", "#E53E3E", "matafi", "SPICY BLAZE 🌶️"),
    ("overdose.svg", "Overdose Burger", "اوفر دوس", "#9F7AEA", "overdose", "SUPER GIANT 👑"),
    ("paparazzi.svg", "Paparazzi", "بابارازى", "#FFB800", "paparazzi", "SIGNATURE ✨"),
    ("babu.svg", "Babu (Hulk Power)", "بابو", "#DD6B20", "babu", "CHEDDAR BOMB 🧀"),
    ("barco.svg", "Barco", "باركو", "#C53030", "barco", "SMOKY BACON 🥓"),
    ("buzz.svg", "Buzz (Baz)", "باظ", "#ECC94B", "buzz", "MOZZARELLA CRUNCH 🧀"),
    ("el-pop.svg", "El Pop (Dish / Bowl)", "البوب", "#FF4B2B", "elpop", "LOADED BOWL 🍕"),
]

for filename, en, ar, color, itype, badge in items_to_generate:
    svg_data = make_food_card_svg(en, ar, color, itype, badge)
    with open(os.path.join(assets_dir, filename), "w", encoding="utf-8") as f:
        f.write(svg_data)

print(f"Generated {len(items_to_generate)} new authentic Bumble Burger graphics successfully!")
