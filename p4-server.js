/*
    CIT 281 Project 4
    Name: Melinda Chan
*/

// Import data from data file to console.log(data) for POST and addQuestionAnswer
// const { data } = require("./p4-data.js");

// Import functions from module file and fastify 
const { getQuestions, getAnswers, getQuestionsAnswers, getQuestion, getAnswer, getQuestionAnswer, addQuestionAnswer } = require("./p4-module.js")
const fastify = require("fastify")();


// /cit/question route
fastify.get("/cit/question", (request, reply) => {
    reply
        .code(200) // status code 
        .header("Content-Type", "application/json; charset=utf-8") 
        .send(
            {
                "error" : "",
                "statusCode" : reply.statusCode,
                "questions": getQuestions(),
            }
        ); 
});

// /cit/answer route
fastify.get("/cit/answer", (request, reply) => {
  reply
      .code(200) // status code 
      .header("Content-Type", "application/json; charset=utf-8") 
      .send(
          {
              "error" : "",
              "statusCode" : reply.statusCode,
              "answers": getAnswers(),
          }
      ); 
});

// /cit/questionanswer 
fastify.get("/cit/questionanswer", (request, reply) => {
  reply
      .code(200) // status code 
      .header("Content-Type", "application/json; charset=utf-8") 
      .send(
          {
              "error" : "",
              "statusCode" : reply.statusCode,
              "questions_answers": getQuestionsAnswers(),
          }
      ); 
});

// /cit/question/:number
// * how do I test when there is no parameter cit/quest
fastify.get("/cit/question/:number", (request, reply) => {
    let { number } = request.params; // how to use parseInt when number is declared with const? 
    number = parseInt(number);
    reply
        .code(200) // status code 
        .header("Content-Type", "application/json; charset=utf-8") 
        .send(
            {
                "error" : getQuestion(number).error,
                "statusCode" : reply.statusCode,
                "question": getQuestion(number).question,
                "number": getQuestion(number).number,
            }
        ); 
});

// /cit/answer/:number
fastify.get("/cit/answer/:number", (request, reply) => {
    let { number } = request.params; // how to use parseInt when number is declared with const? 
    number = parseInt(number);
    reply
        .code(200) // status code 
        .header("Content-Type", "application/json; charset=utf-8") 
        .send(
            {
                "error" : getAnswer(number).error,
                "statusCode" : reply.statusCode,
                "question": getAnswer(number).answer,
                "number": getAnswer(number).number,
            }
        ); 
});

// /cit/questionanswer/:number
fastify.get("/cit/questionanswer/:number", (request, reply) => {
    let { number } = request.params; // how to use parseInt when number is declared with const? 
    number = parseInt(number);
    reply
        .code(200) // status code 
        .header("Content-Type", "application/json; charset=utf-8") 
        .send(
            {
                "error" : getQuestionAnswer(number).error,
                "statusCode" : reply.statusCode,
                "question": getQuestionAnswer(number).question,
                "answer": getQuestionAnswer(number).answer,
                "number": getQuestionAnswer(number).number,
            }
        ); 
});

// cit/* 
fastify.get("*", (request, reply) => {
    reply
        .code(404) // status code 
        .header("Content-Type", "application/json; charset=utf-8") 
        .send(
            {
                "error": "Route not found",
                "statusCode": reply.statusCode,
            }
        ); 
});

// Extra Credit Test Post
fastify.post("/cit/question/", (request, reply) => {
    let { question, answer } = request.body;
    // console.log(question, answer);
    let info = {question, answer}; // set info, the parameter of function addQuestionAnswer to object containing question and answer from body
    // console.log(info);
    // console.log(data);
    let result = addQuestionAnswer(info)
    reply
        .code(200) // status code 
        .header("Content-Type", "application/json; charset=utf-8") 
        .send(
            {
                "error" : result.error, // previously had addQuestionAnswer(info).error + for number -> added the info twice into the data array
                "statusCode": 201,
                "number": result.number,
            }
        ); 
});

// Starts server and listens to requests
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
})

/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
    console.log(`\n** Testing ${category} **`);
    console.log("-------------------------------");
    for (const o of args) {
      console.log(`-> ${category}${o.d}:`);
      console.log(o.f);
    }
  }
  
  // Set a constant to true to test the appropriate function
  const testGetQs = false;
  const testGetAs = false;
  const testGetQsAs = false;
  const testGetQ = false;
  const testGetA = false;
  const testGetQA = false;
  const testAdd = false;      // Extra credit
  const testUpdate = false;   // Extra credit
  const testDelete = false;   // Extra credit

  // getQuestions()
if (testGetQs) {
    testing("getQuestions", { d: "()", f: getQuestions() });
  }
  
  // getAnswers()
  if (testGetAs) {
    testing("getAnswers", { d: "()", f: getAnswers() });
  }
  
  // getQuestionsAnswers()
  if (testGetQsAs) {
    testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
  }
  
  // getQuestion()
  if (testGetQ) {
    testing(
      "getQuestion",
      { d: "()", f: getQuestion() },      // Extra credit: +1
      { d: "(0)", f: getQuestion(0) },    // Extra credit: +1
      { d: "(1)", f: getQuestion(1) },
      { d: "(4)", f: getQuestion(4) }     // Extra credit: +1
    );
  }
  
  // getAnswer()
  if (testGetA) {
    testing(
      "getAnswer",
      { d: "()", f: getAnswer() },        // Extra credit: +1
      { d: "(0)", f: getAnswer(0) },      // Extra credit: +1
      { d: "(1)", f: getAnswer(1) },
      { d: "(4)", f: getAnswer(4) }       // Extra credit: +1
    );
  }
  
  // getQuestionAnswer()
  if (testGetQA) {
    testing(
      "getQuestionAnswer",
      { d: "()", f: getQuestionAnswer() },    // Extra credit: +1
      { d: "(0)", f: getQuestionAnswer(0) },  // Extra credit: +1
      { d: "(1)", f: getQuestionAnswer(1) },
      { d: "(4)", f: getQuestionAnswer(4) }   // Extra credit: +1
    );
  }

// addQuestionAnswer()
if (testAdd) {
  testing(
    "addQuestionAnswer",
    { d: "()", f: addQuestionAnswer() },
    { d: "({})", f: addQuestionAnswer({}) },
    { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
    { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
    {
      d: '(question: "Q4", answer: "A4")',
      f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
    }
  );
}
