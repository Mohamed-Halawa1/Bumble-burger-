/**
 * ==============================================================================
 * BUMBLE BURGER - WHATSAPP ORDERING ENGINE (UNIVERSAL SCRIPT)
 * ==============================================================================
 */

class WhatsAppOrderEngine {
  constructor() {
    this.phone = (window.BumbleData && window.BumbleData.RESTAURANT_CONFIG) ? window.BumbleData.RESTAURANT_CONFIG.contact.whatsappNumber : "201002194064";
    this.currentSelectedItem = null;
    this.initModal();
  }

  createWhatsAppLink(messageText) {
    const encoded = encodeURIComponent(messageText);
    return `https://wa.me/${this.phone}?text=${encoded}`;
  }

  formatDirectItemMessage(itemName, lang = 'ar', customNotes = '') {
    if (lang === 'ar') {
      let msg = `مساء الخير يا Bumble Burger 🍔\n`;
      msg += `حابب أطلب: *${itemName}*\n`;
      if (customNotes && customNotes.trim()) {
        msg += `ملاحظات: ${customNotes.trim()}\n`;
      }
      msg += `📍 فرع أسيوط - الوليدية القبلية\n`;
      msg += `من فضلك أكد لي ميعاد الاستلام والتوتال. شكراً!`;
      return msg;
    } else {
      let msg = `Hello Bumble Burger! 🍔\n`;
      msg += `I would like to order: *${itemName}*\n`;
      if (customNotes && customNotes.trim()) {
        msg += `Notes: ${customNotes.trim()}\n`;
      }
      msg += `📍 Assiut Branch (Al Walideyah)\n`;
      msg += `Please confirm preparation time and total amount. Thank you!`;
      return msg;
    }
  }

  initModal() {
    this.backdrop = document.getElementById('orderModalBackdrop');
    this.itemNameDisplay = document.getElementById('selectedItemName');
    this.notesInput = document.getElementById('orderNotes');
    this.sendBtn = document.getElementById('sendWhatsAppOrderBtn');
    this.closeBtn = document.getElementById('closeOrderModalBtn');

    if (this.closeBtn && this.backdrop) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
      this.backdrop.addEventListener('click', (e) => {
        if (e.target === this.backdrop) this.closeModal();
      });
    }

    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => {
        if (!this.currentSelectedItem) return;
        const currentLang = document.documentElement.getAttribute('lang') || 'ar';
        const notes = this.notesInput ? this.notesInput.value : '';
        const msg = this.formatDirectItemMessage(this.currentSelectedItem, currentLang, notes);
        const url = this.createWhatsAppLink(msg);
        window.open(url, '_blank');
        this.closeModal();
      });
    }
  }

  openOrderModal(itemName) {
    this.currentSelectedItem = itemName;
    if (this.itemNameDisplay) {
      this.itemNameDisplay.textContent = itemName;
    }
    if (this.notesInput) {
      this.notesInput.value = '';
    }
    if (this.backdrop) {
      this.backdrop.classList.add('open');
    }
  }

  closeModal() {
    if (this.backdrop) {
      this.backdrop.classList.remove('open');
    }
    this.currentSelectedItem = null;
  }
}

window.WhatsAppOrderEngine = WhatsAppOrderEngine;
