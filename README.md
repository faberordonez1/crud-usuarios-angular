# Usuarios Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

### Development server (Subir proyecto en ambiente Local)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Error BD Firestore
En caso de no listar, ni guardar usuarios, se de debe configurar la fecha en las [reglas](https://console.firebase.google.com/project/usuarios-e46c2/firestore/rules?hl=es)  de firestone por una de la fecha actualizada.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2023, 12, 17); //Linea a cambiar
    }
  }
}

```

-  [Url App Desplegada](https://faber-user.vercel.app/list-usuarios)

