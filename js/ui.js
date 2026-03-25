/**
 * ui.js
 * كل ما يتعلق بالواجهة وDOM — لا يحتوي على أي منطق حسابي.
 * يعتمد على: data.js, calculator.js
 */

// ─── DOM Helper ───────────────────────────────────────
const el = (id) => document.getElementById(id);

// ─── Validation UI ────────────────────────────────────

/**
 * يظهر أو يخفي رسالة الخطأ لحقل معين.
 * @param {string} fieldId
 * @param {string} errorId
 * @param {boolean} show
 */
function showFieldError(fieldId, errorId, show) {
  const field = el(fieldId);
  const msg   = el(errorId);
  if (show) {
    field.style.borderColor = '#e07070';
    msg.classList.add('show');
  } else {
    field.style.borderColor = '';
    msg.classList.remove('show');
  }
}

// ─── Result UI ────────────────────────────────────────

/**
 * يملأ قسم النتيجة بالبيانات المحسوبة.
 * @param {string} sonName
 * @param {string} motherName
 * @param {{ sonVal, motherVal, total, zodiacNum, zodiac }} result
 */
function renderResult(sonName, motherName, result) {
  const { sonVal, motherVal, total, zodiacNum, zodiac } = result;

  el('result-icon').textContent     = zodiac.icon;
  el('result-name').textContent     = zodiac.name;
  el('result-subtitle').textContent = `عنصر: ${zodiac.element}`;
  el('disp-son').textContent        = sonName;
  el('disp-son-val').textContent    = sonVal;
  el('disp-mother').textContent     = motherName;
  el('disp-mother-val').textContent = motherVal;
  el('disp-total').textContent      = total;
  el('disp-zodiac-num').textContent = zodiacNum;
}

/**
 * يعرض قسم النتيجة مع إعادة تشغيل الأنيميشن.
 */
function showResultSection() {
  const section = el('result-section');
  section.style.display = 'none';

  requestAnimationFrame(() => {
    section.style.display    = 'block';
    section.style.animation  = 'none';
    requestAnimationFrame(() => {
      section.style.animation = '';
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/**
 * يخفي قسم النتيجة ويمسح الحقول.
 */
function hideResultSection() {
  el('result-section').style.display = 'none';
  el('input-son').value    = '';
  el('input-mother').value = '';
  showFieldError('input-son',    'err-son',    false);
  showFieldError('input-mother', 'err-mother', false);
  el('input-son').focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Event Handlers ───────────────────────────────────

function handleCalculate() {
  const sonRaw    = el('input-son').value;
  const motherRaw = el('input-mother').value;

  const sonValid    = isValidArabicName(sonRaw);
  const motherValid = isValidArabicName(motherRaw);

  showFieldError('input-son',    'err-son',    !sonValid);
  showFieldError('input-mother', 'err-mother', !motherValid);

  if (!sonValid || !motherValid) return;

  const result = calculateZodiac(sonRaw, motherRaw);
  renderResult(sonRaw.trim(), motherRaw.trim(), result);
  showResultSection();
}

function handleReset() {
  hideResultSection();
}

// ─── Init ─────────────────────────────────────────────

function initApp() {
  ['input-son', 'input-mother'].forEach(id => {
    el(id).addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleCalculate();
    });
  });
}

document.addEventListener('DOMContentLoaded', initApp);
