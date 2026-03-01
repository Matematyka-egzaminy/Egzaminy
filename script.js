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
