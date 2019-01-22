'use strict';
/* global $ */

const questions = [
  {number: 1, text: 'Where is a shrimp\'s heart located?', answers:[
    'In its head', 'In its tail', 'In its body', 'In its legs'], correct: 0},
  {number: 2, text: 'How many noses does a slug have?', answers: [
    '3', '1', '12','4'], correct: 3},
  {number: 3, text: 'What is a rhinoceros\' horn made of?', answers: 
  ['bone', 'hair', 'rock', 'skin'], correct: 1},
  {number: 4, text: 'How many glasses of milk can a cow produce in its lifetime?', answers: [
    'There is not limit', '500,000', '5', '200,000'], correct: 3},
  {number: 5, text: 'How loud is a sperm whale\'s echolocation?', answers: [
    'As loud as a car horn', 'As loud as a lawn mower', 'As loud as a whisper','As loud as a rocket launch'], correct: 3},
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
    renderHomeView();
  } else if(STORE.currentView === 'question'){
    renderQuestionView();
  }
  else if(STORE.currentView === 'question-results'){
    renderQuestionResults();
  }
  else { 
    renderResults();
  }
}

function renderHomeView(){
  // update HTML based on STORE
}

function renderQuestionView(){
  // update HTML based on STORE. Display that value +1 to the user.
  return ` 
  <form class = 'js-question'>
    <input type="radio" name="question" value="1" id="option1" data-index = 0> 
    <label for ="option1"> ${question[STORE.currentQuestion].answer[0]}</label> <br>
    <input type="radio" name="question" value="2" id="option2" data-index = 1> 
    <label for = 'option2'>${question[STORE.currentQuestion].answer[1]}</label><br>
    <input type="radio" name="question" value="3" id="option3" data-index = 2> 
    <label for="option3">${question[STORE.currentQuestion].answer[2]}</label><br>
    <input type="radio" name="question" value="3" id="option4" data-index = 3> 
    <label for="option4">${question[STORE.currentQuestion].answer[3]}</label><br>
   <button type="submit">Submit answer</button>
  </form> `;
}

function renderQuestionResults(){
  return checkAnswer() ? renderCorrect() : renderIncorrect();
  // update HTML based on STORE
  // add class highlight to correct answer
 
  // css highlight red to userAnswer && highlight correct
 
}
function renderIncorrect(){

}

function renderCorrect(){

}

function renderResults(){
  // update HTML based on STORE
}

function renderQuestion(){
  // show current question and display options to user. 
  
}

function handleStart(){
  // update the current view to question, set current Question to 0, then render the page again. 
  STORE.currentView = 'question';
  STORE.currentQuestion = 0;  
  render();
}

function currentQuestionCount(){
  // check Store for currentQuestion.  
  return STORE.currentQuestion;
}

function handleQuestionSubmit(){
  // set up event listener on button, run check answer function. If question count === 4, 
  // change view to results. Otherwise, change view to question-results. 
  // Update score. Render.  
  $('input[type="radio"]').submit(function(ev){
    ev.preventDefault();
    STORE.userAnswer = $(this).attr('data-index');
    STORE.currentView = 'question-results';
    render();
  });
}


function checkAnswer(){
  if(STORE.userAnswer === questions[STORE.currentQuestion].correct){
    STORE.score++;
    return true;
  } else {
    return false;
  }
}

function handleNextQuestion(){
  // set up event listener on button, add 1 to current question count. Render.
  $().on('next_question', function(ev){
    STORE.currentQuestion++;
    STORE.currentView = 'question';
    render();
  });
  
}

function handleRestart(){
  // Set STORE back to default, then render the page again. 
  // run currentQuestionCount();
  STORE.currentView = 'home';
  STORE.userAnswer = 'null';
  STORE.currentQuestion = 'null';
  STORE.score = 0;
  render();
}

function main(){
  render();
  // handleStart();
  currentQuestionCount();
  renderQuestion();
  handleQuestionSubmit();

}

$(main());
