'use strict';
/* global $ */

const questions = [
  {number: 1, 
    text: 'Where is a shrimp\'s heart located?', 
    answers:['In its head', 'In its tail', 'In its body', 'In its legs'], 
    correct: 0},
  {number: 2, 
    text: 'How many noses does a slug have?', 
    answers: ['3', '1', '12','4'], 
    correct: 3},
  {number: 3, 
    text: 'What is a rhinoceros\' horn made of?', 
    answers: ['bone', 'hair', 'rock', 'skin'], 
    correct: 1},
  {number: 4, 
    text: 'How many glasses of milk can a cow produce in its lifetime?', 
    answers: ['There is not limit', '500,000', '5', '200,000'], 
    correct: 3},
  {number: 5, text: 'How loud is a sperm whale\'s echolocation?', 
    answers: ['As loud as a car horn', 'As loud as a lawn mower', 'As loud as a whisper','As loud as a rocket launch'], 
    correct: 3},
];

const STORE = {
  currentView: 'home',
  userAnswer: 'null',
  currentQuestion: 'null',
  score: 0,
};

function render(){
  clearAllForms();
  // check current view (home, question, question-results, results) and runs correct render function
  if(STORE.currentView === 'home'){
    console.log('rendering home view');
    renderHomeView();
  } else if(STORE.currentView === 'question'){
    console.log('rendering question view');
    renderQuestionView();
  }
  else if(STORE.currentView === 'question-results'){
    console.log('rendering question-results view');
    renderQuestionResults();
  } else if (STORE.currentView === 'end-results'){
    console.log('this is the end');
    renderResults();
  }
}

function renderHomeView(){
  // clearAllForms();
  $('.home').html(generateHomeView());
  // update HTML based on STORE
}

function renderQuestionView(){
  $('.question').html(generateHtmlText());
}

function renderQuestionResults(){
  $('.question-results').html(generateHtmlText());
  if(checkAnswer()){
    STORE.score++;
    renderCorrect();
  } else {
    renderIncorrect();
  }
  $('input[type=radio]').attr('disabled', true);
}

function renderResults(){
  // update HTML based on STORE
  console.log('rendering final results page');
  $('.end-results').html(generateEndResultsHtml());
}

function clearAllForms(){
  $('.home').empty();
  $('.question-results').empty();
  $('.question').empty();
  $('.end-results').empty();
}

function generateHomeView(){
  return `
  <div class="row">
  <div class="col-12">
  <h1 role="header">Animal quiz!</h1>
  <form class = 'js-start-quiz'>
      <button type="submit" id = 'start-button'>Start Quiz</button>
  </form>
  </div>
  </div>`;
}

function generateHtmlText(){
  return  ` 
  <div class="row">
    <div class="col-12">
      <h1> Question ${STORE.currentQuestion + 1}</h1>
      <p> Your current score is ${STORE.score} out of ${STORE.currentView === 'question' ? STORE.currentQuestion : STORE.currentQuestion + 1} </p>
      <div class = 'questionBox'>
        <h2> ${questions[STORE.currentQuestion].text}</h2>
        <form class = "${STORE.currentView === 'question' ? 'js-question' : 'js-question-results-form'}">
          <input type="radio" name="question" value="1" id="option1" data-index = 0 required> 
          <label for ="option1" id = 'label0'> ${questions[STORE.currentQuestion].answers[0]}</label> <br>
          <input type="radio" name="question" value="2" id="option2" data-index = 1 > 
          <label for = 'option2' id = 'label1'>${questions[STORE.currentQuestion].answers[1]}</label><br>
          <input type="radio" name="question" value="3" id="option3" data-index = 2> 
          <label for="option3" id = 'label2'>${questions[STORE.currentQuestion].answers[2]}</label><br>
          <input type="radio" name="question" value="4" id="option4" data-index = 3> 
          <label for="option4" id = 'label3'>${questions[STORE.currentQuestion].answers[3]}</label><br>
          <button type="submit" id="btn" class = 'nextButton'>${generateButtonWord()}</button>
        </form> 
      </div>
    </div>
  </div>`;
}

function generateEndResultsHtml(){
  return `
  <div class="row">
  <div class="col-12">
  <h2>You got ${STORE.score} out of ${STORE.currentQuestion} questions right!<h2>
  <p>Want to try again?</p>
  <button id="restartBtn">Replay</button>
  </div>
  </div>`;
}

function generateButtonWord(){
  let word;
  if(STORE.currentQuestion === 4 && STORE.currentView === 'question-results') 
    word = 'View Results';
  else if(STORE.currentView === 'question-results')
    word = 'Next Question';
  else 
    word = 'View Answer';
  return word;
}

function renderIncorrect(){
  console.log('Nope');
  $(`#label${STORE.userAnswer}`).addClass('strikethrough');
  $(`#label${questions[STORE.currentQuestion].correct.toString()}`).addClass('correctAnswer');
}

function renderCorrect(){
  console.log('You did it!');
  $(`#label${questions[STORE.currentQuestion].correct.toString()}`).addClass('userCorrect');
}

function checkAnswer(){
  return STORE.userAnswer === questions[STORE.currentQuestion].correct;
}

function handleStart(){
  // update the current view to question, set current Question to 0, then render the page again. 
  $('.home').on('submit', '.js-start-quiz', function(ev){
    console.log('test');
    ev.preventDefault();
    STORE.currentView = 'question';
    STORE.currentQuestion = 0;  
    render();
  });
}

function handleQuestionSubmit(){
  // set up event listener on button, run check answer function. If question count === 4, 
  // change view to results. Otherwise, change view to question-results. 
  // Update score. Render.  
  $('.question').on('submit','.js-question', function(ev){
    ev.preventDefault();
    STORE.userAnswer = parseInt($('input:checked').attr('data-index'), 10);
    STORE.currentView = 'question-results';
    render();
  });
}

function handleNextQuestion(){
  // set up event listener on button, add 1 to current question count. Render.
  $('.question-results').on('submit', '.js-question-results-form', function(event){
    event.preventDefault();
    console.log('moving on...');
    STORE.currentQuestion++;
    if (STORE.currentQuestion === 5){
      STORE.currentView = 'end-results';
      render();
    } else{
      STORE.currentView = 'question';}
    render();
  });
}

function handleRestartClick(){
  $('.end-results').on('click', '#restartBtn', function(ev){
    ev.preventDefault();
    STORE.currentView = 'home';
    STORE.userAnswer = 'null';
    STORE.currentQuestion = 'null';
    STORE.score = 0;
    render();
  });
}

function main(){
  render();
  handleStart();
  handleQuestionSubmit();
  handleNextQuestion();
  handleRestartClick();
}

$(main);
