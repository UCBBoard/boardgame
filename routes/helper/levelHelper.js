
exports.helper = function levelHelper(exp, amountToAdd, toNextLevel, level) {
	if (exp + amountToAdd >= toNextLevel){
		return level + 1;
	}

	return level;
}


