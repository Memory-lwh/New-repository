/* ===================================================
   2408090602013 罗文惠 · 第一个网页交互脚本
   =================================================== */

/* ---------- 1. 实时时钟 ---------- */
function tick() {
  var now = new Date();
  var pad = function (n) { return n < 10 ? '0' + n : n; };
  var str = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
  var clock = document.getElementById('clock');
  if (clock) clock.textContent = str;

  var week = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];
  var dateText = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' +
                 now.getDate() + '日 星期' + week + ' ' + str;
  var nowDate = document.getElementById('now-date');
  if (nowDate) nowDate.textContent = dateText;
}
tick();
setInterval(tick, 1000);

/* ---------- 2. 按时段问候 ---------- */
(function greeting() {
  var h = new Date().getHours();
  var text;
  if (h < 6)        text = '夜深了，注意休息，欢迎光临 🌙';
  else if (h < 12)  text = '早上好，欢迎光临！☀️';
  else if (h < 14)  text = '中午好，欢迎光临！🍚';
  else if (h < 18)  text = '下午好，欢迎光临！🌤';
  else              text = '晚上好，欢迎光临！🌆';
  var el = document.getElementById('greeting');
  if (el) el.textContent = text;
})();

/* ---------- 3. 打字机效果 ---------- */
(function typeWriter() {
  var full = '2408090602013罗文惠的第一个网页';
  var box = document.getElementById('typed');
  if (!box) return;
  var i = 0;
  var timer = setInterval(function () {
    box.textContent = full.slice(0, i + 1);
    i++;
    if (i >= full.length) clearInterval(timer);
  }, 150);
})();

/* ---------- 4. 滚动淡入动画 ---------- */
var revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function (el) { io.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add('show'); });
}

/* ---------- 5. 技能条进入视口时增长 ---------- */
var bars = document.querySelectorAll('.bar i');
if ('IntersectionObserver' in window) {
  var barIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        el.style.width = '0';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { el.style.width = el.dataset.w; });
        });
        barIO.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(function (el) {
    el.dataset.w = el.style.width; // 记录 HTML 中写好的目标宽度
    el.style.width = '0';
    barIO.observe(el);
  });
}

/* ---------- 6. 返回顶部按钮 ---------- */
var backTop = document.getElementById('backTop');
window.addEventListener('scroll', function () {
  if (window.scrollY > 400) backTop.classList.add('show');
  else backTop.classList.remove('show');
});

/* ---------- 7. 页面停留计时 ---------- */
(function stayTime() {
  var start = Date.now();
  var el = document.getElementById('stay-time');
  if (!el) return;
  setInterval(function () {
    var s = Math.floor((Date.now() - start) / 1000);
    var m = Math.floor(s / 60);
    el.textContent = m > 0 ? (m + ' 分 ' + (s % 60) + ' 秒') : (s + ' 秒');
  }, 1000);
})();

/* ---------- 8. 留言表单：校验并即时显示 ---------- */
var form = document.getElementById('msgForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var tip = document.getElementById('formTip');
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var content = document.getElementById('content').value.trim();
    var rate = form.querySelector('input[name="rate"]:checked').value;

    if (!name || !email || !content) {
      tip.textContent = '请把昵称、邮箱和留言内容填写完整哦～';
      tip.className = 'form-tip err';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tip.textContent = '邮箱格式好像不正确，请检查一下～';
      tip.className = 'form-tip err';
      return;
    }

    var li = document.createElement('li');
    var b = document.createElement('b');
    b.textContent = name + '（' + rate + '）：';
    li.appendChild(b);
    li.appendChild(document.createTextNode(content));
    var time = document.createElement('time');
    time.textContent = '刚刚';
    li.appendChild(time);
    document.getElementById('msgs').prepend(li);

    tip.textContent = '留言提交成功，谢谢你的访问！🎉';
    tip.className = 'form-tip ok';
    form.reset();
  });
}

/* ---------- 9. 页脚年份 ---------- */
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- 10. 控制台小彩蛋 ---------- */
console.log('%c欢迎来到 2408090602013 罗文惠的第一个网页！',
  'color:#6c5ce7;font-size:18px;font-weight:bold;');
console.log('本站使用 HTML + CSS + JavaScript 制作 ✨');
