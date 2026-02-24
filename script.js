function showTest(testId) {
    // Ukryj wszystkie testy
    document.querySelectorAll('.quiz-section').forEach(section => {
        section.style.display = 'none';
    });
    // Pokaż wybrany test
    document.getElementById(testId).style.display = 'block';
}

function checkAnswer(groupName, correctValue, resultId) {
    const selected = document.querySelector(`input[name="${groupName}"]:checked`);

    const resultElement = document.getElementById(resultId);
    if (selected.value === correctValue) {
        resultElement.textContent = "Poprawnie";
    } else {
        resultElement.textContent = "Błędnie";
    }
}

// chat AI:
// użyj funkcji checkAnswer() w pliku index.html, żeby sprawdzić czy wybrana odpowiedź na pytanie jest prawidłowa