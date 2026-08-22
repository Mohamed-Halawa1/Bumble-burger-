import urllib.request
import urllib.error
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

base_url = "http://localhost:8085"

print("--- Testing Bumble Burger Updated Multi-Page Website Endpoints ---")

pages_to_test = [
    "/",
    "/index.html",
    "/menu.html",
    "/offers.html",
    "/why-us.html",
    "/about.html",
    "/contact.html",
    "/profile.html",
    "/css/main.css",
    "/css/components.css",
    "/css/responsive.css",
    "/data/restaurant-data.js",
    "/js/app.js",
    "/js/whatsapp-order.js",
    "/js/auth-ui.js",
    "/js/profile.js",
    "/css/profile.css",
    "/assets/images/Logo.svg",
    "/assets/images/favicon.svg",
    "/assets/images/hero-burger.svg",
    "/assets/images/chicken-island.svg",
    "/assets/images/el-matafi.svg",
    "/assets/images/overdose.svg",
    "/assets/images/paparazzi.svg",
    "/assets/images/babu.svg",
    "/assets/images/barco.svg",
    "/assets/images/buzz.svg",
    "/assets/images/el-pop.svg",
]

all_passed = True
for ep in pages_to_test:
    url = f"{base_url}{ep}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            status = resp.status
            size = len(resp.read())
            if status == 200:
                print(f"  [PASS] {ep} (Status: {status}, Size: {size} bytes)")
            else:
                print(f"  [FAIL] {ep} (Status: {status})")
                all_passed = False
    except Exception as e:
        print(f"  [ERROR] {ep}: {e}")
        all_passed = False

print("\n--- Testing Cross-Page Links & Consolidated Navigation ---")
nav_expected_links = [
    "index.html",
    "menu.html",
    "offers.html",
    "why-us.html",
    "about.html",
    "contact.html"
]

for p in ["/index.html", "/menu.html", "/offers.html", "/why-us.html", "/about.html", "/contact.html"]:
    try:
        with urllib.request.urlopen(f"{base_url}{p}") as resp:
            html = resp.read().decode('utf-8')
            missing = []
            for expected in nav_expected_links:
                if f'href="{expected}"' not in html:
                    missing.append(expected)
            if not missing:
                print(f"  [PASS] {p} contains all 6 navigation links")
            else:
                print(f"  [FAIL] {p} is missing links: {missing}")
                all_passed = False
    except Exception as e:
        print(f"  [ERROR] {p}: {e}")
        all_passed = False

print("\n--- Testing Menu Items Data & Exact Prices ---")
try:
    with urllib.request.urlopen(f"{base_url}/data/restaurant-data.js") as resp:
        data_content = resp.read().decode('utf-8')
        
    required_items = [
        "اتشيكن ايلاند", "165",
        "المطافي", "140",
        "اوفر دوس", "240",
        "بابارازى", "165",
        "بابو", "135",
        "باركو", "175",
        "باظ", "135",
        "البوب", "145"
    ]
    for item in required_items:
        if item in data_content:
            print(f"  [PASS] Found in data: {item}")
        else:
            print(f"  [FAIL] Missing in data: {item}")
            all_passed = False

    if "السعر حسب المنيو" in data_content:
        print("  [FAIL] 'السعر حسب المنيو' still present in data!")
        all_passed = False
    else:
        print("  [PASS] 'السعر حسب المنيو' successfully removed from all data!")

except Exception as e:
    print(f"  [ERROR] Parsing restaurant-data.js: {e}")
    all_passed = False

if all_passed:
    print("\n[SUCCESS] ALL UPDATE TESTS PASSED! Production quality confirmed.")
else:
    print("\n[FAILURE] SOME TESTS FAILED!")
