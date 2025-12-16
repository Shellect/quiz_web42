import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { apiPost } from "../utils/api";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.password_confirmation) {
            setError("Пароли не совпадают");
            return;
        }

        setLoading(true);

        try {
            const response = await apiPost("/api/v1/register", formData);
            const data = await response.json();
            setUser(data.user);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card paper">
                <div className="auth-header">
                    <div className="auth-icon auth-icon-signup">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>
                    <h2>Регистрация</h2>
                    <p className="auth-subtitle">Создайте аккаунт в Quiz App</p>
                </div>

                {error && (
                    <div className="auth-error">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Имя</label>
                        <div className="input-wrapper">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Иван Иванов"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@mail.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <div className="input-wrapper">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                            </svg>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                minLength={8}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirmation">Подтвердите пароль</label>
                        <div className="input-wrapper">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                            </svg>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                placeholder="••••••••"
                                minLength={8}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? (
                            <span className="loader"></span>
                        ) : (
                            "Создать аккаунт"
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Уже есть аккаунт?{" "}
                        <Link to="/signin">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

