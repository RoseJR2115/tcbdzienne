const questions = [
    {    
        question:   "Amerykański czołg M103 był produkowany w?",
        optionA:    "Los Angeles",
        optionB:    "Chicago",
        optionC:    "Detroit",
        optionD:    "San Francisco",
        correctOption: "optionC"
    },
    {    
        question:   "co było głównym czynnikiem różniącym Stinfray'a od M103?",
        optionA:    "Waga",
        optionB:    "Specjalne gąsiennice",
        optionC:    "Nowoczesna amunicja",
        optionD:    "Prędkość maksymalna",
        correctOption: "optionA",
    },
    {    
        question:   "T34 był czołgiem...",
        optionA:    "Francuskim",
        optionB:    "Polskim",
        optionC:    "Egipskim",
        optionD:    "Radzieckim",
        correctOption: "optionD",
    },
    {    
        question: "Tiger był wyposażony w lufe kalibru...",
        optionA:    "100mm",
        optionB:    "10cm",
        optionC:    "0,01m",
        optionD:    "8,8cm",
        correctOption: "optionD",
    },
    {    
        question: "Konstruktor czołgu Somua S35, opracował też...",
        optionA:    "Pierwszy komputer",
        optionB:    "Ekran dotykowy",
        optionC:    "Silnik płaski",
        optionD:    "Hamulec hydrauliczny",
        correctOption: "optionC",
    },
    {    
        question: "Czołg CHI-HA (Type-97) wyróżniał się tym ,że...",
        optionA:    "Był najmniejszym czołgiem",
        optionB:    "Był najliczniejszym czołgiem",
        optionC:    "Był najmniej licznym czołgiem",
        optionD:    "Był najszybszym czołgiem",
        correctOption:  "optionB",
    }

]


let shuffledQuestions = [] 

function handleQuestions() { 
    
    while (shuffledQuestions.length <= 5) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0


function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            
            correctOption = option.labels[0].id
        }
    })
   
    
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber <= 5) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null

   
    if (playerScore <= 3) {
        remark = "Słabo, pracuj dalej."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Wmiare dobrze, zawsze możę być lepiej."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Dobra robota."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

   
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}