/**
 * calculator.js
 * المنطق الحسابي البحت — لا يعرف شيئاً عن DOM أو واجهة المستخدم.
 * يعتمد على: data.js
 */

/**
 * يحسب القيمة الرقمية لاسم عربي.
 * @param {string} name
 * @returns {number}
 */
function calcNameValue(name) {
  return name.split('').reduce((sum, char) => {
    return sum + (LETTER_VALUES[char] ?? 0);
  }, 0);
}

/**
 * يقلّص الرقم للقيمة الأصغر الموجبة بطرح دورة الأبراج تكراراً.
 * @param {number} total
 * @returns {number}
 */
function reduceToZodiacNumber(total) {
  let n = total;
  while (n - ZODIAC_CYCLE > 0) n -= ZODIAC_CYCLE;
  return n;
}

/**
 * يتحقق أن النص يحتوي على أحرف عربية فقط.
 * @param {string} value
 * @returns {boolean}
 */
function isValidArabicName(value) {
  return value.trim().length > 0 && ARABIC_REGEX.test(value.trim());
}

/**
 * يعيد بيانات البرج بناءً على رقمه (1–12).
 * @param {number} num
 * @returns {{ name: string, icon: string, element: string } | null}
 */
function getZodiac(num) {
  return ZODIACS[num] ?? null;
}

/**
 * الدالة الرئيسية — تأخذ الأسماء وتعيد نتيجة كاملة.
 * @param {string} sonName
 * @param {string} motherName
 * @returns {{ sonVal: number, motherVal: number, total: number, zodiacNum: number, zodiac: object }}
 */
function calculateZodiac(sonName, motherName) {
  const sonVal    = calcNameValue(sonName.trim());
  const motherVal = calcNameValue(motherName.trim());
  const total     = sonVal + motherVal;
  const zodiacNum = reduceToZodiacNumber(total);
  const zodiac    = getZodiac(zodiacNum);

  return { sonVal, motherVal, total, zodiacNum, zodiac };
}
