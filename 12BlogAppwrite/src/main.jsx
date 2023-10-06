import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import store from './store/store.js'
import { AuthLayout, Login, SignUp } from './components/index.js'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx' 
import AllPostPage from './pages/AllPostPage.jsx'
import AddPostPage from './pages/AddPostPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'
import PostPage from './pages/PostPage.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignUpPage />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPostPage />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPostPage />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPostPage />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <PostPage />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
