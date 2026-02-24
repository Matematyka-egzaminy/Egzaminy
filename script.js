function showTest(testId) {
    // Ukryj wszystkie testy
    document.querySelectorAll('.quiz-section').forEach(section => {
        section.style.display = 'none';
    });
    // Pokaż wybrany test
    document.getElementById(testId).style.display = 'block';
}
