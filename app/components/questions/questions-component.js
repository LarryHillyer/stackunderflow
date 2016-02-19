/* global Firebase */
app.controller('QuestionsController', function($rootScope, $scope, DataService, $state, FBREF, $firebaseArray, $firebaseObject){
	/**
	 * $scope.tags and $scope.questions are $firebaseArrays from AngularFire 
	 * To see the methods at your disposal look here
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray
	 * */
     
    //  var db = new Firebase(FBREF);
      
	$scope.tags = DataService.getTags();
	$scope.questions = DataService.getQuestions();
	
	
	  $scope.addQuestion = function(newQuestion){
	 	newQuestion.memberId = $rootScope.member.$id
        $scope.newQuestion.userName = $rootScope.userName; 
        $scope.newQuestion.date = Date.now();
	 	$scope.questions.$add(newQuestion).then(function(ref){
	  	  //Add the newly added question to the member object	
	  	  $rootScope.member.questions = $rootScope.member.questions || {};
	    //Another Dictonary structure all we are doing is adding the questionId to the member.questions dictionary.
	     //To avoid duplicating data in our database we only store the questionId instead of the entire question again 
	     $rootScope.member.questions[ref.key()] = ref.key();
	     $rootScope.member.$save();

         })
      
      }

})  


       
	//  * question Schema
	//  * {
	//  *  title: string,
	//  *  body: string,
	//  *  votes: {memberId: number},
	//  *  author: string,
	//  *  posted: date,
	//  *  answeredOn: date,
	//  *  answered: bool, 
	//  *	tags: [tags] 
	//  * } 
	//  */



app.controller('QuestionController', function($rootScope, $scope, question, comments, responses){
	/**
	 * The question, comments, responses arguments being passed into the controller  ^^^^^^^
	 * come from the question route resolve,
	 * Remember that ui-router ensures that the resolve functions finish before loading up the controller
	 *  
	 * $scope.question is $firebaseObject from AngularFire 
	 * To see the methods at your disposal look here
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject
	 * 
	 * $scope.comments and $scope.responses are $firebaseArrays
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray
	 * 
	 * hint: managing votes can be tricky! Actually very tricky! One of the best ways to 
	 * ensure a member can only vote once is to use a dictonary or an object as question.votes 
	 * 
	 * think of it this way 
	/*  
         

        $scope.changeVote = function (direction) {
        $scope.question.votes = $scope.question.votes || {};
         if (direction){
        $scope.question.votes[$rootScope.member.$id] = 1;
         } else {
            $scope.question.votes[$rootScope.member.$id] = -1; 
         }
         calcVotes();
        $scope.question.$save()
        } 
     
        function calcVotes(){
            $scope.question.voteCount = 0;
        for(var key in $scope.question.votes){
            $scope.question.voteCount += $scope.question.votes[key];
            }
        }
     /*
	 * $scope.question.votes[$rootScope.member.$id] = 1 || -1
	 * 
	 * This logic here should help keep your voteCount on track
	 * $scope.question.voteCount = 0;
	 * for(var key in $scope.question.votes){
	 * 	$scope.question.voteCount += $scope.question.votes[key];
	 * }
	 * 
	 * Don't forget to call $scope.question.$save() after updating the question properties
	 * Also anytime you update $rootScope.member don't forget $rootScope.member.$save() to write it to the db
	 * */
    $scope.changeVote = function (direction) {
        $scope.question.votes = $scope.question.votes || {};
        if (direction) {
            $scope.question.votes[$rootScope.member.$id] = 1;
        } else {
            $scope.question.votes[$rootScope.member.$id] = -1;
        }
        calcVotes();
        $scope.question.$save()
    }



    function calcResVotes() {
        $scope.response.voteCount = 0;
        for (var key in $scope.response.votes) {
            $scope.response.voteCount += $scope.response.votes[key];
        }
    }
     
        $scope.changeVote = function (direction) {
        $scope.response.votes = $scope.question.votes || {};
        if (direction) {
            $scope.question.votes[$rootScope.member.$id] = 1;
        } else {
            $scope.question.votes[$rootScope.member.$id] = -1;
        }
        calcVotes();
        $scope.question.$save()
    }

    function calcVotes() {
        $scope.question.voteCount = 0;
        for (var key in $scope.question.votes) {
            $scope.question.voteCount += $scope.question.votes[key];
        }
    } 
     
	$scope.question = question;
	$scope.comments = comments;
	$scope.responses = responses;
	

	  $scope.addComment = function(newComment){
	  	$scope.newComment.memberId = $rootScope.member.$id;
        $scope.newcomment.userName = $rootScope.userName;
        $scope.newComment.date = Date.now();
          
	 	$scope.comments.$add(newQuestion).then(function(ref){
	  	  //Add the newly added comment to the member object	
	  	  $rootScope.member.comments = $rootScope.member.comments || {};
	     //Another Dictonary structure all we are doing is adding the commentId to the member.comments dictionary.
	     //To avoid duplicating data in our database we only store the commentId instead of the entire question again 
	     $rootScope.member.comments[ref.key()] = ref.key();
	     $rootScope.member.$save();
	   })
	  }
       $scope.addResponse = function(newResponse){
	  	$scope.newResponse.memberId = $rootScope.member.$id;
	 	$scope.responses.$add(newResponse).then(function(ref){
	  	  //Add the newly added comment to the member object
	  	  $rootScope.member.responses = $rootScope.member.responses || {};
	     //Another Dictonary structure all we are doing is adding the commentId to the member.comments dictionary.
	     //To avoid duplicating data in our database we only store the commentId instead of the entire question again 
	     $rootScope.member.responses[$scope.question.$id]= $rootScope.member.responses[$scope.question.$id] || {};
         $rootScope.member.responses[$scope.question.$id][ref.key()] = ref.key();
	     $rootScope.member.$save();
	   })
	  }
      
	//  * question Schema
	//  *  title: string,
	//  *  body: string,
	//  * {
	//  *  votes: {memberId: number},
	//  *  author: string,
	//  *  posted: date,
	//  *  answeredOn: date,
	//  *  answered: bool, 
	//  *	tags: [tags] 
	//  * } 
	//  */
   	
});

















// The almost code for the security on firebase
// {
//   "rules": {
//     "users": {
//       "$uid": {
//         ".read": "auth != null && auth.uid == $uid"
//       }
//     },
//     "questions":{
//       ".read": true
//     },
//     "tags":{
//       ".read": true
//     }
//   }
// }