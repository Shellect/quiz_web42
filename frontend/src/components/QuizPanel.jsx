export default function QuizPanel({ title, children }) {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="mt-4 paper">
                        {title && (
                            <div className="card-header text-center">
                                <h3>{title}</h3>
                            </div>
                        )}
                        <div className="card-body p-5 text-center">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
