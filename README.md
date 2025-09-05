# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## 📘 React + Redux + Clerk Concepts (Project Reference)

# 📘 React + Redux + Clerk Project

A comprehensive reference guide for building modern web applications with **React**, **Redux Toolkit**, **React Router**, and **Clerk Authentication**.

## 🚀 Tech Stack

- **React** - Frontend library for building user interfaces
- **Redux Toolkit** - State management with simplified Redux patterns
- **React Router** - Client-side routing for single-page applications
- **Clerk** - Complete authentication and user management solution

## 📚 Core Concepts & Hooks Reference

### React Fundamentals

| **Hook/Concept** | **Purpose** | **Use Case** |
|------------------|-------------|--------------|
| `useState` | Manage local component state | Form inputs, toggles, component-specific data |
| `useEffect` | Handle side effects after render | API calls, subscriptions, cleanup, timers |
| `useContext` | Share data without prop drilling | Global themes, language settings, auth state |

```jsx
// useState example
const [count, setCount] = useState(0);

// useEffect example
useEffect(() => {
  fetchData();
}, [dependency]);

// useContext example
const theme = useContext(ThemeContext);
```

### React Router Navigation

| **Hook/Component** | **Purpose** | **Use Case** |
|--------------------|-------------|--------------|
| `<Link>` | Declarative navigation component | Menu links, buttons that navigate |
| `useNavigate` | Programmatic navigation hook | Redirects after actions, form submissions |
| `useParams` | Access URL parameters | Dynamic routes, user profiles |
| `useLocation` | Get current location object | Conditional rendering, analytics |

```jsx
// Link component
<Link to="/dashboard">Go to Dashboard</Link>

// useNavigate hook
const navigate = useNavigate();
const handleSubmit = () => {
  // ... form logic
  navigate('/success');
};
```

### Redux State Management

| **Hook/Method** | **Purpose** | **Use Case** |
|-----------------|-------------|--------------|
| `useSelector` | Read data from Redux store | Access global state in components |
| `useDispatch` | Send actions to Redux store | Update global state, trigger reducers |
| `createSlice` | Define state slice with reducers | Organize related state and actions |
| `createAsyncThunk` | Handle async operations | API calls with loading/error states |

```jsx
// useSelector example
const user = useSelector(state => state.auth.user);

// useDispatch example
const dispatch = useDispatch();
dispatch(updateProfile(newData));

// createSlice example
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});
```

### Clerk Authentication

| **Hook/Component** | **Purpose** | **Use Case** |
|--------------------|-------------|--------------|
| `useUser` | Access current user data | Display user info, check user properties |
| `useAuth` | Authentication state & tokens | Check login status, get JWT tokens |
| `SignedIn` / `SignedOut` | Conditional rendering components | Show/hide UI based on auth state |
| `UserButton` | Pre-built user menu component | Quick account management UI |

```jsx
// useUser example
const { user, isLoaded } = useUser();
const userRole = user?.publicMetadata?.role;

// useAuth example
const { isSignedIn, getToken } = useAuth();

// Conditional rendering
<SignedIn>
  <Dashboard />
</SignedIn>
<SignedOut>
  <LoginPage />
</SignedOut>
```

## 🔐 User Roles & Metadata

### Public vs Private Metadata

| **Type** | **Accessibility** | **Use Case** |
|----------|-------------------|--------------|
| `publicMetadata` | Frontend + Backend | User roles, preferences, public profile data |
| `privateMetadata` | Backend only | Sensitive data, subscription info, internal notes |

### Role Management Examples

```jsx
// Check user role in component
const { user } = useUser();
const isAdmin = user?.publicMetadata?.role === 'admin';

// Backend role assignment
await clerkClient.users.updateUser(userId, {
  publicMetadata: {
    role: 'admin',
    permissions: ['read', 'write', 'delete']
  }
});
```

## 🛠️ Common Patterns

### Protected Routes

```jsx
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
```

### Role-Based Access Control

```jsx
function AdminPanel() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';
  
  if (!isAdmin) {
    return <div>Access denied. Admin role required.</div>;
  }
  
  return <div>Admin Dashboard Content</div>;
}
```

### Redux + Clerk Integration

```jsx
// Store user data in Redux when authenticated
const { user } = useUser();
const dispatch = useDispatch();

useEffect(() => {
  if (user) {
    dispatch(setCurrentUser({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      role: user.publicMetadata?.role
    }));
  }
}, [user, dispatch]);
```

## 🔧 Setup & Configuration

### Environment Variables

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

### Basic App Structure

```jsx
import { ClerkProvider } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';

function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  );
}
```

## 📖 Best Practices

### State Management
- Use **Redux** for global state (user data, app settings)
- Use **React state** for local component state (form inputs, UI toggles)
- Keep auth state in Clerk, sync important data to Redux

### Security
- Always validate user roles on the backend
- Use `privateMetadata` for sensitive information
- Implement proper error boundaries

### Performance
- Use `useSelector` with shallow comparisons
- Memoize expensive computations with `useMemo`
- Lazy load routes with `React.lazy()`

## 🚦 Common Workflows

### User Registration & Role Assignment
1. User signs up through Clerk
2. Backend webhook assigns default role
3. Admin can update roles through dashboard
4. Frontend checks roles for access control

### Authentication Flow
1. User authenticates with Clerk
2. Get user data with `useUser`
3. Store relevant data in Redux
4. Use auth state for navigation

## 🔍 Debugging Tips

- Check Clerk dashboard for user metadata
- Use Redux DevTools for state inspection
- Verify environment variables are loaded
- Check network tab for failed API calls

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)
- [React Documentation](https://react.dev/)

---

**Happy coding!** 🎉 This reference should help you build robust, scalable applications with modern React patterns and secure authentication.