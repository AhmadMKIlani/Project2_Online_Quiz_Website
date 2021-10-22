const submit_Button = document.querySelector('.submit-btn');
const question = document.querySelector('.question');
const allAnswers = document.querySelector('.all-answers');
const spans = document.querySelector('.spans');
const container = document.querySelector('.quiz-container');
let userAnswer;
let numOfQuestion = 0;
let right_answer;
let correct = 0;
let user_answers = [];
let right_answers = [];


loadQuestions(numOfQuestion);

function loadQuestions(number) {
    if (number < 5) {
        fetch('https://raw.githubusercontent.com/SaharZahran/Project2_Online_Quiz_Website/main/quiz_questions.json')
            .then(response => response.json())
            .then(data => {
                addQuestion(data[number]);
                createBullets(number);
                right_answer = data[numOfQuestion].right_answer;
            })
    }
}
submit_Button.addEventListener('click', () => {

    checkRightAnswer(right_answer);
    setTimeout(() => {
        console.log(numOfQuestion);
        numOfQuestion++;
        reset();
        loadQuestions(numOfQuestion);
        if (numOfQuestion > 4) {
            container.innerHTML = '';
            const result = document.createElement('p');
            result.innerHTML = `Your score is:${correct} / 5`;
            container.appendChild(result)
            console.log(user_answers);
            console.log(right_answers);
        } else {

        }
    }, 700);
})

function createBullets(numOfQuestion) {
    for (let i = 0; i < 5; i++) {
        const span = document.createElement('span');
        spans.appendChild(span);
        if (i === numOfQuestion) {
            span.classList.add('active-question');
        }
    }

}

function addQuestion(number_of_question) {

    const questionText = document.createElement('h2');
    questionText.textContent = number_of_question['Question'];
    question.appendChild(questionText);

    for (let i = 1; i <= 4; i++) {
        const answer = document.createElement('div');
        answer.classList.add('answer');
        const input = document.createElement('input');
        input.name = 'answer';
        input.type = 'radio';
        input.id = `answer${i}`;
        const label = document.createElement('label');
        label.textContent = number_of_question[`answer${i}`];
        answer.appendChild(input);
        answer.appendChild(label);
        allAnswers.appendChild(answer);
    }
}

function checkRightAnswer(correct_answer) {
    const inputAnswers = document.querySelectorAll('input');
    let userAnswer;
    inputAnswers.forEach(input => {
        if (input.checked) {
            userAnswer = input.nextElementSibling.innerHTML;
            right_answers.push(correct_answer);
            user_answers.push(userAnswer);
            storeResult();
            if (userAnswer !== correct_answer) {
                input.parentElement.style.background = 'rgba(255, 0, 0, 0.582)';
            } else {
                input.parentElement.style.background = 'rgba(0, 0, 255, 0.521)';
                correct++;
            }
        }
    })
}

function reset() {
    allAnswers.innerText = '';
    spans.innerText = '';
    question.innerText = '';
    userAnswer = '';
    right_answer = '';
}

function storeResult() {
    localStorage.setItem('user-answers', user_answers);
    localStorage.setItem('right-answers', right_answers);
}