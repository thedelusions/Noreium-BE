# Noreium API Reference

All endpoints mounted under `/api`.

Authentication

- POST `/api/auth/register` — Register
  - Body: `{ email, password }`
  - Returns: `{ success, data: { id, email, role } }`

- POST `/api/auth/login` — Login
  - Body: `{ email, password }`
  - Returns: `{ success, data: { token } }`

- GET `/api/auth/me` — Current user
  - Auth: `Authorization: Bearer <token>`
  - Returns: `{ success, data: { id, email, role } }`

Library Items

- GET `/api/library-items` — List user's items
  - Auth required

- GET `/api/library-items/:id` — Get one item (owned)
  - Auth required

- POST `/api/library-items` — Create
  - Body: `{ type: 'TOOL'|'API'|'WEBSITE'|'RESOURCE', name, description?, url?, tags?, metadata? }`

- PUT `/api/library-items/:id` — Update (owned)

- DELETE `/api/library-items/:id` — Delete (owned)

Collections

- GET `/api/collections` — List
- POST `/api/collections` — Create `{ name, description? }`
- GET `/api/collections/:id` — Get collection (includes `itemIds`)
- PUT `/api/collections/:id` — Update
- DELETE `/api/collections/:id` — Delete

- POST `/api/collections/:id/items` — Add item to collection
  - Body: `{ itemId }` (item and collection must both be owned by user)

- DELETE `/api/collections/:id/items/:itemId` — Remove item

Generator

- POST `/api/generator/script` — Generate setup script
  - Body: `{ collectionId, platform: 'windows'|'linux' }`
  - Returns: `{ success, data: { platform, script, includedItems, skippedItems } }`

Validation

Zod is used for request validation for creating/updating library items and generator inputs.

Errors

Responses use the shape: `{ success: false, message, errors? }` for errors and `{ success: true, data }` on success.
