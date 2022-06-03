/*
    CIT 281 Project 4
    Name: Melinda Chan
*/

const { data } = require("./p4-data.js");

// Returns an array of strings where each array element is a question
function getQuestions() {
    const qArray = [];
    for (x of data) { // loops through array properties 
        qArray.push(x.question); // pushes the question property of the array properties that are objects into empty array
    }
    return qArray;
}
// console.log(getQuestions());


// Returns an array of strings where each array element is an answer
function getAnswers() {
    const ansArray = [];
    for (x of data) {
        ansArray.push(x.answer);
    }
    return ansArray;
}
// console.log(getAnswers());


// Returns a copy of the original data array of objects.
function getQuestionsAnswers() {
// extra credit solution from site referenced in project description
    const cloneData = [...data];
    // console.log(cloneData === data);
    return cloneData;
}
// console.log(getQuestionsAnswers()); 


// Returns an object with the following properties: question, number, error 
function getQuestion(number = "") {
    number = parseInt(number);
    // console.log(number);
    if (number >= 4) {
        return { 
            error: 'Question number must be less than the number of questions (3)',
            question: '',
            number: '',
        } 
    } else if ((number >= 1) && (number <= 3)) {
        return {
            error: '',
            question: data[number - 1].question, // question number 3 is equal to position 2 in the data array which is why [number - 1]
            number: number
        }
    } else if (number === 0) {
        return {
            error: 'Question number must be >= 1',
            question: '',
            number: '',
        }
    } else {
        return {
            error: 'Question number must be an integer',
            question: '',
            number: ''
        }   
    }
}
// console.log(getQuestion(number = "3"))


// Returns an object with the following properties: answer, number, error
function getAnswer(number = "") {
  number = parseInt(number);
  // console.log(number);
  if (number >= 4) {
      return { 
          error: 'Answer number must be less than the number of questions (3)',
          answer: '',
          number: '',
      } 
  } else if ((number >= 1) && (number <= 3)) {
      return {
          error: '',
          answer: data[number - 1].answer,
          number: number
      }
  } else if (number === 0) {
      return {
          error: 'Answer number must be >= 1',
          answer: '',
          number: '',
      }
  } else {
      return {
          error: 'Answer number must be an integer',
          answer: '',
          number: ''
      }   
  }
}


// Returns an object with the following properties: question, answer, number, error
function getQuestionAnswer(number = "") {
  number = parseInt(number);
  // console.log(number);
  if (number >= 4) {
      return { 
          error: 'Question number must be less than the number of questions (3)',
          question: '',
          number: '',
      } 
  } else if ((number >= 1) && (number <= 3)) {
      return {
          error: '',
          question: data[number - 1].question,
          number: number,
          answer: data[number - 1].answer,
      }
  } else if (number === 0) {
      return {
          error: 'Question number must be >= 1',
          question: '',
          number: '',
      }
  } else {
      return {
          error: 'Question number must be an integer',
          question: '',
          number: ''
      }   
  }
}

// EXTRA CREDIT ATTEMPT
// Add new questions and answers 
function addQuestionAnswer(info = {}) {
    if (("question" in info === true) && ("answer" in info === true )) { // true if both question and answer properties exist in info parameter
        data.push(info); 
       // console.log(data);
        return { 
            error: '',
            message: 'Question added',
            number: data.length,
        } 
    } else if (("answer" in info === false) && ("question" in info === true)) {
        return {
            error: 'Object answer property required',
            message: '',
            number: -1
        }
    } else if (("answer" in info === true) && ("question" in info === false)) {
        return {
            error: 'Object question property required',
            message: '',
            number: -1
        }
    } else {
        return {
            error: 'Object question property required',
            message: '',
            number: -1,
        }   
    }
}

module.exports = {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
}
