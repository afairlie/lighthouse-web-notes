// Notes from interview: 

// RUN THE PROGRAM - to see what it does. You don't just have to try to logic it out without running it to see how it behaves.
// Start with pseudocode. you might not have the full picture of how you want to execute something. pseudocode out how you think you need to execute something, and then adjust depeneding on what you can do.

// THINK OUT LOUD - say: typically I would do x. interviewer may respond thats not necessary, but they know how you're thinking - and better they know, than that you skip something they want you to do cause you're not sure if it's expected and make the call that it's not.

// whiteboard: think through everything, because you won't be able to lean on your tools and testing. ex. a loop running 0-99 instead of 1-100. 
// trivia questions: ie specific behaviours of javascript like coercing types
// know your JARGON - practice this by always referring to things by their proper name, and looking it up if you don't know the name.

const boardData = [[null,0,0,1],[0,null,null,null],[0,null,null,null],[1,null,null,null]];

// INTERVIEWER SUGGESTION: l.push({0: "O", 1: "X", null: " "}[board[i][k]])

const boardFormat = {0: "0", 1: "X", null: " "}

const printBoard = (boardData) => {
  const renderedBoard = [];

  for (let row of boardData) {
    const renderedRow = ['|'];

    for (let value of row) {
      renderedRow.push(boardFormat[value]);
      renderedRow.push('|');
    }

    renderedBoard.push(renderedRow.join(''));
  }

  return renderedBoard.join('\n');
}

/* ORIGINAL ANSWER
  const printBoard = (board) => {
  const renderedBoard = [];
  // loop index of each row
  for(let i in board){
  
    const l = ['|'];
    
    // loop index of each column
    for (let k in board[i]) {
      // add column value to row array
      if (board[i][k] === 0) {
        l.push("O");
      }
        
      if (board[i][k] === 1) {
        l.push("X");
      }
        
      if (board[i][k] === null) {
        l.push(" ");
      }
        
      l.push("|");
      
    }

    renderedBoard.push(l.join(''));
  }
  return renderedBoard.join('\n');
} */

console.log(printBoard(boardData));