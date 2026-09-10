const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => menu.classList.remove("open"));
});

document.querySelectorAll(".answer-btn").forEach(button => {
  button.addEventListener("click", () => {
    const feedback = document.getElementById("quickFeedback");
    const isCorrect = button.dataset.answer === "correct";

    if (isCorrect) {
      feedback.textContent = "✓ Correcto. La cantidad de pedidos se cuenta y solo puede tomar valores enteros no negativos.";
      feedback.style.color = "var(--success)";
    } else {
      feedback.textContent = "✗ No es continua. La cantidad de pedidos se obtiene mediante un conteo.";
      feedback.style.color = "var(--danger)";
    }
  });
});

const tabButtons = document.querySelectorAll(".tab-btn");
const codePanels = document.querySelectorAll(".code-panel");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    codePanels.forEach(panel => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

const quiz = document.getElementById("quiz");
const quizResult = document.getElementById("quizResult");
const resetQuiz = document.getElementById("resetQuiz");

quiz.addEventListener("submit", event => {
  event.preventDefault();

  const questions = [...document.querySelectorAll(".question")];
  let score = 0;
  let answered = 0;

  questions.forEach((question, index) => {
    question.classList.remove("correct", "incorrect");

    const selected = document.querySelector(`input[name="q${index + 1}"]:checked`);
    if (!selected) return;

    answered++;

    if (selected.value === question.dataset.correct) {
      score++;
      question.classList.add("correct");
    } else {
      question.classList.add("incorrect");
    }
  });

  if (answered < questions.length) {
    quizResult.textContent = `Respondiste ${answered} de ${questions.length} preguntas. Completá todas para obtener el resultado final.`;
    quizResult.style.color = "var(--accent-2)";
    return;
  }

  const percent = Math.round((score / questions.length) * 100);

  if (percent === 100) {
    quizResult.textContent = `¡Excelente! ${score}/${questions.length} respuestas correctas (${percent} %). Completaste el recorrido con éxito.`;
    quizResult.style.color = "var(--success)";
  } else if (percent >= 60) {
    quizResult.textContent = `Muy bien: ${score}/${questions.length} respuestas correctas (${percent} %). Podés revisar los módulos para reforzar conceptos.`;
    quizResult.style.color = "var(--accent-2)";
  } else {
    quizResult.textContent = `Obtuviste ${score}/${questions.length} respuestas correctas (${percent} %). Te conviene repasar los módulos antes de reintentar.`;
    quizResult.style.color = "var(--danger)";
  }
});

resetQuiz.addEventListener("click", () => {
  quiz.reset();
  document.querySelectorAll(".question").forEach(q => q.classList.remove("correct", "incorrect"));
  quizResult.textContent = "";
});
