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
