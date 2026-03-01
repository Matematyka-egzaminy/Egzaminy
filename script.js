function showTest(testId) {
    // Ukryj wszystkie testy
    document.querySelectorAll('.quiz-section').forEach(section => {
        section.style.display = 'none';
    });
    // Pokaz wybrany test
    document.getElementById(testId).style.display = 'block';
}

function checkAnswer(zadanieGroup, correctValue, resultId) {
    const selected = document.querySelector(`input[name="${zadanieGroup}"]:checked`);
    const resultElement = document.getElementById(resultId);

    if (!selected) {
        resultElement.textContent = "Wybierz odpowiedz.";
        return;
    }

    if (selected.value === correctValue) {
        resultElement.textContent = "Poprawna odpowiedź";
    } else {
        resultElement.textContent = "Błędna odpowiedź";
    }
}

function countCorrectAnswers(testId, resultId) {
    const testSection = document.getElementById(testId);
    const questionGroups = new Set();
    let correctCount = 0;

    testSection.querySelectorAll('input[type="radio"]').forEach(input => {
        questionGroups.add(input.name);
    });

    questionGroups.forEach(groupName => {
        const selected = testSection.querySelector(`input[name="${groupName}"]:checked`);
        if (selected && selected.value === "correct") {
            correctCount++;
        }
    });

    const resultElement = document.getElementById(resultId);
    resultElement.textContent = `Wynik: ${correctCount}/${questionGroups.size} poprawnych odpowiedzi.`;
}
