# User Authentication & Data Isolation Guide

## Overview
Your expense/income tracker now has complete user authentication where each user can only see and manage their own data.

---

## How It Works

### **1. User Registration (Sign Up)**

**Frontend Flow:**
1. User fills out registration form at `/register`
2. Form data sent to `POST http://localhost:3000/users`
3. Backend checks if email already exists
4. If new, creates user and returns success
5. User redirected to login page

**Backend Code:**
```javascript
// controllers/userController.js - postUser()
const foundUser = await User.findOne({ email: user.email });
if (foundUser) {
  response.status(400).json({ msg: "User already exist" });
} else {
  const newUser = new User(user);
  await newUser.save();
  response.status(200).json({ user: newUser, msg: "User successfully added" });
}
```

---

### **2. User Login (Sign In)**

**Frontend Flow:**
1. User enters email & password at `/login`
2. Credentials sent to `POST http://localhost:3000/signIn`
3. Backend verifies email exists and password matches
4. If valid, generates JWT token containing user ID
5. Token + user info stored in localStorage
6. User redirected to expenses page

**Backend Code:**
```javascript
// controllers/userController.js - signIn()
const foundUser = await User.findOne({ email: user.email });
if (foundUser && user.password === foundUser.password) {
  const token = jwt.sign(
    { id: foundUser._id }, // User ID embedded in token
    process.env.JWT_SECRET
  );
  res.status(200).json({ user: foundUser, token: token });
}
```

**localStorage Storage:**
- `token`: JWT token (e.g., "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
- `user`: User object (e.g., `{_id: "123", email: "user@example.com", userName: "John"}`)

---

### **3. Authenticated Requests**

**How Requests are Authenticated:**
1. Frontend gets token from localStorage
2. Includes token in Authorization header: `Bearer <token>`
3. Backend middleware (`isAuth`) extracts and verifies token
4. Decodes token to get user ID
5. Attaches user ID to request object (`req.user.id`)
6. Controller uses this ID to filter/create data

**Middleware Code:**
```javascript
// middleware/isAuth.js
const token = req.header("Authorization")?.split(" ")[1]; // Get token from "Bearer <token>"
const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode
req.user = decoded; // Attach decoded data (contains user ID) to request
next(); // Allow request to continue
```

---

### **4. Data Isolation (Each User's Own Lists)**

#### **Creating Expenses/Income**
When a user creates an expense or income, the backend automatically assigns it to them:

```javascript
// controllers/expenseController.js - postExpense()
const userId = req.user?.id; // Get user ID from authenticated token
const newExpense = new Expense({ ...data, user: userId }); // Assign to user
await newExpense.save();
```

**Database Record:**
```javascript
{
  _id: "exp123",
  amount: 50,
  category: "Food",
  description: "Lunch",
  user: "user456", // ← Links to specific user
  date: "2025-12-06"
}
```

#### **Fetching Expenses/Income**
When a user requests their data, the backend only returns items belonging to them:

```javascript
// controllers/expenseController.js - getExpenses()
const userId = req.user?.id; // Get authenticated user's ID
const expenses = await Expense.find({ user: userId }); // Filter by user ID
```

**Key Point:** User A can NEVER see User B's data because:
- All queries filter by `user: userId`
- User ID comes from their own token
- Each user only has their own token

---

## Frontend Implementation

### **Using the API Utility**

All authenticated requests should use the `apiRequest` helper from `utils/api.js`:

```javascript
import { getExpenses, addExpense, deleteExpense } from '../utils/api';

// Fetch expenses (automatically includes auth token)
const data = await getExpenses();

// Add expense (automatically includes auth token + user ID)
const newExpense = await addExpense({
  amount: 50,
  category: 'Food',
  description: 'Lunch'
  // No need to include 'user' field - backend adds it automatically
});

// Delete expense
await deleteExpense(expenseId);
```

### **Checking Authentication**

```javascript
import { isLoggedIn, getUser, logout } from '../utils/api';

// Check if user is logged in
if (!isLoggedIn()) {
  navigate('/login');
}

// Get current user info
const user = getUser();
console.log(user.userName, user.email);

// Logout
logout(); // Clears localStorage and redirects to login
```

---

## Protected Routes

All expense and income routes now require authentication:

```javascript
// routes/expenseRoute.js
expenseRoute.get("/expenses", isAuth, getExpenses); // Must be logged in
expenseRoute.post("/expenses", isAuth, postExpense); // Must be logged in
// ... all routes protected
```

If user is not authenticated or token is invalid:
- Request returns 401 Unauthorized
- Frontend automatically logs out user
- User redirected to login page

---

## Database Schema

### **User Model**
```javascript
{
  userName: String,
  email: String (unique, required),
  password: String (required, min 6 chars),
  age: Number
}
```

### **Expense Model**
```javascript
{
  amount: Number (required),
  category: String (enum: Food, Transport, etc.),
  description: String (required),
  date: Date,
  user: ObjectId (ref: 'User', required) // ← Links to User
}
```

### **Income Model**
```javascript
{
  amount: Number (required),
  category: String (enum: Salary, Freelance, etc.),
  description: String (required),
  source: String,
  date: Date,
  user: ObjectId (ref: 'User', required) // ← Links to User
}
```

---

## Complete User Flow Example

### **Scenario: Alice registers and adds an expense**

1. **Registration**
   - Alice visits `/register`
   - Fills: email="alice@example.com", password="secret123"
   - POST to `/users` → User created with `_id: "user_alice"`

2. **Login**
   - Alice visits `/login`
   - Enters credentials → POST to `/signIn`
   - Backend generates token: `jwt.sign({ id: "user_alice" }, SECRET)`
   - Frontend stores token in localStorage

3. **Add Expense**
   - Alice fills expense form: amount=30, category="Food"
   - POST to `/expenses` with Authorization header: `Bearer <token>`
   - Backend middleware decodes token → `req.user.id = "user_alice"`
   - Controller creates: `{ amount: 30, category: "Food", user: "user_alice" }`

4. **View Expenses**
   - Alice visits expenses page → GET `/expenses` with token
   - Backend finds all expenses where `user: "user_alice"`
   - Only Alice's expenses returned (Bob's expenses filtered out)

---

## Security Notes

**Current Implementation:**
- ✅ JWT authentication with token verification
- ✅ Data isolation (users can't access others' data)
- ✅ Protected routes requiring authentication
- ⚠️ Passwords stored in plain text (for development only)

**For Production:**
- Use bcrypt to hash passwords before storing
- Add password validation (strength requirements)
- Implement token expiration and refresh tokens
- Use HTTPS for all requests
- Add rate limiting to prevent brute force attacks
- Validate all user inputs on backend

---

## Testing the System

1. **Start Backend:** `cd backend && npm start`
2. **Start Frontend:** `cd my-app && npm run dev`
3. **Test Registration:**
   - Go to `/register`
   - Create account with email/password
4. **Test Login:**
   - Go to `/login`
   - Sign in with credentials
5. **Test Data Isolation:**
   - Create expenses as User A
   - Logout, register as User B
   - Verify User B can't see User A's expenses

---

## API Endpoints Summary

### **Public (No Auth Required)**
- `POST /users` - Register new user
- `POST /signIn` - Login user

### **Protected (Auth Required)**
- `GET /expenses` - Get logged-in user's expenses
- `POST /expenses` - Create expense for logged-in user
- `PUT /expenses/:id` - Update expense
- `DELETE /expenses/:id` - Delete expense
- `GET /income` - Get logged-in user's income
- `POST /income` - Create income for logged-in user
- `PUT /income/:id` - Update income
- `DELETE /income/:id` - Delete income
- `GET /users/:id` - Get user profile

---

## Environment Variables

Make sure your `.env` file in backend contains:

```env
JWT_SECRET=your_secret_key_here
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

---

## Common Issues & Solutions

**Issue:** "No token, authorization denied"
- **Solution:** User not logged in or token expired. Redirect to login.

**Issue:** "User already exist"
- **Solution:** Email already registered. Try logging in instead.

**Issue:** "Authentication required" when fetching expenses
- **Solution:** Token not being sent. Check `apiRequest` includes Authorization header.

**Issue:** Can see other users' data
- **Solution:** Backend not filtering by user ID. Ensure controllers use `req.user.id`.

---

## Next Steps for Production

1. **Password Hashing:** Install bcrypt and hash passwords before saving
2. **Token Expiration:** Add expiry to JWT tokens
3. **Refresh Tokens:** Implement refresh token mechanism
4. **Input Validation:** Add comprehensive validation on all inputs
5. **Error Handling:** Improve error messages and logging
6. **Profile Management:** Allow users to update their profile
7. **Password Reset:** Add forgot password functionality
8. **Email Verification:** Verify email addresses on registration
