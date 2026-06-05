# Firebase Security Rules

У редактор Rules вставляй **тільки код** з блоків нижче — без заголовків, без \`\`\`, без українського тексту.

---

## Firestore (Firebase Console → Firestore → Rules)

Видали все, що там є зараз, і встав **лише це**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /news/{newsId} {
      allow read: if resource.data.status == 'published' || request.auth != null;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

Натисни **Publish**.

---

## Storage (Firebase Console → Storage → Rules)

Видали все й встав **лише це**:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /news/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Натисни **Publish**.

---

## Vercel (змінні середовища)

У **Vercel → Project → Settings → Environment Variables** додай ті самі змінні, що в `.env.local`:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Опційно (скидає кеш після збереження/видалення в адмінці):

- `REVALIDATE_SECRET` — довільний секрет (сервер)
- `NEXT_PUBLIC_REVALIDATE_SECRET` — **той самий** секрет (клієнт, для `/api/revalidate`)

Опційно (кращий автопереклад новин UK→EN у адмінці):

- `DEEPL_AUTH_KEY` — ключ [DeepL API Free](https://www.deepl.com/pro-api)

Без DeepL використовується безкоштовний MyMemory (ліміт на довгі тексти).

Після зміни змінних — **Redeploy** проєкт на Vercel.
