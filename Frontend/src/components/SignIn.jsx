// components/SignIn.jsx
import React, { useState } from 'react';
import { Modal } from 'antd';
import {
    LockOutlined,
    MailOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    CloseOutlined,
} from '@ant-design/icons';

const SignIn = ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Sign in with:', { email, password });
            setLoading(false);
            onClose();
        }, 1500);
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            closable={false}
            centered
            width={400}
            className="signin-modal"
            styles={{
                body: {
                    padding: 0,
                    background: 'transparent',
                },
                content: {
                    background: 'transparent',
                    boxShadow: 'none',
                },
                mask: {
                    backdropFilter: 'blur(8px)',
                },
            }}
        >
            <div className="relative bg-white dark:bg-[#0F0F14]  p-8 border border-gray-200 dark:border-violet-500/20">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition text-gray-500 dark:text-gray-400"
                >
                    <CloseOutlined />
                </button>

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-violet-500/30">
                            N
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Welcome to <span className="bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">Naresh</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Sign in to your account (Admin ONLY)
                    </p>
                </div>

                {/* Sign In Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <MailOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition outline-none"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <LockOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition outline-none"
                                placeholder="Enter your password"
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition"
                            >
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </button>
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-medium shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default SignIn;