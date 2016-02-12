app.controller('DashboardController', function($rootScope, $scope){
	/**
	 * To edit the member object you must go through $rootScope.member
	 * $rootScope.member is a $firebaseObject from AngularFire 
	 * To see the methods at your disposal look here
	 * https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebaseobject
	 * 
	 * Don't forget to call $rootScope.member.$save() after making changes to the $rootScope.member object
	 * 
	 * */
     
      $scope.updateMember = function () {
        
        $rootScope.member.accountCreated = Date.now();
        $rootScope.member.upVotes = 0;
        $rootScope.member.downVotes = 0;
        $rootScope.member.reputation = 0;
           
		$rootScope.member.$save()
		// firstName: string,
		// lastName: string,
		// imgUrl:  string,
		// country: string,
		// bio: string,
		// websiteUrl: string,
		// github: string,
		// twitterHandle: string,
		// favoriteTags: [tag], // <--- BONUS: use commas in the input field to add multiple tags. Or Look at multiselect inputs
		// $scope.memberProfile.accountCreated = Date.now();
		// **upVotes: number,
		// **downVotes: number,
		// **reputation: number,
		// **questions: [questionId]
		// **answers: [answerId],
		// **comments: [commentId]
		//Add anything else you think would be a cool feature to track
      }	

	
});