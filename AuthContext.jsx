import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setAuthToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // The base URL of your backend API
    const API_BASE_URL = 'http://localhost:3001/api';

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            if (parsed?.token) {
                setAuthToken(parsed.token);
            }
        }
    }, []);

    // ✅ Modified Login function to call backend API
    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Assuming your backend returns a user object and a token
                const loggedInUser = { ...data.user, token: data.token };
                setAuthToken(data.token);
                setUser(loggedInUser);
                localStorage.setItem('user', JSON.stringify(loggedInUser));
                toast.success('Login successful!');
                navigate('/');
                return true;
            } else {
                toast.error(data.message || 'Invalid email or password.');
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Failed to connect to the server.');
            return false;
        }
    };

    // ✅ Modified Register function to call backend API
    const register = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // ✅ Correct the key from 'username' to 'name'
            body: JSON.stringify({
                name: data.username, // Use 'username' from the form and send as 'name'
                email: data.email,
                password: data.password
            }),
        });

            const result = await response.json();

            if (response.ok) {
                // Redirect to login instead of auto-login
                toast.success('Registration successful! Please log in.');
                navigate('/login');
                return true;
            } else {
                toast.error(result.message || 'Registration failed.');
                return false;
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Failed to connect to the server.');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setAuthToken(null);
        toast.success('Logged out successfully.');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};