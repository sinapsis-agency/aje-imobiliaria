# Guía completa: publicar Ajé Imobiliária en internet

Esta guía cubre todo el camino, en orden: GitHub → publicar el sitio (gratis) → comprar el dominio → conectarlo. Sigue los pasos en orden, de principio a fin.

---

## PARTE 1 — Subir el proyecto a GitHub

GitHub es donde vive el código. Vamos a usar **GitHub Desktop**, que es una aplicación con botones (nada de escribir comandos raros en la Terminal).

1. **Crea una cuenta en GitHub**
   Entra a [github.com](https://github.com), haz clic en "Sign up" y sigue los pasos (correo, contraseña, nombre de usuario).

2. **Descarga GitHub Desktop**
   Entra a [desktop.github.com](https://desktop.github.com), descarga la app para Mac o Windows, e instálala como cualquier programa.

3. **Inicia sesión en GitHub Desktop**
   Abre la app, haz clic en "Sign in to GitHub.com" e ingresa con la cuenta que creaste en el paso 1.

4. **Crea el repositorio**
   En GitHub Desktop, ve a `File > Add Local Repository` (o "Agregar repositorio local"). Selecciona la carpeta `aje-imobiliaria` que tienes en tu computador (la que descomprimiste del zip que te fui pasando).
   - Si te dice que la carpeta no es un repositorio Git todavía, va a aparecer un botón que dice **"create a repository"** — haz clic ahí.
   - Déjalo con el nombre `aje-imobiliaria`, y presiona "Create Repository".

5. **Sube los cambios (commit)**
   Vas a ver una lista de todos los archivos del proyecto a la izquierda. Abajo hay un cuadro de texto que dice "Summary" — escribe algo como `Primera versión del sitio` y haz clic en el botón azul **"Commit to main"**.

6. **Publícalo en GitHub**
   Arriba a la derecha vas a ver un botón que dice **"Publish repository"**. Haz clic ahí.
   - Puedes dejarlo como "Private" (solo tú lo ves) o "Public" (cualquiera puede ver el código, no el sitio). Para este caso, Private está bien.
   - Haz clic en "Publish Repository".

¡Listo! Tu código ya está en GitHub. Cada vez que yo te pase cambios nuevos del sitio, solo repites los pasos 5 y 6 (Commit → Push) para actualizarlo.

---

## PARTE 2 — Publicar el sitio gratis (Vercel)

Vercel es un servicio gratuito que toma tu código de GitHub y lo convierte en una página web real, con un link. Ya dejé el proyecto configurado para que funcione ahí sin problemas.

1. **Crea una cuenta en Vercel**
   Entra a [vercel.com](https://vercel.com) y haz clic en "Sign Up". Elige la opción **"Continue with GitHub"** — así quedan conectados automáticamente y no necesitas otra contraseña.

2. **Importa el proyecto**
   Una vez dentro, haz clic en **"Add New..." → "Project"**. Vercel te va a mostrar la lista de tus repositorios de GitHub — busca `aje-imobiliaria` y haz clic en **"Import"**.

3. **Despliega**
   Vercel va a detectar automáticamente que es un proyecto Vite/React (no necesitas cambiar ninguna configuración). Solo haz clic en el botón **"Deploy"** y espera 1-2 minutos.

4. **¡Tu sitio ya está en internet!**
   Vercel te va a dar un link gratis parecido a `aje-imobiliaria.vercel.app`. Ese link ya funciona y lo puedes compartir — pero vamos a conectarlo con tu dominio propio en la Parte 4.

---

## PARTE 3 — Comprar el dominio www.ajeimovil.cl

Se compra directo en el sitio oficial de Chile (NIC Chile) — es la opción más barata y segura, evita intermediarios que cobran de más.

1. **Entra al sitio oficial**
   Ve a [nic.cl](https://www.nic.cl)

2. **Busca tu dominio**
   Busca `ajeimovil` en el buscador de disponibilidad, y confirma que **`ajeimovil.cl`** esté libre.

3. **Regístrate y compra**
   Crea una cuenta con tu correo (no necesitas RUT chileno para comprar, cualquier persona del mundo puede registrar un `.cl`). Sigue el flujo de pago — cuesta aproximadamente **$9.990 CLP + IVA al año** (unos US$11-12).

4. **Confirma la compra**
   Una vez pagado, el dominio queda a tu nombre en minutos. Guarda bien tu usuario y contraseña de NIC Chile — los vas a necesitar en el siguiente paso.

---

## PARTE 4 — Conectar el dominio con el sitio

Este es el último paso: decirle al dominio `ajeimovil.cl` que apunte hacia tu sitio publicado en Vercel.

1. **En Vercel**, entra a tu proyecto `aje-imobiliaria`, ve a la pestaña **"Settings" → "Domains"**.

2. Escribe `ajeimovil.cl` (y también `www.ajeimovil.cl`) y haz clic en **"Add"**.

3. Vercel te va a mostrar unos datos técnicos (algo como "Type: A, Value: 76.76.21.21" y "Type: CNAME, Value: cname.vercel-dns.com") — **déjalos abiertos en una pestaña**, los vas a copiar en el paso siguiente.

4. **Vuelve a NIC Chile**, entra a tu cuenta, busca la sección de administración de tu dominio (algo como "Gestionar DNS" o "Zona DNS").

5. Agrega los mismos datos que te dio Vercel:
   - Un registro tipo **A** apuntando a la IP que te dio Vercel
   - Un registro tipo **CNAME** para el `www`, apuntando a `cname.vercel-dns.com`

6. **Espera la propagación**
   Este cambio puede tardar entre 30 minutos y 24 horas en activarse (es normal, es el tiempo que toma internet en "aprenderse" la nueva dirección). Vercel te avisa con un check verde cuando ya está listo.

Cuando termine este paso, `www.ajeimovil.cl` va a mostrar directamente tu sitio.

---

## Resumen visual del camino completo

```
Tu computador (código)
        (GitHub Desktop: Commit + Publish)
GitHub (guarda el código)
        (Vercel: Import + Deploy)
Vercel (publica el sitio, gratis)
        (conectar dominio)
www.ajeimovil.cl (tu dirección final)
```

### Si quedas trabado en cualquier paso
Vuelve aquí al chat y me cuentas exactamente en qué paso estás y qué mensaje te aparece — te ayudo a resolverlo.
