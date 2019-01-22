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

