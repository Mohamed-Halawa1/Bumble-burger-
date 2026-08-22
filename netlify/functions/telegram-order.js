function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatItems(items) {
  return (items || []).map(item => {
    const notes = item.notes ? ` (${escapeHtml(item.notes)})` : '';
    return `• ${item.quantity} × ${escapeHtml(item.name)} - ${item.price * item.quantity} ج.م${notes}`;
  }).join('\n') || 'لا توجد تفاصيل للطلب';
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return { statusCode: 500, body: JSON.stringify({ error: 'Telegram is not configured' }) };
  }

  let order;
  try {
    order = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const message = [
    '<b>🚨 أوردر جديد من الموقع</b>',
    '━━━━━━━━━━━━━━━━━━',
    `<b>👤 الاسم:</b> ${escapeHtml(order.customer?.name || 'غير محدد')}`,
    `<b>📞 الهاتف:</b> ${escapeHtml(order.customer?.phone || 'غير محدد')}`,
    `<b>📍 العنوان:</b> ${escapeHtml(order.delivery?.address || 'استلام من الفرع')}`,
    `<b>🏘️ المنطقة:</b> ${escapeHtml(order.delivery?.areaName || 'غير محددة')}`,
    `<b>📝 الطلبات:</b>\n${formatItems(order.items)}`,
    `<b>💰 الإجمالي:</b> ${escapeHtml(order.totals?.total || 0)} ج.م`,
    `<b>💳 الدفع:</b> ${escapeHtml(order.payment?.method || 'غير محدد')}`,
    order.notes ? `<b>📌 ملاحظات:</b> ${escapeHtml(order.notes)}` : '',
    order.orderId ? `<b>🔖 رقم الطلب:</b> ${escapeHtml(order.orderId)}` : '',
    `<b>⏰ الوقت:</b> ${new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' })}`
  ].filter(Boolean).join('\n');

  const telegramResponse = await fetch(`https://api.telegram.org/bot${encodeURIComponent(token)}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' })
  });

  if (!telegramResponse.ok) {
    console.error('Telegram API error:', await telegramResponse.text());
    return { statusCode: 502, body: JSON.stringify({ error: 'Telegram notification failed' }) };
  }

  return { statusCode: 200, body: JSON.stringify({ status: 'success' }) };
};