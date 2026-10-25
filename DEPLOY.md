# 🚀 Как запустить CRM Pro онлайн

Полная инструкция по размещению CRM системы в интернете.

## 📋 Содержание

1. [Способ 1: Vercel (рекомендуется)](#способ-1-vercel-рекомендуется)
2. [Способ 2: Netlify](#способ-2-netlify)
3. [Способ 3: GitHub Pages](#способ-3-github-pages)
4. [Способ 4: Cloudflare Pages](#способ-4-cloudflare-pages)
5. [Способ 5: Собственный сервер](#способ-5-собственный-сервер)
6. [Свой домен](#свой-домен)
7. [PWA - Установка как приложение](#pwa---установка-как-приложение)

---

## 🎯 Способ 1: Vercel (рекомендуется)

**Vercel** — самая простая и быстрая платформа для деплоя. Бесплатно!

### Шаг 1: Регистрация
1. Перейдите на [vercel.com](https://vercel.com)
2. Нажмите **"Sign Up"**
3. Войдите через GitHub, GitLab или Email

### Шаг 2: Загрузка проекта на GitHub
```bash
# Инициализируйте Git репозиторий
git init
git add .
git commit -m "Initial commit"

# Создайте репозиторий на GitHub (github.com/new)
# Затем свяжите локальный репозиторий с удалённым
git remote add origin https://github.com/ВАШ_USERNAME/crm-pro.git
git branch -M main
git push -u origin main
```

### Шаг 3: Деплой на Vercel
1. На [vercel.com](https://vercel.com) нажмите **"Add New Project"**
2. Выберите ваш репозиторий `crm-pro`
3. Vercel автоматически определит что это Vite проект
4. Нажмите **"Deploy"**
5. Подождите 1-2 минуты
6. ✅ Готово! Вы получите ссылку вида: `https://crm-pro.vercel.app`

### Обновление
При каждом `git push` в main ветку, Vercel автоматически пересоберёт и задеплоит новую версию!

---

## 🎯 Способ 2: Netlify

**Netlify** — ещё одна отличная бесплатная платформа.

### Шаг 1: Сборка проекта локально
```bash
npm install
npm run build
```
В папке `dist/` появятся готовые файлы.

### Шаг 2: Деплой через drag & drop
1. Перейдите на [netlify.com](https://netlify.com)
2. Зарегистрируйтесь
3. На главной странице найдите область **"Deploy manually"**
4. Перетащите папку `dist/` в эту область
5. ✅ Готово! Получите ссылку вида: `https://random-name.netlify.app`

### Альтернатива: Через GitHub
1. Загрузите проект на GitHub (как в способе 1)
2. На Netlify нажмите **"Add new site" → "Import an existing project"**
3. Выберите GitHub репозиторий
4. Настройки:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Нажмите **"Deploy site"**

---

## 🎯 Способ 3: GitHub Pages

**GitHub Pages** — бесплатно, но требует настройки.

### Шаг 1: Установите пакет
```bash
npm install --save-dev gh-pages
```

### Шаг 2: Добавьте в package.json
```json
{
  "homepage": "https://ВАШ_USERNAME.github.io/crm-pro",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Шаг 3: Настройте Vite
Создайте файл `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/crm-pro/'
})
```

### Шаг 4: Деплой
```bash
npm run deploy
```
Сайт будет доступен по адресу: `https://ВАШ_USERNAME.github.io/crm-pro`

---

## 🎯 Способ 4: Cloudflare Pages

**Cloudflare Pages** — быстро и бесплатно с CDN по всему миру.

### Шаг 1: Загрузите на GitHub
(Как в способе 1)

### Шаг 2: Подключите к Cloudflare
1. Перейдите на [pages.cloudflare.com](https://pages.cloudflare.com)
2. **"Create a project" → "Connect to Git"**
3. Выберите репозиторий
4. Настройки сборки:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Нажмите **"Save and Deploy"**

---

## 🎯 Способ 5: Собственный сервер

Если у вас есть VPS или хостинг с поддержкой Node.js.

### Шаг 1: Сборка
```bash
npm install
npm run build
```

### Шаг 2: Загрузка файлов
Загрузите содержимое папки `dist/` на сервер через FTP/SFTP в корень веб-сайта.

### Шаг 3: Настройка Nginx (для SPA)
```nginx
server {
    listen 80;
    server_name ваш-домен.ru;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Шаг 4: Настройка Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🌐 Свой домен

### Подключение домена к Vercel/Netlify

1. Купите домен (например, на [reg.ru](https://reg.ru), [name.com](https://name.com))
2. В настройках проекта на Vercel/Netlify:
   - Перейдите в **"Domains"**
   - Добавьте свой домен: `crm.ваш-сайт.ru`
3. У регистратора домена настройте DNS:
   - **Для Vercel:** Добавьте CNAME запись: `cname.vercel-dns.com`
   - **Для Netlify:** Добавьте CNAME: `ваш-сайт.netlify.app`
4. Подождите 5-30 минут для применения DNS
5. ✅ Готово! Сайт доступен по вашему домену

---

## 📱 PWA - Установка как приложение

Ваше CRM уже поддерживает PWA! Пользователи могут установить его как приложение на телефон.

### На iPhone/iPad (Safari):
1. Откройте сайт в Safari
2. Нажмите кнопку **"Поделиться"** (квадрат со стрелкой)
3. Прокрутите вниз и выберите **"На экран «Домой»"**
4. Нажмите **"Добавить"**
5. ✅ Иконка CRM Pro появится на рабочем столе!

### На Android (Chrome):
1. Откройте сайт в Chrome
2. Нажмите **⋮** (три точки) в правом верхнем углу
3. Выберите **"Добавить на главный экран"**
4. Нажмите **"Добавить"**
5. ✅ Приложение установлено!

### На компьютере (Chrome/Edge):
1. Откройте сайт в браузере
2. В адресной строке появится иконка установки
3. Нажмите **"Установить"**
4. ✅ CRM Pro работает как десктопное приложение!

---

## 🔧 Решение проблем

### Проблема: Белый экран после деплоя
**Решение:** Проверьте что в `vite.config.ts` правильно указан `base`:
```typescript
export default defineConfig({
  base: './', // для относительных путей
})
```

### Проблема: Не работают стили/скрипты
**Решение:** Проверьте пути в `dist/index.html` — они должны быть относительными.

### Проблема: 404 при обновлении страницы
**Решение:** Настройте сервер для SPA (см. способ 5).

---

## 📊 Сравнение платформ

| Платформа | Бесплатно | Скорость | Простота | Свой домен |
|-----------|-----------|----------|----------|------------|
| **Vercel** | ✅ Да | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Да |
| **Netlify** | ✅ Да | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Да |
| **GitHub Pages** | ✅ Да | ⭐⭐⭐⭐ | ⭐⭐⭐ | ✅ Да |
| **Cloudflare Pages** | ✅ Да | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ Да |
| **Свой сервер** | ❌ Платно | ⭐⭐⭐ | ⭐⭐ | ✅ Да |

---

## 🎓 Рекомендация

**Для начинающих:** Используйте **Vercel** — это самый простой способ:
1. Загрузите код на GitHub
2. Подключите к Vercel
3. Готово!

**Для продвинутых:** Используйте **Cloudflare Pages** — лучшая производительность и CDN.

---

## 📞 Поддержка

Если возникли вопросы:
1. Проверьте консоль браузера (F12) на ошибки
2. Убедитесь что все зависимости установлены: `npm install`
3. Проверьте что проект собирается локально: `npm run build`
4. Обратитесь к документации выбранной платформы

---

## ✅ Чек-лист перед деплоем

- [ ] Проект собирается без ошибок (`npm run build`)
- [ ] Все данные сохраняются в localStorage
- [ ] PWA манифест настроен
- [ ] Service Worker работает
- [ ] Иконка приложения добавлена
- [ ] Мета-теги для SEO настроены
- [ ] README.md обновлён

---

**Удачи с запуском вашего CRM! 🚀**
