// Ładowanie paska nawigacji
document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
});

function loadNavbar() {
    fetch('pasek.html')
        .then(response => response.text())
        .then(html => {
            const navbar = document.createElement('div');
            navbar.innerHTML = html;
            document.body.insertBefore(navbar, document.body.firstChild);
        })
        .catch(error => console.error('Błąd ładowania paska nawigacji:', error));
}

function showTest(testId) {
    // Ukryj wszystkie testy
    document.querySelectorAll('.quiz-section').forEach(section => {
        section.style.display = 'none';
    });
    // Pokaz wybrany test
    document.getElementById(testId).style.display = 'block';

    // Pokaz wynik od razu po wyborze arkusza (jesli istnieje pole wyniku)
    const testSection = document.getElementById(testId);
    const resultElement = testSection.querySelector('[id^="result-test"]');
    if (resultElement) {
        countCorrectAnswers(testId, resultElement.id);
    }
}

function checkAnswer(zadanieGroup, correctValue, resultId) {
    const selected = document.querySelector(`input[name="${zadanieGroup}"]:checked`);
    const resultElement = resultId ? document.getElementById(resultId) : null;

    document.querySelectorAll(`input[name="${zadanieGroup}"]`).forEach(input => {
        const label = input.closest("label");
        const oldFeedback = label ? label.querySelector(".answer-feedback") : null;
        if (oldFeedback) {
            oldFeedback.remove();
        }
    });

    if (!selected) {
        if (resultElement) {
            resultElement.textContent = "Wybierz odpowiedź.";
        }
        return;
    }

    if (resultElement) {
        resultElement.textContent = "";
    }

    const feedback = document.createElement("span");
    feedback.classList.add("answer-feedback");

    if (selected.value === correctValue) {
        feedback.classList.add("correct");
        feedback.textContent = " - Poprawna odpowiedź";
    } else {
        feedback.classList.add("incorrect");
        feedback.textContent = " - Błędna odpowiedź";
    }

    const selectedLabel = selected.closest("label");
    if (selectedLabel) {
        selectedLabel.appendChild(feedback);
    }
}

function checkCompoundAnswer(groupA, correctValueA, groupB, correctValueB, resultId) {
    checkAnswer(groupA, correctValueA);
    checkAnswer(groupB, correctValueB);

    const selectedA = document.querySelector(`input[name="${groupA}"]:checked`);
    const selectedB = document.querySelector(`input[name="${groupB}"]:checked`);
    const resultElement = document.getElementById(resultId);

    if (!resultElement) {
        return;
    }

    resultElement.classList.remove("correct", "incorrect");

    if (!selectedA || !selectedB) {
        resultElement.textContent = "Wybierz odpowiedz i wyjasnienie.";
        return;
    }

    if (selectedA.value === correctValueA && selectedB.value === correctValueB) {
        resultElement.textContent = "Poprawne rozwiazanie.";
        resultElement.classList.add("correct");
    } else {
        resultElement.textContent = "Bledne rozwiazanie.";
        resultElement.classList.add("incorrect");
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
    resultElement.textContent = `Wynik: ${correctCount}/${questionGroups.size} .`;
}


function markAnswers(testId) {
    const testSection = document.getElementById(testId);
    if (!testSection) {
        return;
    }

    testSection.querySelectorAll(".answer-feedback").forEach(el => el.remove());

    testSection.querySelectorAll("input[type=\"radio\"]:checked").forEach(input => {
        const label = input.closest("label");
        if (!label) {
            return;
        }

        const feedback = document.createElement("span");
        feedback.classList.add("answer-feedback");

        if (input.value === "correct") {
            feedback.classList.add("correct");
            feedback.innerHTML = " &check;";
        } else {
            feedback.classList.add("incorrect");
            feedback.innerHTML = " &times;";
        }

        label.appendChild(feedback);
    });
}

function checkAllAnswers(answerKeys, resultId) {
    const resultElement = document.getElementById(resultId);
    if (!resultElement) {
        return;
    }

    let allAnswered = true;
    let allCorrect = true;

    answerKeys.forEach(({ group, correct }) => {
        checkAnswer(group, correct);
        const selected = document.querySelector(`input[name="${group}"]:checked`);
        if (!selected) {
            allAnswered = false;
            allCorrect = false;
            return;
        }
        if (selected.value !== correct) {
            allCorrect = false;
        }
    });

    resultElement.classList.remove("correct", "incorrect");

    if (!allAnswered) {
        resultElement.textContent = "Wybierz wszystkie odpowiedzi.";
        return;
    }

    if (allCorrect) {
        resultElement.textContent = "Poprawne rozwiazanie.";
        resultElement.classList.add("correct");
    } else {
        resultElement.textContent = "Bledne rozwiazanie.";
        resultElement.classList.add("incorrect");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#test1 .zadanie").forEach(zadanie => {
        const button = zadanie.querySelector(".show-solution-button");
        const solution = zadanie.querySelector(".solution");

        if (!button || !solution) {
            return;
        }

        button.addEventListener("click", () => {
            solution.style.display = "block";
        });
    });
});
