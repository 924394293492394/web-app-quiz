import React from 'react';
import { useParams } from 'react-router-dom';
import { useEditQuizLogic } from '../components/EditQuizLogic';

const EditQuiz = () => {
    const { id } = useParams();
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
        handleEditSubmit,
        resetForm,
        loading,
        error
    } = useEditQuizLogic(id);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Редактирование опроса</h1>
            <form onSubmit={handleEditSubmit}>
                <input
                    type="text"
                    placeholder="Название опроса"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                {questions.map((q, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Вопрос"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(index, e)}
                            required
                        />
                        {q.answers.map((answer, ansIndex) => (
                            <div key={ansIndex}>
                                <input
                                    type="text"
                                    placeholder={`Ответ ${ansIndex + 1}`}
                                    value={answer}
                                    onChange={(e) => handleAnswerChange(index, ansIndex, e)}
                                    required
                                />
                            </div>
                        ))}
                        <label>Правильный ответ:</label>
                        <select value={q.correctAnswer} onChange={(e) => handleCorrectAnswerChange(index, parseInt(e.target.value))}>
                            {q.answers.map((_, ansIndex) => (
                                <option key={ansIndex} value={ansIndex}>
                                    {`Ответ ${ansIndex + 1}`}
                                </option>
                            ))}
                        </select>
                        <br />
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
                ))}
                <button type="button" onClick={addQuestion}>
                    Добавить вопрос
                </button>
                <button type="submit">
                    Сохранить изменения
                </button>
                <button type="button" onClick={resetForm}>
                    Очистить форму
                </button>
            </form>
        </div>
    );
};

export default EditQuiz;
