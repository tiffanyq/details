const BASE_URL = "tiffanyq.github.io/details/?"
const NUM_QUESTIONS = 10;
const MIN_EMOJI_SIZE = 10;
const EMOJI_MULTIPLIER = 28;
const EMOJIS = ["🐝","🌸","🫶","🦋","🎉","🌿","💫"];

let tracking = {
  name: "",
  currentQuestion: 0,
  currentChoice: -1,
  quizSequence: ""
};

let fillInForSelf;
let senderName;
let answerKey;
let music;

function generateURLToCopy() {
  let tempURL = BASE_URL;
  return tempURL +
    "n=" +
    encodeURIComponent(tracking.name) +
    "#" +
    convertToBase32(tracking.quizSequence);
}

function selectUrl() {
  const urlToCopy = document.getElementById("link-to-copy");
  urlToCopy.select();
}

window.addEventListener("load", function(event) {
  const startButton = document.getElementById("start-button");
  const nextButton = document.getElementById("next-button");
  const enterNameNextButton = document.getElementById("enter-name-next-button");
  const choice0 = document.getElementById("choice0");
  const choice1 = document.getElementById("choice1");
  const restartButton = document.getElementById("restart-button");
  const nameField = document.getElementById("name-field");
  const urlToCopy = document.getElementById("link-to-copy");
  const musicButton = document.getElementById("music-button");
  const creditsButton = document.getElementById("credits-button");
  const videoBackground = document.getElementById("video-background");

  startButton.addEventListener('click', startQuiz, false);
  nextButton.addEventListener('click', advanceToNextQuestion, false);
  enterNameNextButton.addEventListener('click', advanceFromEnterNameToQuiz, false);
  choice0.addEventListener('click', highlightChoice0, false);
  choice1.addEventListener('click', highlightChoice1, false);
  restartButton.addEventListener('click', restartQuiz, false); 	
  nameField.addEventListener('input', showEnterNameNextButton, false);
  urlToCopy.addEventListener('click', selectUrl, false);
  musicButton.addEventListener('click', toggleMusic, false);
  creditsButton.addEventListener('click', showCredits, false);
  document.body.addEventListener('click', closeCredits, true);
  videoBackground.addEventListener("click", createEmoji); // stamping
  const queryString = window.location.search;
  const param = new URLSearchParams(queryString);
  let name = param.get('n');
  answerKey = window.location.hash.substring(1);
  if (name && answerKey) {
    fillInForSelf = false;
    answerKey = convertToBase2(answerKey).toString();
    if (answerKey.length < NUM_QUESTIONS) {
      const originalLength = answerKey.length;
      for (let i = 0; i < NUM_QUESTIONS - originalLength; i++) {
        answerKey = "0" + answerKey;
      }
    }
    senderName = decodeURIComponent(name);
    document.getElementById("quiz-start-sent-link").style.display = "block";
    document.querySelectorAll('.sender-name').forEach(function(n) {
      n.innerText = senderName + "'s";
    });
  } else {
    fillInForSelf = true;
    document.getElementById("quiz-start").style.display = "block"; // get correct start screen
  }

  // music
  music = new Audio('music.mp3');
  music.loop = true;
});

/* starts quiz when "next" is selected */
function startQuiz() {
  if (fillInForSelf) {
    enterName();
  } else {
    const startMenu = document.getElementById("quiz-start-sent-link");
    const startButton = document.getElementById("start-button");
    const nextButton = document.getElementById("next-button");
    const quizPlayArea = document.getElementById("quiz-play");
    startMenu.style.display = "none";
    startButton.style.display = "none";
    nextButton.style.display = "block";
    quizPlayArea.style.display = "block";
    // advance count
    tracking.currentQuestion++;
    const counter = document.getElementById("counter");
    const c = document.getElementById("count-number");
    counter.style.display = "block";
    c.innerText = tracking.currentQuestion;
    changeQuestion();
    hideVisibility(document.getElementById("next-button"));
  }
}

/* self quiz flow */
/* moves user to enter name screen */
function enterName() {
  const startMenu = document.getElementById("quiz-start");
  const startButton = document.getElementById("start-button");
  const enterName = document.getElementById("enter-name");
  const enterNameNextButton = document.getElementById("enter-name-next-button");

  startMenu.style.display = "none";
  startButton.style.display = "none";
  enterName.style.display = "block";
  enterNameNextButton.style.display = "block";
  hideVisibility(enterNameNextButton);
}

function showEnterNameNextButton(e) {
  const enterNameNextButton = document.getElementById("enter-name-next-button");
  if (e.target.value.length > 0) {
    showVisibility(enterNameNextButton);
  } else {
    hideVisibility(enterNameNextButton);
  }
}

function advanceFromEnterNameToQuiz() {
  const enterNameNextButton = document.getElementById("enter-name-next-button");
  const enterName = document.getElementById("enter-name");
  const nextButton = document.getElementById("next-button");
  const quizPlayArea = document.getElementById("quiz-play");
  tracking.name = document.getElementById("name-field").value; // log name
  tracking.currentQuestion++;
  const counter = document.getElementById("counter");
  const c = document.getElementById("count-number");
  counter.style.display = "block";
  c.innerText = tracking.currentQuestion;
  enterName.style.display = "none";
  enterNameNextButton.style.display = "none";
  nextButton.style.display = "block";
  quizPlayArea.style.display = "block";
  changeQuestion();
  hideVisibility(document.getElementById("next-button"));
}

function advanceToNextQuestion() {
  tracking.quizSequence = tracking.quizSequence + tracking.currentChoice.toString();
  if (tracking.currentQuestion === NUM_QUESTIONS) {
    endQuiz();
  } else {
    tracking.currentQuestion++;
    const c = document.getElementById("count-number");
    c.innerText = tracking.currentQuestion;
    tracking.currentChoice = -1; 
    changeQuestion();
    // update button if at final step in compare flow
    const nextButton = document.getElementById("next-button");
    if (!fillInForSelf && tracking.currentQuestion === NUM_QUESTIONS) {
      nextButton.innerHTML= "<span>check answers</span>";
    }
    hideVisibility(nextButton);
  }
}

/* changes question contents: img, descrip, choices */
function changeQuestion() {
  const img = document.getElementById("q-image");
  const counter = document.getElementById("count-number");
  const description = document.getElementById("q-description");
  const choiceLabel = document.getElementById("choice-label");
  const choice0 = document.getElementById("choice0");
  const choice1 = document.getElementById("choice1");
  const questionCount = tracking.currentQuestion;

  // replace the page's displayed content with next question's content
  const questionNumber = "q" + questionCount;
  img.src = "img/"+q_images[questionNumber]['img'];
  description.innerHTML = q_descriptions[questionNumber]; // innerHTML for <a> tags
  
  const desiredObject = q_choices[questionNumber];
  choice0.innerText = desiredObject.choice0;
  choice1.innerText = desiredObject.choice1;
  choice0.classList.remove("selected-style");
  choice1.classList.remove("selected-style");

  // animate the transitions for the content 
  hideQuestionContent(counter, img, description, choiceLabel, choice0, choice1);
  setTimeout(function() {
    animateQuestionContent(counter, img, description, choiceLabel, choice0, choice1)
  }, 1);

}

/* highlight choice */
function highlightChoice0() {
  const c0 = document.getElementById("choice0");
  const c1 = document.getElementById("choice1");
  c0.classList.add("selected-style");
  c1.classList.remove("selected-style");
  tracking.currentChoice = 0;
  showVisibility(document.getElementById("next-button"));
}

/* highlight choice */
function highlightChoice1() {
  const c0 = document.getElementById("choice0");
  const c1 = document.getElementById("choice1");
  c0.classList.remove("selected-style");
  c1.classList.add("selected-style");
  tracking.currentChoice = 1;
  showVisibility(document.getElementById("next-button"));
}

function hideVisibility(el) {
  el.style.visibility = "hidden";
  const innerSpan = el.getElementsByTagName("span")[0];
  innerSpan.classList.remove("fade-zero");
}
function showVisibility(el){
  el.style.visibility = "visible";
  const innerSpan = el.getElementsByTagName("span")[0];
  innerSpan.classList.add("fade-zero");
}

function hideQuestionContent(counter, img, description, choiceLabel, choice0, choice1) {
  counter.classList.remove("fade-zero");
  img.classList.remove("fade-static-subtle-zero");
  description.classList.remove("fade-static-zero");
  choiceLabel.classList.remove("fade-static-one");
  choice0.classList.remove("fade-static-two");
  choice1.classList.remove("fade-static-three");
}

function animateQuestionContent(counter, img, description, choiceLabel, choice0, choice1) {
  counter.classList.add("fade-zero");
  img.classList.add("fade-static-subtle-zero");
  description.classList.add("fade-static-zero");
  choiceLabel.classList.add("fade-static-one");
  choice0.classList.add("fade-static-two");
  choice1.classList.add("fade-static-three");
}

function endQuiz() {
  const c = document.getElementById("counter");
  c.style.display = "none";
  if (fillInForSelf) {
    showLinkToCopy();
  } else {
    showCompareScreen();
  }
}

function showLinkToCopy() {
  const quizScreen = document.getElementById("quiz-play")
  const copyScreen = document.getElementById("quiz-end-copy");
  const nextButton = document.getElementById("next-button");
  const restartButton = document.getElementById("restart-button");
  const linkToCopy = document.getElementById("link-to-copy");
  quizScreen.style.display = "none";
  copyScreen.style.display = "block";
  nextButton.style.display = "none";
  restartButton.style.display = "block";
  // update URL to copy
  linkToCopy.value = generateURLToCopy();
}

function showCompareScreen() {
  const quizScreen = document.getElementById("quiz-play")
  const nextButton = document.getElementById("next-button");
  const restartButton = document.getElementById("restart-button");
  const compareScreen = document.getElementById("quiz-end-results");
  quizScreen.style.display = "none";
  compareScreen.style.display = "block";
  nextButton.style.display = "none";
  restartButton.style.display = "block";
  restartButton.innerHTML= "<span>make your own</span>";

  // populate comparison screen with answers
  for (let i = 0; i < NUM_QUESTIONS; i++) {
    createQuestion(i+1,answerKey[i].toString(), tracking.quizSequence[i].toString());
  }
  // score the quiz
  const numCorrectAnswers = document.getElementById("num-correct-answers");
  let score = 0;
  for (let i = 0; i < NUM_QUESTIONS; i++) {
    if (answerKey[i].toString() === tracking.quizSequence[i].toString()) {
      score++;
    }
  }
  numCorrectAnswers.innerText = score;
}

/* restarts quiz when you press the restart button;
resets score and question counts */
function restartQuiz() {
  const startMenu = document.getElementById("quiz-start");
  const compareScreen = document.getElementById("quiz-end-results");
  const linkCopyScreen = document.getElementById("quiz-end-copy");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const nextButton = document.getElementById("next-button");
  
  compareScreen.style.display = "none";
  linkCopyScreen.style.display = "none";
  restartButton.style.display = "none";
  startMenu.style.display = "block";
  startButton.style.display = "block";

  // reset quiz values
  tracking.name = "";
  tracking.currentQuestion = 0;
  tracking.currentChoice = -1;
  tracking.quizSequence = "";
  nextButton.innerHTML= "<span>next</span>";
  restartButton.innerHTML= "<span class='fade-two'>restart</span>";
  const c = document.getElementById("count-number");
  c.innerText = tracking.currentQuestion;
  const n = document.getElementById("name-field");
  n.value = "";
  // restarting quiz should only send user to self flow
  fillInForSelf = true;
  document.querySelectorAll('.self-name').forEach(function(selfName) {
    selfName.innerText = "your";
  });
}

function convertToBase32(a) {
  return parseInt(a,2).toString(32);
}

function convertToBase2(a) {
  return parseInt(a,32).toString(2);
}

function createQuestion(questionNumber, senderAnswer, receiverAnswer) {
  questionNumber = "q" + questionNumber.toString();
  const compareQuestionUnit = document.createElement("div");
  compareQuestionUnit.classList.add("compare-question-unit");
  const img = document.createElement("img");
  img.src = "img/"+q_images[questionNumber]['img'];
  compareQuestionUnit.appendChild(img);
  // question
  const description = document.createElement("p");
  description.classList.add("question-text");
  description.innerHTML = q_descriptions[questionNumber]; // innerHTML for <a> tags
  compareQuestionUnit.appendChild(description);
  // name's answer:
  const choiceLabel = document.createElement("span");
  choiceLabel.classList.add("choice-label-style");
  choiceLabel.innerText = senderName + "'s answer:";
  compareQuestionUnit.appendChild(choiceLabel);
  const option1 = document.createElement("span");
  const symbol1 = document.createElement("span");
  const choice1Text = document.createElement("span");
  choice1Text.innerText = q_choices[questionNumber]['choice0'];
  const option2 = document.createElement("span");
  const symbol2 = document.createElement("span");
  const choice2Text = document.createElement("span");
  choice2Text.innerText = q_choices[questionNumber]['choice1'];
  let oRight, sRight, tRight, oWrong, sWrong, tWrong;
  // style the correct answer
  if (senderAnswer === "0") {
    option1.classList.add("compare-row-correct");
    option1.ariaLabel = "correct answer";
    symbol1.classList.add("material-symbols-outlined");
    symbol1.classList.add("correct");
    symbol1.innerText = "check";
    option1.appendChild(symbol1);
    option1.appendChild(choice1Text);
  } else {
    option2.classList.add("compare-row-correct");
    option2.ariaLabel = "correct answer";
    symbol2.classList.add("material-symbols-outlined");
    symbol2.classList.add("correct");
    symbol2.innerText = "check";
    option2.appendChild(symbol2);
    option2.appendChild(choice2Text);
  }
  // change style depending if receiver answer matches or not
  if (senderAnswer === receiverAnswer) {
    if (senderAnswer === "0") {
      option2.classList.add("compare-row-neutral");
      option2.appendChild(choice2Text);
    } else {
      option1.classList.add("compare-row-neutral");
      option1.appendChild(choice1Text);
    }
  } else {
    if (senderAnswer === "0") {
      option2.classList.add("compare-row-incorrect");
      option2.ariaLabel = "incorrect answer";
      symbol2.classList.add("material-symbols-outlined");
      symbol2.classList.add("incorrect");
      symbol2.innerText = "close";
      choice2Text.innerHTML = q_choices[questionNumber]['choice1'] + "<span class='incorrect'> (your answer)</span>";
      option2.appendChild(symbol2);
      option2.appendChild(choice2Text);
    } else {
      option1.classList.add("compare-row-incorrect");
      option1.ariaLabel = "incorrect answer";
      symbol1.classList.add("material-symbols-outlined");
      symbol1.classList.add("incorrect");
      symbol1.innerText = "close";
      choice1Text.innerHTML = q_choices[questionNumber]['choice0'] + "<span class='incorrect'> (your answer)</span>";
      option1.appendChild(symbol1);
      option1.appendChild(choice1Text);
    }
  }
  compareQuestionUnit.appendChild(option1);
  compareQuestionUnit.appendChild(option2);
  // add animations
  img.classList.add("fade-static-subtle-zero");
  description.classList.add("fade-static-zero");
  choiceLabel.classList.add("fade-static-one");
  option1.classList.add("fade-static-two");
  option2.classList.add("fade-static-three");
  // then add it to the dom
  const compareQuestions = document.getElementById("compare-questions");
  compareQuestions.appendChild(compareQuestionUnit);
}

function toggleMusic() {
  const mb = document.getElementById("music-button");
  const mn = mb.querySelectorAll("span")[0];
  const label = mb.querySelectorAll("span")[1];
  if (mn.innerText === "music_off") {
    mn.innerText = "music_note";
    mn.classList.add("music-on");
    mb.ariaLabel = "turn music off";
    label.classList.add("music-on");
    label.innerText = "turn music off";
    music.play();
  } else {
    mn.innerText = "music_off";
    mn.classList.remove("music-on");
    mb.ariaLabel = "turn music on";
    label.innerText = "turn music on";
    label.classList.remove("music-on");
    music.pause();
  }
}

function showCredits() {
  document.getElementById("credits").style.display = "block";
}

function closeCredits(e) {
  const c = document.getElementById("credits");
  if (c.style.display === "block") {
    if (e.target.classList.contains("credits-element")) {
      return;
    } else {
      c.style.display = "none";
    }
  }
}

// stamping emojis
class Emoji {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = MIN_EMOJI_SIZE + Math.floor(Math.random() * EMOJI_MULTIPLIER);
    this.emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  }

  render() {
    const b = document.body;
    const emojiElement = document.createElement("div");
    emojiElement.innerText = this.emoji;
    emojiElement.style.position = "fixed";
    emojiElement.style.fontSize = this.size + "px";
    emojiElement.style.color = "#ffffff";
    emojiElement.style.userSelect = "none";
    emojiElement.style.left = this.x.toString() + "px";
    emojiElement.style.top = this.y.toString() + "px";
    b.appendChild(emojiElement);
  }
}

function createEmoji(e) {
  const h = new Emoji(e.clientX, e.clientY);
  h.render();
}