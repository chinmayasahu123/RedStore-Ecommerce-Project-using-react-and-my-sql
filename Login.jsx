import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { login } = useContext(AuthContext);

    const onSubmit = data => {
        login(data.email, data.password);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-white to-accent dark:from-dark-background dark:to-dark-accent p-4">
            <div className="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-text-primary dark:text-dark-text-primary">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} type="email" placeholder="Email" className="w-full p-3 border rounded-lg dark:bg-dark-background dark:border-gray-600" />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="mb-6">
                        <input {...register("password", { required: "Password is required" })} type="password" placeholder="Password" className="w-full p-3 border rounded-lg dark:bg-dark-background dark:border-gray-600" />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white p-3 rounded-full font-bold hover:bg-opacity-90 transition disabled:bg-gray-400">
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="text-center mt-4 text-text-secondary dark:text-dark-text-secondary">
                        Don't have an account? <Link to="/register" className="text-primary dark:text-dark-primary font-semibold">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}