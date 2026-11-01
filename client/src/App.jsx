import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Home from './pages/Home.jsx'
import Authors from './pages/Authors.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PostDetails from './pages/PostDetails.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import Error from './pages/Error.jsx'

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/create"
                    element={
                        <ProtectedRoute>
                            <CreatePost />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/edit/:id"
    element={
        <ProtectedRoute>
            <EditPost />
        </ProtectedRoute>
    }
/>

                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="*" element={<Error />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App