import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import Toast from "./Toast";

export default function Navbar() {
    const { user, loading, setUser } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const isGuest = !loading && !user;

    const handleLogout = async () => {
        try {
            await api("/api/v1/logout", { method: "POST" });
            setUser(null);
            navigate("/signin");
        } catch (err) {
            setError("Ошибка выхода: " + err.message);
            setTimeout(() => setError(""), 5000);
        }
    };

    return (
        <>
            <Toast message={error} onClose={() => setError("")} />
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand mb-0 h1">Quiz App</Link>
                    <div>
                        {loading ? (
                            <span className="text-muted">Загрузка...</span>
                        ) : isGuest ? (
                            <>
                                <Link to="/signin" className="btn btn-outline-primary btn-sm me-2">
                                    Вход
                                </Link>
                                <Link to="/signup" className="btn btn-primary btn-sm">
                                    Регистрация
                                </Link>
                            </>
                        ) : (
                            <>
                                <span className="me-3">{user.name}</span>
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
