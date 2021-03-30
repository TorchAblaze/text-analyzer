// Utility Logic

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}

// Business Logic

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function (element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function (element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}
function mostUsedWords(text) {
  const wordArray = text.split(" ");
  const topWords = ["How appears one times", 0 , 0 ];
  wordArray.forEach(function (word) {
    const wordOccurrences = numberOfOccurrencesInText(word, text);
    console.log(wordOccurrences);
    if (wordOccurrences >= topWords[0]) {
      if (!topWords.includes(word)) {
        topWords[0] = word + " appears " + wordOccurrences + " times";
      }
    }
    if (wordOccurrences >= topWords[1]) {
      if (!topWords.includes(word)) {
        topWords[1] = word + " appears " + wordOccurrences + " times";
      }
    }
    if (wordOccurrences >= topWords[2]) {
      if (!topWords.includes(word)) {
        topWords[2] = word + " appears " + wordOccurrences + " times";
      }
    }
    return topWords;
  });
  return console.log(topWords);
}
/*const wordCount = numberOfOccurrencesInText(word, text);
(wordOccurrences > topWords[0])
topWords[0] = word + "appears" + wordCount + "times"

(wordOccurrences > topWords[1])
topWords[1] = word + "appears" + wordCount + "times"


topWords[2] = word + "appears" + wordCount + "times"
}
currentWord++;*/
// take input from first text box
// Count how many times each word appears

// UI Logic

function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  let htmlString = "<p>"
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    console.log(mostUsedWords(passage));
  });
});