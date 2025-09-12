import React, { useState } from 'react';
import axios from '../src/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/user/signup',
                { username: name, email, password }
            );
            toast.success('Signup successful!');
            navigate('/');
        } catch (error) {
            toast.error('Signup failed. Try again!');
            console.error('Signup failed', error);
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4">Signup</h2>
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="p-2 border rounded" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="p-2 border rounded" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="p-2 border rounded" />
                    <button type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Signup
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate('/')}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    )
};

export default Signup