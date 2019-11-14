
//variables to store the quiz score and question number information

let score = 0;
let questionNumber = 0;


function updateScore() {
  score++;
  $('.score').text(score);
}

function incrementQuestionNumber() {
  return questionNumber++;
}

function questionCounter(){
  //if you need to only display the questionNumber and not
  //increment then use questionNumber variable here

  //If you need to increment and then dispaly then
  //$('.questionNumber').text(updateQuestionNumber());
  let num = STORE.questions[questionNumber].number;
  const displayHTML = $(`<span>${num}</span>`);
  $('.questionNumber').text(num);
}

/*displays the question*/
function displayQuestion() {
  let question = STORE.questions[questionNumber].question;
  
  const displayHTML = $(`<span>${question}</span>`);
  $('.question').html(displayHTML); 
}

          /*  displays choices */
function displayChoices() {
  let choices = STORE.questions[questionNumber].options;
  choices.forEach(choice => {
    $('#myForm').append(`
    <div class="deleteMe">
      <input class="my-border" type='radio' id="one" name="answer" value="${choice}">
      <label for="one"><b>${choice}</b></label>
    <div>
    `)
  })
  $('#myForm').append(`
    <button class="submit" type="submit">Submit answer</button>`
  );
}

    /*  ****************  Check if Correct  ****************  */
function checkIfCorrect() {
  let correctAnswer = STORE.questions[questionNumber].answer;
  let radioAnswer = $("input:checked").val();

  if (correctAnswer === radioAnswer) {
    $('.explanation').html("<b>correct</b>");
    //$('.explain').toggleClass("green");
    $('.score').text(updateScore());
  } else {
    $('.explanation').html("<b>incorrect</b><span>, the correct answer is: <span>").append(correctAnswer);
    //$('.explain').toggleClass("red");
  } 
}



function eventListeners(){
  /*  ****************** Submitting an answer ****************** */
 $('#myForm').on('click', '.submit', function () {
    $('.somebackground').hide();
    $('.explain').show();
    //first check if correct and *THEN* empty it, otherwise the input values will disappear and be undefined
    checkIfCorrect();
    $('#myForm').empty();
    clickNext();
 });

  /*  ****************** Selecting next ****************** */
  $('.explain').on('click', '.next', function () {
    $('.explain').hide();
    $('.somebackground').show();
    checkIfEndOfQuestions();
    displayQuestion();
  });  

  /*  ****************** START page****************** */
  $('.js-start-page').on('click', '#start', function () {
    $('.js-start-page').hide();
    $('.somebackground').show();
    $('.next').show();
    questionCounter();
    displayChoices();
    displayQuestion();
    $('header').hide();
  });

    /* clicking the RETAKE BUTTON */
  $('.finished').on('click', '.retake', function(){
    resetStats();
    resetQuiz();
    displayQuestion();
    checkIfEndOfQuestions();
  });
}

/*  ************ click NEXT  ****************   */

function clickNext() {

  incrementQuestionNumber();  
  questionCounter();
  displayChoices();
}

/* checks whether it reached the end of questions list */
    //you may!!!! may!!! increment
    //then display
    //you may only need to display?
    // console.log("QQQ " + questionNumber)
 
function checkIfEndOfQuestions() {
  if (questionNumber >= 10) {
  $('.somebackground').hide();
  $('.next').hide();
  $('.explain').hide();
  $('.finished').show();
  

      if(score > 7){
        $('.gif').append(`<p>Nice! You scored 7 or more out of 10! You are woke</p><img src="https://media.giphy.com/media/l0ExtWeslOYfGpHyw/giphy.gif">`)
      }else {
        $('.gif').append(`<p>Your score's under 7... Naive little sheeple... </p><img src="https://media.giphy.com/media/l3V0ma60jQqGCoJyM/giphy.gif">`)
      }
  //restartQuiz()
  


  }
} 

/* get document ready */
$('document').ready(function startPage() {
  // We call this function ONCE
  eventListeners();
  $('.somebackground').hide();
  $('.explain').hide();
  $('.finished').hide();
})

    /* reset stats */
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0); 
}

      /*  RESETS quiz */
function resetQuiz() { 
  $('.finished').hide();
  $('.js-start-page').show();
  $('.somebackground').hide();
  $('.explain').hide();
  $('.gif').empty();
  $('#myForm').empty(); 
  $('header').show();
}








