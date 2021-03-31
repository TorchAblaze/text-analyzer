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
  const topWords = [0, 0, 0];
  const repeatedWords = [];
  wordArray.forEach(function (word) {
    const wordOccurrences = numberOfOccurrencesInText(word, text);
    if (wordOccurrences >= topWords[0]) {
      if (repeatedWords.includes(word) === false) {
        // topWords[0] = word + " appears " + wordOccurrences + " times";
        topWords.unshift(wordOccurrences);
        repeatedWords.unshift(word);
      }
    }
    if (wordOccurrences >= topWords[1]) {
      if (repeatedWords.includes(word) === false) {
        topWords.splice(1, 0, wordOccurrences);
        repeatedWords.splice(1, 0, word);
      }
    }
    if (wordOccurrences > topWords[2]) {
      if (repeatedWords.includes(word) === false) {
        topWords.splice(2, 0, wordOccurrences);
        repeatedWords.splice(2, 0, word);
      }
    }
  });
  const message = `<br>${repeatedWords[0]}: ${topWords[0]} <br> ${repeatedWords[1]}: ${topWords[1]} <br> ${repeatedWords[2]}: ${topWords[2]}`
  return message;
}

function curseFilter(text) {
  let curses = ["zoinks", "muppeteer", "biffaroni", "loopdaloop"]
  const wordArray = text.split(" ");
  wordArray.forEach(function (word) {
    if (curses.includes(word)) {
      curseAlert = true;
      return console.log(curseAlert);
    } else {
      curseAlert = false;
      return console.log(curseAlert);
    }
  });
}

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
    const topWords = mostUsedWords(passage);
    let curseAlert;
    curseFilter(passage);
    if (curseAlert) {
      $("div#operational").hide();
      $("div#non-operational").show();
    }
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#repeated-words").html(topWords);
    console.log(topWords);
  });
});