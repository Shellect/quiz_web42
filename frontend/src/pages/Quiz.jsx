import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import QuizPanel from "../components/QuizPanel";
import QuestionOption from "../components/QuestionOption";

export default function Quiz() {
    const [question, setQuestion] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            navigate('/signin');
            return;
        }

        const fetchQuestion = async () => {
            try {
                setLoading(true);
                setSelectedOption(null);
                const response = await api('/api/v1/quiz?category=1&number=' + questionNumber);
                const data = await response.json();
                setQuestion(data.question);
            } catch (error) {
                console.error('Ошибка загрузки вопроса:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [user, authLoading, questionNumber, navigate]);

    const handleNextQuestion = () => {
        setQuestionNumber((n) => n + 1);
    };

    if (authLoading || loading) {
        return <QuizPanel><p>Загрузка...</p></QuizPanel>;
    }

    if (!question || Object.keys(question).length === 0) {
        return <QuizPanel><p>Вопросы закончились!</p></QuizPanel>;
    }

    return (
        <QuizPanel title={`Вопрос ${questionNumber}`}>
            <p className="mb-4">{question.questionText}</p>
            
            <div className="options-list">
                {question.options.map((option) => (
                    <QuestionOption
                        option={option}
                        setSelectedOption={setSelectedOption}
                        selectedOption={selectedOption}
                    />
                ))}
            </div>

            <button
                className="btn btn-primary mt-4"
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
            >
                Следующий вопрос
            </button>
        </QuizPanel>
    );
}
