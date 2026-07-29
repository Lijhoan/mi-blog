# Despliegue en Azure Static Web Apps

Procedimiento operativo real de este proyecto. Seguirlo tal cual para cualquier actualización del portafolio.

---

## 1. Arquitectura actual de despliegue

```text
Código Next.js
  → validación (typecheck + lint)
  → build estático (pnpm run build)
  → carpeta out/
  → SWA CLI (pnpm dlx)
  → Azure Static Web App: mi-blog-lijhoan
```

Reglas de esta arquitectura:

- **GitHub se utiliza solo para control de versiones.**
- **`git push` NO publica automáticamente.** No hay CI conectado al recurso.
- Azure está configurado con **provider `SwaCli`** (`repositoryUrl: null`, `branch: null`).
- **No debe crearse otra Static Web App.** Ya existe el recurso y es el único.
- **No debe desplegarse `.next`** (es artefacto interno del build).
- **No debe desplegarse un ZIP.**
- **La única carpeta publicable es `out/`.**

---

## 2. Requisitos previos

- Node.js disponible en el PATH.
- pnpm disponible (10.4.1).
- Azure CLI (`az`) instalado.
- Sesión activa en Azure CLI.
- Acceso a la suscripción **Azure for Students**.
- Acceso al recurso **mi-blog-lijhoan**.
- Terminal ubicada en la raíz del proyecto (donde está `package.json`).

Comandos de comprobación:

```powershell
pwd
node --version
pnpm --version
az version
az account show --output table
```

Si `az account show` falla, reautenticar:

```powershell
az login --scope https://management.core.windows.net//.default
```

---

## 3. Datos del recurso Azure

| Dato | Valor |
|---|---|
| Static Web App | `mi-blog-lijhoan` |
| Resource Group | `mi-blog-rg` |
| Subscription ID | `78981bfe-23e8-4038-bcb9-789c5b6f1181` |
| URL de producción | https://salmon-smoke-02ce9df10.1.azurestaticapps.net |
| Entorno | `production` |
| Provider | `SwaCli` |
| SKU | `Free` |

Consulta de solo lectura para confirmar el recurso:

```powershell
az staticwebapp show `
  --name "mi-blog-lijhoan" `
  --resource-group "mi-blog-rg" `
  --query "{name:name, hostname:defaultHostname, provider:provider, sku:sku.name}" `
  --output jsonc
```

> No se documentan ni almacenan tokens ni secretos en este archivo.

---

## 4. Validación previa

```powershell
pnpm run typecheck
pnpm run lint
```

- Si **cualquiera falla, no continuar**.
- Corregir primero los errores de TypeScript o ESLint.
- **No desplegar con errores conocidos.**

---

## 5. Generación del build

```powershell
pnpm run build
```

Next.js genera la exportación estática (`output: 'export'`) en la carpeta:

```text
out/
```

Validaciones del build:

```powershell
Test-Path .\out\index.html

Get-Item .\out\index.html |
  Select-Object FullName, Length, LastWriteTime
```

La fecha de `LastWriteTime` **debe corresponder al build recién ejecutado**. Si es antigua, el build no se regeneró y se estaría publicando contenido viejo.

---

## 6. Autenticación con SWA CLI

Normalmente **no se requiere repetir el login** mientras las credenciales locales sigan válidas.

Si es necesario autenticarse:

```powershell
pnpm dlx @azure/static-web-apps-cli@2.0.10 login `
  --subscription-id "78981bfe-23e8-4038-bcb9-789c5b6f1181" `
  --resource-group "mi-blog-rg" `
  --app-name "mi-blog-lijhoan"
```

**Advertencias:**

- El comando puede crear o actualizar un archivo `.env` local.
- `.env` **debe permanecer ignorado por Git** (ya está en `.gitignore`).
- **No mostrar ni commitear su contenido.**
- **No regenerar tokens** salvo necesidad real.

---

## 7. Despliegue a producción

```powershell
pnpm dlx @azure/static-web-apps-cli@2.0.10 deploy .\out `
  --app-name "mi-blog-lijhoan" `
  --resource-group "mi-blog-rg" `
  --env production
```

Resultado esperado:

```text
Project deployed to:
https://salmon-smoke-02ce9df10.1.azurestaticapps.net
```

---

## 8. Validación posterior

Rutas a comprobar: `/`, `/about/`, `/projects/`, `/experience/`, `/skills/`, `/certifications/`, `/contact/`, `/cv.pdf`.

```powershell
$urls = @(
  "https://salmon-smoke-02ce9df10.1.azurestaticapps.net/",
  "https://salmon-smoke-02ce9df10.1.azurestaticapps.net/about/",
  "https://salmon-smoke-02ce9df10.1.azurestaticapps.net/projects/",
  "https://salmon-smoke-02ce9df10.1.azurestaticapps.net/experience/",
  "https://salmon-smoke-02ce9df10.1.azurestaticapps.net/skills/",
  "https://salmon-smoke-02ce9df10.1.azurestaticapps.net/certifications/",
  "https://salmon-smoke-02ce9df10.1.azurestaticapps.net/contact/",
  "https://salmon-smoke-02ce9df10.1.azurestaticapps.net/cv.pdf"
)

foreach ($url in $urls) {
  $response = Invoke-WebRequest -Uri $url -MaximumRedirection 5
  [PSCustomObject]@{
    Url = $url
    Status = $response.StatusCode
    ContentType = $response.Headers["Content-Type"]
  }
}
```

Las 8 rutas deben devolver **HTTP 200**. Además, conviene confirmar que el HTML publicado contiene señales del build actual (nombre, titular del hero, referencias a `/_next/`).

---

## 9. Flujo completo resumido

```powershell
pnpm run typecheck
pnpm run lint
pnpm run build

pnpm dlx @azure/static-web-apps-cli@2.0.10 deploy .\out `
  --app-name "mi-blog-lijhoan" `
  --resource-group "mi-blog-rg" `
  --env production
```

---

## 10. Qué no hacer

- No ejecutar `az staticwebapp create`.
- No crear otro recurso.
- No desplegar `.next`.
- No desplegar ZIP.
- No usar `npx swa`.
- No instalar el paquete incorrecto `swa@0.1.1`.
- No commitear `.env`.
- No mostrar deployment tokens.
- No asumir que `git push` despliega Azure.
- No ejecutar `swa deploy` si el build falló.
- No cambiar el provider sin una decisión arquitectónica.

---

## 11. Diagnóstico rápido

| Problema | Causa probable | Acción |
|---|---|---|
| `swa` no reconocido | No está instalado globalmente (es lo esperado) | Usar `pnpm dlx @azure/static-web-apps-cli@2.0.10` |
| Sesión Azure vencida (`AADSTS9002313` / "Please run az login") | Token expirado | `az login --scope https://management.core.windows.net//.default` |
| `out/index.html` no existe | No se ejecutó el build o falló | Ejecutar `pnpm run build` y revisar la salida |
| El build falla | Errores de TypeScript/ESLint o import roto | Ejecutar `pnpm run typecheck` y `pnpm run lint`, corregir y reintentar |
| Despliegue termina pero no se ven cambios | Se publicó un `out/` viejo, o caché del navegador | Verificar `LastWriteTime` de `out/index.html`, rebuild y recargar con Ctrl+F5 |
| `.env` aparece en `git status` | Regla de ignore ausente o archivo ya rastreado | Confirmar `git check-ignore -v .env`; si está rastreado: `git rm --cached .env` |
| Azure muestra `provider: SwaCli` | Es el estado correcto de este proyecto | Ninguna acción; no cambiarlo |
| `git push` no actualiza producción | No hay GitHub conectado (`repositoryUrl: null`) | Ejecutar el despliegue manual de la sección 7 |
| `npm error ECOMPROMISED` al usar `npx` | Caché de npm corrupto | Usar `pnpm dlx` en lugar de `npx` |

---

## 12. Historial de despliegue confirmado

**28/07/2026**

- Build Next.js exitoso.
- 9 páginas estáticas generadas.
- SWA CLI 2.0.10.
- Despliegue exitoso a `production`.
- 8 rutas verificadas con HTTP 200.
- Commit de seguridad: `985d30a chore(seguridad): ignorar .env generado por SWA CLI`.
