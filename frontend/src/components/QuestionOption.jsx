export default function QuestionOption({option, selectedOption, setSelectedOption}) {
    const classList = 'question-option ' + (selectedOption === option.optionId ? 'selected' : '');
    return (
        <div key ={option.optionId} className={classList} onClick={() => setSelectedOption(option.optionId)}>
            {option.optionText}
        </div>
    );
}
