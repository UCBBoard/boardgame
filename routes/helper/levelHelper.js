const helper =  {
	levelHelper: function(exp, amountToAdd, toNextLevel, level){
		if (exp + amountToAdd >= toNextLevel){
		return level + 1;
		}

		return level;
		},

	stripExp: function(exp, toNextLevel){
		return (exp % toNextLevel)
	}
}


module.exports = helper
