function QuizQuestion(question, choices, correctAnswer){
    this.question = question;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
  }
    
var allQuestions = [
    new QuizQuestion("What does Confederation mean?",[" The United States Confederate soldiers came to Canada", " Joining of communities to become a province", " Joining of suburbs to form a large city", " Joining of provinces to make a new country"],3),
    new QuizQuestion("What part of the Constitution legally protects the basic rights and freedoms of all Canadians?",[" The British Charter of Rights and Freedoms", " The Canadian Charter of Freedoms", " The Canadian Charter of Rights and Freedoms", " Bill of Rights"],3),
    new QuizQuestion("What happened at the Battle of the Plains of Abraham?",[" The Voyagers battled with the British for fur trading rights", " Americans fought the United Empire Loyalists during the American Revolution", " The British defeated the French marking the end of France's empire in America", " The French defeated the British in a battle for Quebec"],2),
    new QuizQuestion("One third of all Canadians live in which province?",[" Quebec", " Ontario", " Northwest Territories", " Manitoba"],1),
    new QuizQuestion("Which province in Canada is the smallest in land size?",[" Nova Scotia", " Prince Edward Island"," Yukon Territory"," Newfoundland and Labrador" ],1)
  ];
  
  var currentQuestion = 0;
  var correctAnswers = 0;
  
  function setupOptions() {
    $('#question').html(parseInt(currentQuestion) + 1 + ". " + allQuestions[currentQuestion].question);
    var options = allQuestions[currentQuestion].choices;
    var formHtml = '';
    for (var i = 0; i < options.length; i++) {
      formHtml += '<div><input type="radio" name="option" value=" ' + i + '" class="options"><label for="option' + i + '">' + options[i] + '</label></div><br/>';
    }
    $('#form').html(formHtml);
    $(".options:eq(0)").prop('checked', true);
  }
  
  function checkAns() {
    if ($("input[name=option]:checked").val() == allQuestions[currentQuestion].correctAnswer) {
      correctAnswers++;
    }
  }
  
  $(document).ready(function(){
      
    var $interactivequiz = $("#interactivequiz");
    var $start = $("#start");
    var $progressbar = $("#progressbar");
    var $next = $("#next");
    var $result = $("#result");
    
    $interactivequiz.hide();
	$start.click(function() {
	    $interactivequiz.fadeIn();
	    $(this).hide();
  	});
    
  
    $(function() {
        $progressbar.progressbar({
            max: allQuestions.length-1,			
            value: 0
          });
      });
  
      setupOptions();
  
      $next.click(function(){
            event.preventDefault();
            checkAns();
            currentQuestion++;
            $(function() {
                  $progressbar.progressbar({
                        value: currentQuestion
                  });
                });
            if(currentQuestion<allQuestions.length){
                setupOptions();
                if(currentQuestion==allQuestions.length-1){
                 $next.html("Submit");
                    $next.click(function(){
                    $interactivequiz.hide();
                    $result.html("You correctly answered " + correctAnswers + " out of " + currentQuestion + " questions! ").hide();
                    $result.fadeIn(1500);
                    $start.click(function() {
                         $interactivequiz.fadeIn();
                        $(start).hide();
                        });
                    });
                  }
              };
      });	
  });
  