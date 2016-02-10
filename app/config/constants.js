app.constant('CONSTANTS', (function(){ 
	var root = 'https://questions-and-answer.firebaseio.com/';
	var questions = root + 'questions/'
	var tags = root + 'tags/' 
	
	return {
		fbRef: root,
		questions: questions,
		tags: tags
	}
}()));