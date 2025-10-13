export default function App() {
    return (
        <div className="App">
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">
                        Quiz App
                    </span>
                    <div>
                        <span className="me-3">TODO insert user</span>
                        <button className="btn btn-outline-secondary btn-sm">Выйти</button>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="mt-4 paper">
                            <div className="card-header text-center">
                                <h3>Вопрос 1</h3>
                            </div>
                            <div className="card-body p-5 text-center">
                                <div className="mb-3 p-3 border rounded">Вариант 1</div>
                                <div className="mb-3 p-3 border rounded">Вариант 2</div>
                                <div className="mb-3 p-3 border rounded">Вариант 3</div>
                                <div className="mb-3 p-3 border rounded">Вариант 4</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}