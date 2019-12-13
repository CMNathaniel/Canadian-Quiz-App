let questionNumber = 0;
let score = 0;

function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}


function changeQuestionNumber () {
    questionNumber ++;
    $('.questionNumber').text(questionNumber+1);
}

function changeScore () {
  score ++;
}

function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>Well done, your answer is correct!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>Sorry, you got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function updateScore () {
  changeScore();
  $('.score').text(score);
}

function renderResults () {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Way to go - you are unstoppable!</h3><img src="https://images.squarespace-cdn.com/content/v1/5be8fee0e2ccd1a47ba3bc05/1547649132092-Z4R9Z8XX7117BRRAYI62/ke17ZwdGBToddI8pDm48kLWgmx3OnjG4pGlNWwJmp8p7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USDByxNbjGcpQiLg9JJCT_3zSee_SO6HNO2rr4LgCq_djIjg7l_3EkjvTQ6EpWDFFA/Sandy+Smith+1.jpg?format=2500w" alt="moose in water"/><p>You got ${score} / 10</p><p>You would definitely be a Canadian Citizen with that knowledge!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Almost there, keep trying!</h3><img src="https://thefurbearers.com/sites/default/files/styles/full_width_680px/public/field/image/blog_post/2019-04-06-beaversmwide.jpg?itok=kqAApPwy" alt="happy beaver"/><p>You got ${score} / 10</p><p>You know quite a bit, eh?</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Time to hit the books again...</h3><img src="https://communities-wcmimages-cache.prod.postmedia.digital/images?url=https://nexus.prod.postmedia.digital/wp-content/uploads/2019/11/SU.1114-su-snow-10.jpg&w=302&h=226" alt="snow plow"/><p>You got ${score} / 10</p><p>Don't give up, time to learn more. </p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);
