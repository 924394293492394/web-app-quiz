import React from 'react';
import Header from '../components/Header';
import { useCreateQuizLogic } from '../components/CreateQuizLogic';
import '../styles/CreateQuiz.css';

const CreateQuizPage = () => {
    const {
        title,
        setTitle,
        questions,
        handleQuestionChange,
        handleAnswerChange,
        handleCorrectAnswerChange,
        addQuestion,
        removeQuestion,
        addAnswer,
        removeLastAnswer,
        handleSubmit,
        resetForm,
    } = useCreateQuizLogic();

    return (
        <div>
            <Header />
            <div className="highlight-zone">
                <h1>Создание нового опроса</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Название опроса"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    {questions.map((q, index) => (
                        <div key={index} className="question-group">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Вопрос"
                                    value={q.question}
                                    onChange={(e) => handleQuestionChange(index, e)}
                                    required
                                />
                            </div>
                            {q.answers.map((answer, ansIndex) => (
                                <div key={ansIndex} className="answer-group form-group">
                                    <input
                                        type="text"
                                        placeholder={`Ответ ${ansIndex + 1}`}
                                        value={answer}
                                        onChange={(e) => handleAnswerChange(index, ansIndex, e)}
                                        required
                                    />
                                </div>
                            ))}
                            <div className="form-group allow" width="0%">
                                <label>Правильный ответ:</label>
                                <select value={q.correctAnswer} onChange={(e) => handleCorrectAnswerChange(index, parseInt(e.target.value))}>
                                    {q.answers.map((_, ansIndex) => (
                                        <option key={ansIndex} value={ansIndex}>
                                            {`Ответ ${ansIndex + 1}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group buttons-group">
                                <button type="button" onClick={() => removeLastAnswer(index)}>
                                    Удалить последний ответ
                                </button>
                                <button type="button" onClick={() => addAnswer(index)}>
                                    Добавить ответ
                                </button>
                                <button type="button" onClick={() => removeQuestion(index)}>
                                    Удалить вопрос
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="form-group buttons-group">
                        <button type="button" onClick={addQuestion}>
                            Добавить вопрос
                        </button>
                        <button type="button" onClick={resetForm}>
                            Очистить форму
                        </button>
                        <button type="submit">
                            Создать опрос
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateQuizPage;
