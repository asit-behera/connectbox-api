# ✅ Backend Senior Developer Interview Task Checklist

## 🛠️ 1. Development Environment Setup

- [x] Set up Docker Compose with:
  - [x] Node.js LTS on port `3001`
  - [x] PostgreSQL 14.2 on port `5432`
- [x] Enable live-reloading for code changes
- [ ] Configure `eslint` and `prettier` (Google JavaScript style guide)
- [x] Ensure Git is used actively for commits

---

## 👤 2. User Registration API

- [x] Validate ID as email and ensure uniqueness
- [x] Validate password (12–20 chars, lowercase + special chars + numbers)
- [x] Encrypt password using bcrypt
- [x] Validate username (Korean, 1–10 characters)
- [x] Store registration time (ISO8601 format)
- [x] Return ID, username, and registration time on success

---

## 🔐 3. Login API

- [x] Validate email format
- [x] Check password and issue JWT on success
- [x] Use 256-bit hex value as JWT secret
- [x] JWT should expire in 20 minutes

---

## ✏️ 4. Modify User Info API (PATCH)

- [x] Allow modification of:
  - [x] Password (encrypted, validated)
  - [x] Username (Korean, 1–10 characters)
- [x] Process only non-null fields

---

## 📝 5. Post Management API

### 5.1 Post Creation

- [x] Validate title (1–30 characters)
- [x] Validate content (1–1000 characters)

### 5.2 Post Listing (Pagination)

- [x] Support query param for page number
- [x] Limit 20 posts per page
- [x] Include total post count
- [x] Sort by recent creation time
- [x] Return: Post ID, Title, Creator Username, ISO8601 Creation Time

### 5.3 Post Detail View

- [x] Return: Post ID, Title, Content, Creator Username, ISO8601 Creation Time
- [x] Handle responses:
  - [x] `200` - Success
  - [x] `401` - Auth failure
  - [ ] `404` - Not found

---

## 💬 6. Comment API

### 6.1 Comment Creation

- [ ] Validate content (1–500 characters)

### 6.2 Comment Listing (Cursor-based Pagination)

- [ ] Implement cursor-based pagination
- [ ] Limit to 10 comments per page
- [ ] Include cursor for next page (null if none)
- [ ] Sort by recent creation time
- [ ] Return: Comment ID, Content, Username, ISO8601 Creation Time

### 6.3 Comment Deletion

- [ ] Allow only comment/post owner to delete
- [ ] Use Comment ID to identify comment

---

## 📈 7. User Login Record API

- [ ] Track user ID, login time, and IP address
- [ ] Sort by recent login time
- [ ] Limit to 30 records
- [ ] Format login time as `YYYY-MM-DD HH:mm:ss`
- [ ] If user is deleted, show name as null

---

## 🏆 8. Weekly Login Rankings API

- [ ] Compute logins from Monday–Sunday
- [ ] Return user name and rank
- [ ] Include tie handling (no skipped ranks)
- [ ] Return number of users sharing same rank
- [ ] Limit to top 20 users
- [ ] Handle case when there are no login records (rank and count = null)

---

## 🔒 Authentication

- [ ] Ensure Bearer Token Authentication is applied to all APIs (except signup/login)
- [ ] Maintain consistent `application/json` Content-Type for all requests/responses
- [ ] Consistent error response format

---

## 🧪 Optional: Testing

- [ ] Write test cases (unit/integration)

---

## 🗂️ Additional Notes

- [ ] Use Prisma migrations for DB table setup

---
