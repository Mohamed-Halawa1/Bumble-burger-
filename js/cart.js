/**
 * ==============================================================================
 * BUMBLE BURGER - SHOPPING CART & CHECKOUT ENGINE (UNIVERSAL SCRIPT)
 * Mobile-First, Robust, Session Persistent with Vodafone Cash & Cash on Delivery
 * ==============================================================================
 */

(function () {
  'use strict';

  class BumbleCartManager {
    constructor() {
      this.isInitialized = false;
      this.storageKey = 'bumble_cart_v1';
      this.items = [];
      this.selectedAreaId = 'walideyah';
      this.paymentMethod = 'cash'; // 'cash' | 'vodafone_cash'

      this.config = (window.BumbleData && window.BumbleData.ORDER_CONFIG) ? window.BumbleData.ORDER_CONFIG : {
        restaurantName: "Bumble Burger",
        whatsappNumber: "201002194064",
        vodafoneCashNumber: "01002194064",
        phoneDisplay: "0100 219 4064",
        phoneSecondaryDisplay: "0120 802 7777",
        defaultDeliveryFee: 25,
        currency: { ar: "ج.م", en: "LE" },
        deliveryAreas: [
          { id: "walideyah", name: { ar: "الوليدية القبلية والبحرية", en: "Al Walideyah" }, fee: 20 },
          { id: "qalta", name: { ar: "شركة قلتة والنميس", en: "Sherket Qalta & El Nemeis" }, fee: 25 },
          { id: "university", name: { ar: "بوابة الجامعة وحي السادات", en: "Assiut University & El Sadat" }, fee: 25 },
          { id: "yousry", name: { ar: "يسري راغب وميدان المحطة والجمهورية", en: "Yousry Ragheb & El Gomhoreya" }, fee: 25 },
          { id: "azhar", name: { ar: "منطقة الأزهر وموقف الأزهر", en: "Al Azhar Area" }, fee: 25 },
          { id: "moalemeen", name: { ar: "المعلمين والأربعين ونزلة عبد اللاه", en: "El Moalemeen & Nazlet Abdallah" }, fee: 30 },
          { id: "assiut_jadida", name: { ar: "أسيوط الجديدة (طلب خاص)", en: "New Assiut (Special Delivery)" }, fee: 50 },
          { id: "other", name: { ar: "منطقة أخرى داخل أسيوط", en: "Other Area in Assiut" }, fee: 25 }
        ]
      };

      this.loadCart();
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initUI(), { once: true });
      } else {
        this.initUI();
      }
    }

    // --- STORAGE & STATE METHODS ---

    loadCart() {
      try {
        const saved = localStorage.getItem(this.storageKey);
        this.items = saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error('Error loading cart from storage', e);
        this.items = [];
      }
    }

    saveCart() {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
      } catch (e) {
        console.error('Error saving cart to storage', e);
      }
      this.updateBadges();
      this.renderCartDrawer();
      this.renderCheckoutSummary();
    }

    addItem(product, quantity = 1, customNotes = '') {
      if (!product || !product.name) return;

      const id = product.id || this.slugify(product.name);
      const existingIndex = this.items.findIndex(item => item.id === id);

      if (existingIndex > -1) {
        this.items[existingIndex].quantity += quantity;
        if (customNotes) {
          this.items[existingIndex].notes = customNotes;
        }
      } else {
        this.items.push({
          id: id,
          name: product.name,
          price: Number(product.price) || 0,
          image: product.image || 'assets/images/chicken-island.svg',
          quantity: Math.max(1, quantity),
          notes: customNotes || ''
        });
      }

      this.saveCart();
      this.showToast(`تمت إضافة "${product.name}" إلى السلة 🍔`);
    }

    updateQuantity(id, delta) {
      const itemIndex = this.items.findIndex(item => item.id === id);
      if (itemIndex === -1) return;

      this.items[itemIndex].quantity += delta;

      if (this.items[itemIndex].quantity <= 0) {
        this.items.splice(itemIndex, 1);
      }

      this.saveCart();
    }

    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id);
      this.saveCart();
      this.showToast('تم حذف الصنف من السلة 🗑️');
    }

    clearCart() {
      this.items = [];
      this.saveCart();
    }

    getTotalCount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getSubtotal() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getDeliveryFee() {
      if (this.items.length === 0) return 0;
      const area = this.config.deliveryAreas.find(a => a.id === this.selectedAreaId);
      return area ? area.fee : this.config.defaultDeliveryFee;
    }

    getGrandTotal() {
      if (this.items.length === 0) return 0;
      return this.getSubtotal() + this.getDeliveryFee();
    }

    slugify(text) {
      return String(text).toLowerCase().replace(/[\s\W-]+/g, '-');
    }

    // --- UI INITIALIZATION & EVENT BINDING ---

    initUI() {
      if (this.isInitialized) return;
      this.isInitialized = true;
      this.createCartElementsIfMissing();
      this.bindButtons();
      this.updateBadges();
      this.renderCartDrawer();
    }

    createCartElementsIfMissing() {
      if (!document.getElementById('cartFloatingBtn')) {
        document.body.insertAdjacentHTML('beforeend', `
          <button class="cart-floating-btn" id="cartFloatingBtn" type="button" aria-label="فتح سلة الطلبات">
            <span aria-hidden="true">🛒</span><span>السلة</span><b class="cart-badge empty">0</b>
          </button>
        `);
        document.getElementById('cartFloatingBtn').addEventListener('click', () => this.openCartDrawer());
      }

      // 1. Cart Drawer Backdrop & Container
      if (!document.getElementById('cartDrawerBackdrop')) {
        const drawerHTML = `
          <div class="cart-drawer-backdrop" id="cartDrawerBackdrop">
            <aside class="cart-drawer" id="cartDrawer" aria-label="Shopping Cart Drawer">
              <div class="cart-drawer-header">
                <div class="cart-drawer-title-group">
                  <span class="cart-title-icon">🛒</span>
                  <h3 class="cart-drawer-title">سلة طلباتك</h3>
                  <span class="cart-drawer-count" id="cartDrawerCount">(0)</span>
                </div>
                <button class="cart-close-btn" id="closeCartDrawerBtn" aria-label="Close cart">&times;</button>
              </div>

              <!-- Cart Items List Container -->
              <div class="cart-drawer-body" id="cartDrawerBody">
                <div class="cart-items-list" id="cartItemsList"></div>
                <div class="cart-empty-state" id="cartEmptyState" style="display: none;">
                  <div class="empty-icon">🍔</div>
                  <h4>سلة الطلبات فاضية</h4>
                  <p>استكشف أشهى ساندوتشات وعروض بامبل برجر وأضف ما يعجبك!</p>
                  <a href="menu.html" class="btn btn-primary btn-sm" id="emptyCartExploreBtn">تصفح المنيو الآن</a>
                </div>
              </div>

              <!-- Cart Footer / Totals -->
              <div class="cart-drawer-footer" id="cartDrawerFooter">
                <div class="cart-summary-row">
                  <span>المجموع الفرعي:</span>
                  <strong id="cartSubtotalVal">0 ج.م</strong>
                </div>
                <div class="cart-summary-row">
                  <span>خدمة التوصيل التقريبية:</span>
                  <span id="cartDeliveryVal" class="text-gold">25 ج.م</span>
                </div>
                <div class="cart-summary-row cart-total-row">
                  <span>الإجمالي الكلي:</span>
                  <strong id="cartTotalVal">0 ج.م</strong>
                </div>

                <div class="cart-footer-actions">
                  <button class="btn btn-primary btn-sm cart-proceed-btn" id="proceedToCheckoutBtn">
                    <span>🛍️</span> <span>المتابعة لإتمام الطلب</span>
                  </button>
                  <button class="btn btn-outline btn-sm cart-clear-btn" id="clearCartBtn">
                    <span>🗑️</span> <span>تفريغ السلة</span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', drawerHTML);
      }

      // 2. Checkout Modal
      if (!document.getElementById('checkoutModalBackdrop')) {
        const areaOptions = this.config.deliveryAreas.map(area => {
          const name = area.name.ar;
          return `<option value="${area.id}">${name} (${area.fee} ج.م)</option>`;
        }).join('');

        const checkoutHTML = `
          <div class="checkout-modal-backdrop" id="checkoutModalBackdrop">
            <div class="checkout-modal" id="checkoutModal">
              <div class="checkout-header">
                <div class="checkout-title-wrap">
                  <span class="checkout-icon">🛵</span>
                  <h3>بيانات التوصيل والدفع</h3>
                </div>
                <button class="modal-close-btn" id="closeCheckoutModalBtn" aria-label="Close checkout">&times;</button>
              </div>

              <div class="checkout-body">
                <form id="checkoutForm" novalidate>
                  
                  <!-- Customer Details Section -->
                  <div class="checkout-section">
                    <h4 class="section-title-sm">👤 بيانات العميل</h4>
                    <div class="form-group">
                      <label for="custName" class="form-label">الاسم بالكامل <span class="required">*</span></label>
                      <input type="text" id="custName" class="form-input" placeholder="اكتب اسمك هنا..." required />
                      <div class="field-error" id="custNameError">يرجى كتابة الاسم بشكل صحيح.</div>
                    </div>

                    <div class="form-group">
                      <label for="custPhone" class="form-label">رقم الهاتف (موبايل مصري) <span class="required">*</span></label>
                      <input type="tel" id="custPhone" class="form-input" placeholder="010XXXXXXXX أو 011 / 012 / 015" required />
                      <div class="field-error" id="custPhoneError">يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقماً يبدأ بـ 01.</div>
                    </div>
                  </div>

                  <!-- Delivery Details Section -->
                  <div class="checkout-section">
                    <h4 class="section-title-sm">📍 تفاصيل العنوان والتوصيل</h4>
                    <div class="form-group">
                      <label for="custArea" class="form-label">المنطقة في أسيوط <span class="required">*</span></label>
                      <select id="custArea" class="form-select">
                        ${areaOptions}
                      </select>
                    </div>

                    <div class="form-group">
                      <label for="custAddress" class="form-label">العنوان بالتفصيل <span class="required">*</span></label>
                      <textarea id="custAddress" class="form-textarea" rows="2" placeholder="اسم الشارع، رقم العمارة، رقم الشقة / الدور، علامة مميزة..." required></textarea>
                      <div class="field-error" id="custAddressError">يرجى توضيح العنوان بالتفصيل لسرعة التوصيل.</div>
                    </div>

                    <div class="form-group">
                      <label for="custNotes" class="form-label">ملاحظات إضافية على الطلب (اختياري)</label>
                      <textarea id="custNotes" class="form-textarea" rows="2" placeholder="بدون بصل، صوص إضافي، درجة السواء، تعليمات للتوصيل..."></textarea>
                    </div>
                  </div>

                  <!-- Payment Method Section -->
                  <div class="checkout-section">
                    <h4 class="section-title-sm">💳 طريقة الدفع</h4>
                    
                    <div class="payment-options-grid">
                      <!-- Cash on Delivery -->
                      <label class="payment-option-card active" id="payMethodCashCard">
                        <input type="radio" name="paymentMethod" value="cash" checked />
                        <div class="payment-card-content">
                          <span class="payment-icon">💵</span>
                          <div class="payment-info">
                            <strong>الدفع عند الاستلام (كاش)</strong>
                            <p>يتم دفع إجمالي الحساب لمندوب الدليفري عند استلام الأوردر.</p>
                          </div>
                        </div>
                      </label>

                      <!-- Vodafone Cash -->
                      <label class="payment-option-card" id="payMethodVodafoneCard">
                        <input type="radio" name="paymentMethod" value="vodafone_cash" />
                        <div class="payment-card-content">
                          <span class="payment-icon">📱</span>
                          <div class="payment-info">
                            <strong>فودافون كاش (Vodafone Cash)</strong>
                            <p>تحويل فوري إلى رقم المحفظة المعتمد للمطعم.</p>
                          </div>
                        </div>
                      </label>

                      <!-- InstaPay -->
                      <label class="payment-option-card" id="payMethodInstaPayCard">
                        <input type="radio" name="paymentMethod" value="instapay" />
                        <div class="payment-card-content">
                          <span class="payment-icon">⚡</span>
                          <div class="payment-info">
                            <strong>إنستا باي (InstaPay)</strong>
                            <p>تحويل فوري من تطبيق إنستا باي إلى حساب المطعم.</p>
                          </div>
                        </div>
                      </label>
                    </div>

                    <!-- Electronic Payment Details Alert Box -->
                    <div class="vodafone-cash-box" id="vodafoneCashBox" style="display: none;">
                      <div class="voda-header">
                        <span>📲 بيانات التحويل عبر <strong id="paymentMethodName">فودافون كاش</strong>:</span>
                        <div class="voda-number-row">
                          <strong id="vodaNumberDisplay">${this.config.vodafoneCashNumber}</strong>
                          <button type="button" class="btn btn-sm btn-secondary" id="copyVodaBtn">📋 نسخ الرقم</button>
                        </div>
                      </div>
                      <div class="voda-instructions">
                        <p>⚠️ <strong>تعليمات التحويل:</strong></p>
                        <ol>
                          <li id="paymentTransferInstruction">قم بتحويل إجمالي المبلغ (<span id="vodaTotalAmountDisplay">0</span> ج.م) إلى الرقم أعلاه.</li>
                          <li>احتفظ برقم العملية أو لقطة شاشة التحويل لتأكيد الطلب مع الكاشير.</li>
                          <li>سيتم تأكيد الدفع ومراجعته يدوياً مع الإدارة فور إرسال رسالة الواتساب.</li>
                        </ol>
                      </div>
                      <div class="form-group" style="margin-top: 12px; margin-bottom: 0;">
                        <label for="vodaSenderPhone" class="form-label">رقم المحفظة المحول منها أو رقم المعاملة <span class="required">*</span>:</label>
                        <input type="text" id="vodaSenderPhone" class="form-input" placeholder="مثال: رقم 010... أو رقم مرجعي" />
                        <div class="field-error" id="paymentTransferError">يرجى إدخال رقم المحفظة المحول منها أو رقم المعاملة.</div>
                      </div>
                    </div>
                  </div>

                  <!-- Checkout Order Breakdown Summary -->
                  <div class="checkout-section">
                    <h4 class="section-title-sm">📋 ملخص الطلب</h4>
                    <div class="checkout-breakdown" id="checkoutBreakdownList"></div>
                    <div class="checkout-totals-table">
                      <div class="summary-line">
                        <span>مجموع الأصناف:</span>
                        <strong id="checkoutSubtotalDisplay">0 ج.م</strong>
                      </div>
                      <div class="summary-line">
                        <span>خدمة التوصيل (<span id="checkoutAreaNameDisplay">الوليدية</span>):</span>
                        <strong id="checkoutDeliveryDisplay">20 ج.م</strong>
                      </div>
                      <div class="summary-line grand-total-line">
                        <span>الإجمالي النهائي للدفع:</span>
                        <strong id="checkoutGrandTotalDisplay">0 ج.م</strong>
                      </div>
                    </div>
                  </div>

                  <!-- Submit Action Button -->
                  <div class="checkout-footer">
                    <button type="submit" class="btn btn-whatsapp btn-lg" id="confirmOrderWhatsAppBtn" style="width: 100%;">
                      <span>📱</span> <span>تأكيد وإرسال الطلب عبر واتساب</span>
                    </button>
                    <p class="checkout-secure-note">
                      🔒 بالضغط على الزر سيتم فتح محادثة واتساب الرسمية مع مطعم Bumble Burger بأسيوط لتأكيد طلبك فوراً.
                    </p>
                  </div>

                </form>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', checkoutHTML);
      }

      // 3. Post-Submission Confirmation Screen Modal
      if (!document.getElementById('orderSuccessModalBackdrop')) {
        const successHTML = `
          <div class="order-modal-backdrop" id="orderSuccessModalBackdrop">
            <div class="order-modal order-success-modal" style="max-width: 500px; text-align: center;">
              <div class="success-icon-wrap">🍔✨</div>
              <h3 style="color: var(--color-gold); font-size: 1.6rem; margin-bottom: 12px;">تم تجهيز طلبك بنجاح!</h3>
              <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-primary); margin-bottom: 18px;">
                تم فتح تطبيق واتساب ومرفق به تفاصيل أوردرك بالكامل.<br/>
                <strong style="color: var(--color-red);">يرجى الضغط على زر "إرسال / Send" داخل الواتساب</strong> لتأكيد الطلب وبدء التحضير فوراً.
              </p>
              <div class="success-order-box" id="successOrderBox">
                <!-- Injected summary -->
              </div>
              <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-primary" id="returnToMenuBtn">
                  <span>🍔</span> <span>العودة للمنيو</span>
                </button>
                <a href="https://wa.me/${this.config.whatsappNumber}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
                  <span>💬</span> <span>فتح واتساب مجدداً</span>
                </a>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', successHTML);
      }

      // 4. Toast Container
      if (!document.getElementById('bumbleToastContainer')) {
        const toastHTML = `<div class="toast-container" id="bumbleToastContainer" aria-live="polite"></div>`;
        document.body.insertAdjacentHTML('beforeend', toastHTML);
      }
    }

    bindButtons() {
      // Open Cart Drawer Triggers (Header & Bottom Bar)
      document.querySelectorAll('.cart-toggle-btn, .cart-nav-btn, .mobile-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openCartDrawer();
        });
      });

      // Close Cart Drawer
      const closeCartBtn = document.getElementById('closeCartDrawerBtn');
      const cartBackdrop = document.getElementById('cartDrawerBackdrop');
      if (closeCartBtn) closeCartBtn.addEventListener('click', () => this.closeCartDrawer());
      if (cartBackdrop) {
        cartBackdrop.addEventListener('click', (e) => {
          if (e.target === cartBackdrop) this.closeCartDrawer();
        });
      }

      // Clear Cart
      const clearCartBtn = document.getElementById('clearCartBtn');
      if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
          if (confirm('هل أنت متأكد من رغبتك في تفريغ سلة الطلبات؟')) {
            this.clearCart();
          }
        });
      }

      // Proceed to Checkout
      const checkoutBtn = document.getElementById('proceedToCheckoutBtn');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
          if (this.items.length === 0) {
            this.showToast('السلة فاضية! اختر وجبتك المفضلة أولاً 🍔');
            return;
          }
          this.closeCartDrawer();
          this.openCheckoutModal();
        });
      }

      // Close Checkout Modal
      const closeCheckoutBtn = document.getElementById('closeCheckoutModalBtn');
      const checkoutBackdrop = document.getElementById('checkoutModalBackdrop');
      if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', () => this.closeCheckoutModal());
      if (checkoutBackdrop) {
        checkoutBackdrop.addEventListener('click', (e) => {
          if (e.target === checkoutBackdrop) this.closeCheckoutModal();
        });
      }

      // Area Selection in Checkout
      const areaSelect = document.getElementById('custArea');
      if (areaSelect) {
        areaSelect.addEventListener('change', (e) => {
          this.selectedAreaId = e.target.value;
          this.renderCheckoutSummary();
        });
      }

      // Payment Method Radios
      const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
      paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          this.paymentMethod = e.target.value;
          this.updatePaymentMethodUI();
        });
      });

      // Copy Vodafone Cash Number Button
      const copyVodaBtn = document.getElementById('copyVodaBtn');
      if (copyVodaBtn) {
        copyVodaBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(this.config.vodafoneCashNumber).then(() => {
            this.showToast('تم نسخ رقم فودافون كاش بنجاح 📋');
          }).catch(() => {
            this.showToast(`رقم فودافون كاش: ${this.config.vodafoneCashNumber}`);
          });
        });
      }

      // Checkout Form Submission
      const checkoutForm = document.getElementById('checkoutForm');
      if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleCheckoutSubmit();
        });
      }

      // Return to Menu Button
      const returnMenuBtn = document.getElementById('returnToMenuBtn');
      if (returnMenuBtn) {
        returnMenuBtn.addEventListener('click', () => {
          const successModal = document.getElementById('orderSuccessModalBackdrop');
          if (successModal) successModal.classList.remove('open');
          window.location.href = 'menu.html';
        });
      }

      // Delegate "Add to Cart" and "Order Now" on document
      document.addEventListener('click', (e) => {
        const cartButton = e.target.closest('.qty-minus, .qty-plus, .cart-item-remove-btn');
        if (cartButton) {
          const id = cartButton.getAttribute('data-id');
          if (cartButton.classList.contains('qty-minus')) this.updateQuantity(id, -1);
          if (cartButton.classList.contains('qty-plus')) this.updateQuantity(id, 1);
          if (cartButton.classList.contains('cart-item-remove-btn')) this.removeItem(id);
          return;
        }

        const addBtn = e.target.closest('.add-to-cart-btn, .menu-order-btn, .offer-order-btn');
        if (addBtn) {
          // If it's a card order button, extract details
          const card = addBtn.closest('.menu-item-card, .offer-card');
          if (card) {
            e.preventDefault();
            const name = addBtn.getAttribute('data-item') || card.querySelector('.menu-item-title, .offer-title')?.textContent?.trim();
            const priceText = card.querySelector('.suggested-price')?.textContent?.replace(/[^\d]/g, '');
            const price = Number(priceText) || 150;
            const image = card.querySelector('img')?.getAttribute('src') || 'assets/images/chicken-island.svg';

            this.addItem({
              name: name,
              price: price,
              image: image
            }, 1);

            // Give visual feedback on button
            const originalHTML = addBtn.innerHTML;
            addBtn.innerHTML = '<span>✓</span> <span>تمت الإضافة</span>';
            addBtn.classList.add('added');
            setTimeout(() => {
              addBtn.innerHTML = originalHTML;
              addBtn.classList.remove('added');
            }, 1200);
          }
        }
      });

      document.addEventListener('change', (e) => {
        if (!e.target.classList.contains('cart-item-notes-input')) return;
        const item = this.items.find(cartItem => cartItem.id === e.target.dataset.id);
        if (!item) return;
        item.notes = e.target.value.trim();
        this.saveCart();
      });
    }

    // --- DRAWER & MODAL VIEW CONTROLLERS ---

    openCartDrawer() {
      this.renderCartDrawer();
      const backdrop = document.getElementById('cartDrawerBackdrop');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    closeCartDrawer() {
      const backdrop = document.getElementById('cartDrawerBackdrop');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    openCheckoutModal() {
      this.renderCheckoutSummary();
      const backdrop = document.getElementById('checkoutModalBackdrop');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    closeCheckoutModal() {
      const backdrop = document.getElementById('checkoutModalBackdrop');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    updateBadges() {
      const count = this.getTotalCount();
      document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = count;
        if (count > 0) {
          badge.classList.remove('empty');
          badge.classList.add('has-items');
        } else {
          badge.classList.add('empty');
          badge.classList.remove('has-items');
        }
      });

      const drawerCount = document.getElementById('cartDrawerCount');
      if (drawerCount) drawerCount.textContent = `(${count})`;
    }

    renderCartDrawer() {
      const listContainer = document.getElementById('cartItemsList');
      const emptyState = document.getElementById('cartEmptyState');
      const footer = document.getElementById('cartDrawerFooter');
      const subtotalVal = document.getElementById('cartSubtotalVal');
      const deliveryVal = document.getElementById('cartDeliveryVal');
      const totalVal = document.getElementById('cartTotalVal');

      if (!listContainer) return;

      if (this.items.length === 0) {
        listContainer.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        if (footer) footer.style.display = 'none';
        return;
      }

      if (emptyState) emptyState.style.display = 'none';
      if (footer) footer.style.display = 'block';

      const currency = this.config.currency.ar;
      const subtotal = this.getSubtotal();
      const delivery = this.getDeliveryFee();
      const total = this.getGrandTotal();

      if (subtotalVal) subtotalVal.textContent = `${subtotal} ${currency}`;
      if (deliveryVal) deliveryVal.textContent = `${delivery} ${currency}`;
      if (totalVal) totalVal.textContent = `${total} ${currency}`;

      listContainer.innerHTML = this.items.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-unit-price">${item.price} ${currency}</div>
            <label class="cart-item-notes-label" for="cart-notes-${item.id}">ملاحظة للصنف (اختياري)</label>
            <textarea class="cart-item-notes-input" id="cart-notes-${item.id}" data-id="${item.id}" rows="2" maxlength="180" placeholder="مثال: بدون بصل، صوص إضافي...">${item.notes || ''}</textarea>
            
            <div class="cart-qty-controls">
              <button class="cart-qty-btn qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
              <span class="cart-qty-num">${item.quantity}</span>
              <button class="cart-qty-btn qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="cart-item-end">
            <div class="cart-item-subtotal">${item.price * item.quantity} ${currency}</div>
            <button class="cart-item-remove-btn" data-id="${item.id}" title="حذف الصنف">🗑️</button>
          </div>
        </div>
      `).join('');

    }

    renderCheckoutSummary() {
      const breakdown = document.getElementById('checkoutBreakdownList');
      const subtotalEl = document.getElementById('checkoutSubtotalDisplay');
      const deliveryEl = document.getElementById('checkoutDeliveryDisplay');
      const totalEl = document.getElementById('checkoutGrandTotalDisplay');
      const areaNameEl = document.getElementById('checkoutAreaNameDisplay');
      const vodaAmountEl = document.getElementById('vodaTotalAmountDisplay');

      if (!breakdown) return;

      const currency = this.config.currency.ar;
      const subtotal = this.getSubtotal();
      const delivery = this.getDeliveryFee();
      const total = this.getGrandTotal();

      const currentArea = this.config.deliveryAreas.find(a => a.id === this.selectedAreaId);
      if (areaNameEl && currentArea) {
        areaNameEl.textContent = currentArea.name.ar;
      }

      if (subtotalEl) subtotalEl.textContent = `${subtotal} ${currency}`;
      if (deliveryEl) deliveryEl.textContent = `${delivery} ${currency}`;
      if (totalEl) totalEl.textContent = `${total} ${currency}`;
      if (vodaAmountEl) vodaAmountEl.textContent = `${total}`;

      breakdown.innerHTML = this.items.map(item => `
        <div class="checkout-item-line">
          <span>${item.quantity} × ${item.name}</span>
          <strong>${item.price * item.quantity} ${currency}</strong>
        </div>
      `).join('');
    }

    updatePaymentMethodUI() {
      const cashCard = document.getElementById('payMethodCashCard');
      const vodaCard = document.getElementById('payMethodVodafoneCard');
      const instaPayCard = document.getElementById('payMethodInstaPayCard');
      const vodaBox = document.getElementById('vodafoneCashBox');
      const paymentMethodName = document.getElementById('paymentMethodName');
      const transferInstruction = document.getElementById('paymentTransferInstruction');
      const transferInput = document.getElementById('vodaSenderPhone');

      if (this.paymentMethod === 'cash') {
        if (cashCard) cashCard.classList.add('active');
        if (vodaCard) vodaCard.classList.remove('active');
        if (instaPayCard) instaPayCard.classList.remove('active');
        if (vodaBox) vodaBox.style.display = 'none';
      } else {
        if (cashCard) cashCard.classList.remove('active');
        if (vodaCard) vodaCard.classList.toggle('active', this.paymentMethod === 'vodafone_cash');
        if (instaPayCard) instaPayCard.classList.toggle('active', this.paymentMethod === 'instapay');
        if (vodaBox) vodaBox.style.display = 'block';
        if (paymentMethodName) paymentMethodName.textContent = this.paymentMethod === 'instapay' ? 'إنستا باي' : 'فودافون كاش';
        if (transferInstruction) {
          transferInstruction.innerHTML = this.paymentMethod === 'instapay'
            ? 'قم بتحويل إجمالي المبلغ (<span id="vodaTotalAmountDisplay">0</span> ج.م) عبر إنستا باي إلى الرقم أعلاه.'
            : 'قم بتحويل إجمالي المبلغ (<span id="vodaTotalAmountDisplay">0</span> ج.م) إلى الرقم أعلاه.';
        }
        if (transferInput) transferInput.required = true;
      }
    }

    // --- CHECKOUT VALIDATION & WHATSAPP SUBMISSION ---

    handleCheckoutSubmit() {
      const nameInput = document.getElementById('custName');
      const phoneInput = document.getElementById('custPhone');
      const addressInput = document.getElementById('custAddress');
      const notesInput = document.getElementById('custNotes');
      const vodaSenderInput = document.getElementById('vodaSenderPhone');

      const nameErr = document.getElementById('custNameError');
      const phoneErr = document.getElementById('custPhoneError');
      const addressErr = document.getElementById('custAddressError');

      // Reset errors
      if (nameErr) nameErr.style.display = 'none';
      if (phoneErr) phoneErr.style.display = 'none';
      if (addressErr) addressErr.style.display = 'none';

      let isValid = true;

      // 1. Validate Name
      const name = nameInput ? nameInput.value.trim() : '';
      if (!name || name.length < 2) {
        if (nameErr) nameErr.style.display = 'block';
        if (nameInput) nameInput.focus();
        isValid = false;
      }

      // 2. Validate Egyptian Phone
      const phone = phoneInput ? phoneInput.value.trim().replace(/[\s-]/g, '') : '';
      // Egyptian mobile regex (010, 011, 012, 015 with 11 digits or starting with +201 / 201)
      const egyptianPhoneRegex = /^(01[0125][0-9]{8}|(\+20|0020|20)1[0125][0-9]{8})$/;
      if (!phone || !egyptianPhoneRegex.test(phone)) {
        if (phoneErr) phoneErr.style.display = 'block';
        if (isValid && phoneInput) phoneInput.focus();
        isValid = false;
      }

      // 3. Validate Address
      const address = addressInput ? addressInput.value.trim() : '';
      if (!address || address.length < 5) {
        if (addressErr) addressErr.style.display = 'block';
        if (isValid && addressInput) addressInput.focus();
        isValid = false;
      }

      if (!isValid) return;

      if (this.items.length === 0) {
        this.showToast('سلة طلباتك فارغة!');
        return;
      }

      const notes = notesInput ? notesInput.value.trim() : '';
      const vodaSender = vodaSenderInput ? vodaSenderInput.value.trim() : '';
      const paymentTransferError = document.getElementById('paymentTransferError');
      if (paymentTransferError) paymentTransferError.style.display = 'none';
      if (this.paymentMethod !== 'cash' && !vodaSender) {
        if (paymentTransferError) paymentTransferError.style.display = 'block';
        if (vodaSenderInput) vodaSenderInput.focus();
        return;
      }
      const area = this.config.deliveryAreas.find(a => a.id === this.selectedAreaId);
      const areaName = area ? area.name.ar : 'أسيوط';

      // Build Formatted WhatsApp Order Message
      const message = this.generateWhatsAppMessage({
        name,
        phone,
        areaName,
        address,
        notes,
        paymentMethod: this.paymentMethod,
        vodaSender
      });

      const whatsappUrl = `https://wa.me/${this.config.whatsappNumber}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp in new tab/app
      window.open(whatsappUrl, '_blank');

      // Close Checkout & Show Success Modal
      this.closeCheckoutModal();
      this.showOrderSuccessModal({
        name,
        total: this.getGrandTotal(),
        paymentMethod: this.paymentMethod === 'cash'
          ? 'الدفع عند الاستلام (كاش)'
          : this.paymentMethod === 'instapay' ? 'إنستا باي (InstaPay)' : 'فودافون كاش (Vodafone Cash)'
      });

      // Clear the cart for the next fresh order
      this.clearCart();
    }

    generateWhatsAppMessage(data) {
      const currency = this.config.currency.ar;
      const subtotal = this.getSubtotal();
      const delivery = this.getDeliveryFee();
      const total = this.getGrandTotal();
      const timestamp = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

      let msg = `🍔 *طلب جديد من موقع ${this.config.restaurantName}*\n`;
      msg += `⏰ توقيت الطلب: ${timestamp}\n\n`;

      msg += `👤 *بيانات العميل:*\n`;
      msg += `• الاسم: *${data.name}*\n`;
      msg += `• الهاتف: *${data.phone}*\n`;
      msg += `• المنطقة: *${data.areaName}*\n`;
      msg += `• العنوان بالتفصيل: *${data.address}*\n\n`;

      msg += `--------------------\n`;
      msg += `🛒 *تفاصيل الأصناف المطلوبة:*\n\n`;

      this.items.forEach((item, idx) => {
        msg += `${idx + 1}. *${item.quantity} × ${item.name}* — ${item.price * item.quantity} ${currency}\n`;
        if (item.notes) {
          msg += `   └ 📝 ملاحظة: ${item.notes}\n`;
        }
      });

      msg += `\n--------------------\n`;
      msg += `💵 المجموع الفرعي: *${subtotal} ${currency}*\n`;
      msg += `🛵 خدمة التوصيل (${data.areaName}): *${delivery} ${currency}*\n`;
      msg += `💰 *الإجمالي النهائي المطلوب: ${total} ${currency}*\n\n`;

      msg += `💳 *طريقة الدفع:* `;
      if (data.paymentMethod === 'cash') {
        msg += `*الدفع عند الاستلام (كاش)* 💵\n`;
      } else {
        const paymentLabel = data.paymentMethod === 'instapay' ? '*إنستا باي (InstaPay)* ⚡' : '*فودافون كاش* 📱';
        msg += `${paymentLabel}\n`;
        msg += `• تم التحويل لمحفظة المطعم: ${this.config.vodafoneCashNumber}\n`;
        msg += `• رقم المعاملة / رقم المحول منه: *${data.vodaSender}*\n`;
      }

      if (data.notes) {
        msg += `\n📝 *ملاحظات إضافية:* ${data.notes}\n`;
      }

      msg += `\n--------------------\n`;
      msg += `📍 فرع أسيوط - الوليدية القبلية\n`;
      msg += `يرجى تأكيد استلام الطلب وتحديد الوقت المتوقع للوصول. شكراً لكم! ❤️`;

      return msg;
    }

    showOrderSuccessModal(orderData) {
      const successModal = document.getElementById('orderSuccessModalBackdrop');
      const box = document.getElementById('successOrderBox');

      if (box) {
        box.innerHTML = `
          <div style="background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 16px; margin-top: 12px; text-align: right;">
            <p style="margin-bottom: 6px;">👤 <strong>اسم العميل:</strong> ${orderData.name}</p>
            <p style="margin-bottom: 6px;">💳 <strong>طريقة الدفع:</strong> ${orderData.paymentMethod}</p>
            <p style="color: var(--color-gold); font-size: 1.15rem; font-weight: 800; margin-bottom: 0;">💰 <strong>الإجمالي المطلوب:</strong> ${orderData.total} ${this.config.currency.ar}</p>
          </div>
        `;
      }

      if (successModal) {
        successModal.classList.add('open');
      }
    }

    showToast(message) {
      const container = document.getElementById('bumbleToastContainer');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'bumble-toast';
      toast.textContent = message;

      container.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 400);
      }, 2500);
    }
  }

  // Instantiate the manager only once, even if a page includes the script twice.
  if (!window.BumbleCart) {
    window.BumbleCart = new BumbleCartManager();
  }
})();
