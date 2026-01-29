// عناصر DOM للشات
const chatUI = document.getElementById('chat-ui');
const messages = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const fileInput = document.getElementById('file-input');
const sendBtn = document.getElementById('send-btn');
const logoutBtn = document.getElementById('logout-btn');

// تابع إرسال الرسائل والملفات
sendBtn.onclick = async () => {
  const text = userInput.value.trim();
  if (!text && fileInput.files.length === 0) return;

  if (text) messages.innerHTML += `<div><b>أنت:</b> ${text}</div>`;

  const formData = new FormData();
  if (text) formData.append('message', text);
  if (fileInput.files.length > 0) formData.append('file', fileInput.files[0]);

  try {
    const res = await fetch('https://wmkkqnuvzsazurswdjdr.supabase.co/functions/v1/clever-handler', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    messages.innerHTML += `<div><b>NOVA AI:</b> ${data.response}</div>`;
    messages.scrollTop = messages.scrollHeight;
  } catch (e) {
    messages.innerHTML += `<div><b>خطأ:</b> لم يتم إرسال الرسالة</div>`;
  }

  userInput.value = '';
  fileInput.value = '';
};

// زر الخروج من الشات
logoutBtn.onclick = async () => {
  // فقط إعادة تحميل الصفحة لعرض شاشة التسجيل الموجودة في HTML
  location.reload();
};

// عند تحميل الصفحة، إذا كانت الشات معروضة، أظهرها
window.addEventListener('load', () => {
  const chatVisible = chatUI.style.display !== 'none';
  if (chatVisible) chatUI.style.display = 'block';
});