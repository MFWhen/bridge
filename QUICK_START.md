# Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB running (local or cloud)
- `.env` file configured in backend folder

## Setup & Run

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs on `http://localhost:3000`

### 2. Frontend Setup
```bash
cd my-app
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` (or the port shown in terminal)

### 3. Configure Environment Variables
Create `.env` file in `backend/` folder:
```env
JWT_SECRET=your_secret_key_here_make_it_long_and_random
MONGODB_URI=mongodb://localhost:27017/expense-tracker
PORT=3000
```

## Using the App

### First Time User
1. Go to `http://localhost:5173/register`
2. Fill out registration form
3. Click "Register"
4. You'll be redirected to login page

### Returning User
1. Go to `http://localhost:5173/login`
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to expenses page

### Managing Expenses & Income
- Add expenses/income using the forms
- View your lists (only your data will appear)
- Edit or delete items as needed
- Logout when done

## How Authentication Works

1. **Sign Up:** User creates account → stored in database
2. **Sign In:** User logs in → receives JWT token
3. **Token Storage:** Token saved in browser's localStorage
4. **Authenticated Requests:** Every request includes token in header
5. **Data Filtering:** Backend only returns data belonging to that user

## Key Features

✅ **User Registration** - Create new accounts
✅ **User Login** - Secure authentication with JWT
✅ **Data Isolation** - Each user only sees their own expenses/income
✅ **Protected Routes** - All expense/income operations require login
✅ **Auto Logout** - Invalid/expired tokens trigger automatic logout
✅ **User-Specific Data** - Expenses/income automatically linked to logged-in user

## Testing with Multiple Users

1. Register first user (e.g., alice@test.com)
2. Add some expenses
3. Logout
4. Register second user (e.g., bob@test.com)
5. Add different expenses
6. Verify Bob can't see Alice's expenses
7. Login as Alice again
8. Verify Alice's expenses are still there

## API Endpoints

**Public:**
- POST `/users` - Register
- POST `/signIn` - Login

**Protected (require auth token):**
- GET `/expenses` - Get user's expenses
- POST `/expenses` - Add expense
- PUT `/expenses/:id` - Update expense
- DELETE `/expenses/:id` - Delete expense
- GET `/income` - Get user's income
- POST `/income` - Add income
- PUT `/income/:id` - Update income
- DELETE `/income/:id` - Delete income

## Troubleshooting

**"Cannot connect to database"**
- Make sure MongoDB is running
- Check MONGODB_URI in .env file

**"No token, authorization denied"**
- User needs to login first
- Token may have expired (logout and login again)

**"User already exist"**
- Email is already registered
- Try logging in instead of registering

**Frontend can't reach backend**
- Make sure backend is running on port 3000
- Check that CORS is enabled in backend

## File Structure

```
bridge/
├── backend/
│   ├── models/           # Database schemas
│   │   ├── users.js      # User model
│   │   ├── expenses.js   # Expense model (with user reference)
│   │   └── income.js     # Income model (with user reference)
│   ├── controllers/      # Business logic
│   │   ├── userController.js
│   │   ├── expenseController.js
│   │   └── incomeController.js
│   ├── routes/           # API endpoints
│   ├── middleware/       # Authentication middleware
│   │   └── isAuth.js     # JWT verification
│   └── index.js          # Server entry point
└── my-app/
    └── src/
        ├── components/   # React components
        │   ├── Login.jsx      # Login form
        │   ├── Register.jsx   # Registration form
        │   ├── ExpensesPage.jsx
        │   └── IncomePage.jsx
        └── utils/
            └── api.js    # API helper functions (with auth)
```

## Important Security Notes

⚠️ **Current implementation is for DEVELOPMENT ONLY**
- Passwords are NOT hashed (stored in plain text)
- For production, you MUST:
  - Hash passwords with bcrypt
  - Use HTTPS
  - Add input validation
  - Implement rate limiting
  - Add token expiration

## Next Steps

1. Test the registration and login flow
2. Create multiple users to test data isolation
3. Add expenses and income for different users
4. Verify each user only sees their own data
5. Read AUTHENTICATION_GUIDE.md for detailed technical explanation
