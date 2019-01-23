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
  // check current view (home, question, question-results, results) and runs correct render function
  if(STORE.currentView === 'home'){
    console.log('rendering home view');
    renderHomeView();
  } else if(STORE.currentView === 'question'){
    console.log('rendering question view');
    $('.question').html(renderQuestionView());
    if(STORE.currentQuestion === 4){
      $('#btn').prop('value', 'View Results');
    }
  }
  else if(STORE.currentView === 'question-results'){
    console.log('rendering question-results view');
    $('.question-results').html(generateQuestionResults());
    renderQuestionResults();
  } else if (STORE.currentView === 'end-results'){
    console.log('this is the end');
    renderResults();
  }
}


function renderHomeView(){
  // update HTML based on STORE
}

function renderQuestionView(){
  // update HTML based on STORE. Display that value +1 to the user.
  $('.home').empty();
  $('.question-results').empty();

  return ` 
  <h2> Question: ${STORE.currentQuestion + 1}</h2>
  <p> Your current score is ${STORE.score} out of ${STORE.currentQuestion}</p>
  <h2> ${questions[STORE.currentQuestion].text}</h2>
  <form class = 'js-question'>
    <input type="radio" name="question" value="1" id="option1" data-index = 0 required> 
    <label for ="option1" id = 'label0'> ${questions[STORE.currentQuestion].answers[0]}</label> <br>
    <input type="radio" name="question" value="2" id="option2" data-index = 1> 
    <label for = 'option2' id = 'label1'>${questions[STORE.currentQuestion].answers[1]}</label><br>
    <input type="radio" name="question" value="3" id="option3" data-index = 2> 
    <label for="option3" id = 'label2'>${questions[STORE.currentQuestion].answers[2]}</label><br>
    <input type="radio" name="question" value="4" id="option4" data-index = 3> 
    <label for="option4" id = 'label3'>${questions[STORE.currentQuestion].answers[3]}</label><br>
   <input type="submit" id="btn" value = "Next Question">
  </form> `;
}

function generateQuestionResults(){
  $('.question').empty();
  
  return ` 
    <h2> Question: ${STORE.currentQuestion + 1}</h2>
    <p> Your current score is ${STORE.score} out of ${STORE.currentQuestion + 1}</p>
    <h2> ${questions[STORE.currentQuestion].text}</h2>
    <form class = 'js-question-results-form'>
      <input type="radio" name="question" value="1" id="option1" data-index = 0 required> 
      <label for ="option1" id = 'label0'> ${questions[STORE.currentQuestion].answers[0]}</label> <br>
      <input type="radio" name="question" value="2" id="option2" data-index = 1 > 
      <label for = 'option2' id = 'label1'>${questions[STORE.currentQuestion].answers[1]}</label><br>
      <input type="radio" name="question" value="3" id="option3" data-index = 2> 
      <label for="option3" id = 'label2'>${questions[STORE.currentQuestion].answers[2]}</label><br>
      <input type="radio" name="question" value="4" id="option4" data-index = 3> 
      <label for="option4" id = 'label3'>${questions[STORE.currentQuestion].answers[3]}</label><br>
      <button type="submit" id="btn">Next Question</button>
    </form> `;
}

function renderQuestionResults(){
  // return checkAnswer() ? renderCorrect() : renderIncorrect();

  if(checkAnswer()){
    STORE.score++;
    $('.question-results').html(generateQuestionResults());
    renderCorrect();
  } else {
    renderIncorrect();
  }
  
  $('input[type=radio]').attr('disabled', true);

  // update HTML based on STORE
  // add class highlight to correct answer
 
  // css highlight red to userAnswer && highlight correct
 
}
function renderIncorrect(){
  //STORE.userAnswer
  console.log('Nope');
  $(`#label${STORE.userAnswer}`).addClass('strikethrough');
  $(`#label${questions[STORE.currentQuestion].correct.toString()}`).addClass('correctAnswer');
}

function renderCorrect(){
  console.log('You did it!');
  $(`#label${questions[STORE.currentQuestion].correct.toString()}`).addClass('correctAnswer');
}

function renderResults(){
  // update HTML based on STORE
  console.log('rendering final results page');
  $('.home').empty();
  $('.question').empty();
  $('.question-results').empty();
  $('.end-results').html(generateEndResultsHtml());
}

function generateEndResultsHtml(){
  return `
  <h2>You got ${STORE.score} out of ${STORE.currentQuestion + 1} questions right!<h2>
  <p>Want to try again?</p>`;
}

function renderQuestion(){
  // show current question and display options to user. 
  
}

function handleStart(){
  // update the current view to question, set current Question to 0, then render the page again. 
  $('.js-start-quiz').on('submit', function(ev){
    console.log('test');
    ev.preventDefault();
    STORE.currentView = 'question';
    STORE.currentQuestion = 0;  
    render();
  });
}

function currentQuestionCount(){
  // check Store for currentQuestion.  
  return STORE.currentQuestion;
}

function handleQuestionSubmit(){
  // set up event listener on button, run check answer function. If question count === 4, 
  // change view to results. Otherwise, change view to question-results. 
  // Update score. Render.  
  $('.question').on('submit','.js-question', function(ev){
    ev.preventDefault();
    STORE.userAnswer = parseInt($('input:checked').attr('data-index'), 10);
    STORE.currentView = 'question-results';
    console.log(STORE.userAnswer);
    if(STORE.currentQuestion === 4){
      STORE.currentView = 'end-results';
    }
    render();
  });
}
function handleFinalResults(){
  $('.question').on('submit', '#btn', function(ev){
    ev.preventDefault();
    console.log('handled final');
    render();
  });
}

function checkAnswer(){
  return STORE.userAnswer === questions[STORE.currentQuestion].correct;

  // if(STORE.userAnswer === questions[STORE.currentQuestion].correct){
  // STORE.score++;
  //   return true;
  // } else {
  //   return false;
  // }
}

function handleNextQuestion(){
  // set up event listener on button, add 1 to current question count. Render.
  $('.question-results').on('submit', '.js-question-results-form', function(event){
    event.preventDefault();
    console.log('moving on...');
    STORE.currentQuestion++;
    if (STORE.currentQuestion === 5){
      STORE.currentView = 'results';
    } else{
      STORE.currentView = 'question';}
    render();
  });
}

// function handleRestart(){
//   // Set STORE back to default, then render the page again. 
//   // run currentQuestionCount();
//   STORE.currentView = 'home';
//   STORE.userAnswer = 'null';
//   STORE.currentQuestion = 'null';
//   STORE.score = 0;
//   render();
// }

function main(){
  render();
  handleStart();
  currentQuestionCount();
  renderQuestion();
  handleQuestionSubmit();
  handleNextQuestion();
  handleFinalResults();
}

$(main);
///comment
