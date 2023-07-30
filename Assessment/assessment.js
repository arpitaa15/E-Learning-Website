const questions = [
    {
    question: "HTML stands for ",
    answers:[
        {text: "Hypermark Language", correct: false},
        {text: "Hypermix language", correct: false},
        {text: "Hypertext Markup Language", correct: true},
        {text: "Hypertension Language", correct: false},
      ]
    },
    {
    question: "How can a datatype be declared to be a constant type?",
    answers:[
        {text: "const", correct: true},
        {text:"var", correct: false},
        {text: "let", correct: false},
        {text: "constant", correct: false},
      ]
    },
    {
    question: "Which keyword is used to declare variables in javascript.",
    answers:[
        {text: "Var", correct: true},
        {text: "Dim", correct: false},
        {text: "String", correct: false},
        {text: "None of the above", correct: false},
      ]
    },
    {
    question: "What keyword is used to check whether a given property is valid or not?",
    answers:[
        {text: "in", correct: true},
        {text: "is in", correct: false},
        {text: "exists", correct: false},
        {text: "lies", correct: false},
      ]
    },
    {
    question: "Javascript is a/an",
    answers:[
        {text: "Object-Oriented", correct: true},
        {text: "Object-Based", correct: false},
        {text: "Procedural", correct: false},
        {text: "None of the above", correct: false},
      ]
    }
  ];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("buttons");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  })
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `Total score : ${score}/${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();