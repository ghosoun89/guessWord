var app = angular.module("GameApp",[]);
//create the controller then we connect it with 
// index.html
app.controller("GameController",['$scope','$timeout',function($scope, $timeout){
    var words = ["rat","mat","bat","cat"]
    $scope.incorrectLettersChosen=[];
    $scope.correctLettersChosen=[];
    $scope.guesses=6;
    $scope.displayWord = '';
    $scope.input = {
        letter : ''
    }

    var selectRandomWord = function(){
        // take the random index from the array
        var index = Math.round(Math.random()*words.length);
        return words[index]
    }

    var newGame = function(){
        $scope.incorrectLettersChosen=[];
        $scope.correctLettersChosen=[];
        $scope.guesses=6;
        $scope.displayWord = '';

        selectedWord = selectRandomWord();
        console.log(selectedWord)

        var tempdisplayword = '';
        // iterate through the selected word and add stars according to the letters
        for (let i = 0; i < selectedWord.length; i++) {
            tempdisplayword += '*'
            
        }
        $scope.displayWord = tempdisplayword;

    }

    $scope.letterChosen = function(){
      console.log("working")
      for (let i = 0; i < $scope.correctLettersChosen.length; i++) {
          if($scope.correctLettersChosen[i].toLowerCase() === $scope.input.letter.toLowerCase
          ()){
              $scope.input.letter="";
              return;
          }
      }
      for (let i = 0; i < $scope.incorrectLettersChosen.length; i++) {
        if($scope.incorrectLettersChosen[i].toLowerCase() === $scope.input.letter.toLowerCase
        ()){
            $scope.input.letter="";
            return;
        }
    }

    // iterate through the selected word and check if the inserted letter
    // is one of the selectedword chang the star to it
    var correct = false;
    for (let i = 0; i < selectedWord.length; i++) {
         if(selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()){
             $scope.displayWord = $scope.displayWord.slice(0,i)+$scope.input.letter.toLowerCase()+$scope.displayWord.slice(i+1);
             correct = true;
         }        
    }

    if(correct){
        $scope.correctLettersChosen.push($scope.input.letter.toLowerCase())
    }else{
        // if he didnt guess reduce number of guess
        $scope.guesses--;
        $scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase())

    }
    $scope.input.letter= "";
    if($scope.guesses === 0){
        $timeout(function(){
            newGame()
        },500)
        alert("you lost ooh!")
    }
    // check if there arent any stars then you guessed 
    if($scope.displayWord.indexOf("*") === -1 ){
        $timeout(function(){
            newGame()
        },500)
        alert("you won yeeeh!")
    }
    }

    newGame();

}])