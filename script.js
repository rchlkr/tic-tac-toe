let player = (name, symbol) => {
	let wins = 0;
	let addWin = () => {
		return wins++;
	};
	let allWins = () => {
		return wins;
	};
	return { name, symbol, addWin, allWins };
};

const displayPlayers = (() => {
	let playerOne = document.getElementById("playerone");
	let playerTwo = document.getElementById("playertwo");
	return { playerOne, playerTwo };
})();

const displayScore = (() => {
	const playerOneScore = document.getElementById("playeronescore");
	const playerTwoScore = document.getElementById("playertwoscore");
	return { playerOneScore, playerTwoScore };
})();

const gameBoard = (() => {
	let board = ["", "", "", "", "", "", "", "", ""];
	let boxesPlayed = [];

	let editPlayers = document.getElementById("editplayers");
	let modal = document.querySelector(".modal");
	let closeButton = document.querySelector(".closebutton");
	let submit = document.getElementById("submit");

	playerOne = player("Player 1", "x");
	playerTwo = player("Player 2", "o");

	function changePlayerNames() {
		let playerOneName = document.getElementById("playeronename").value;
		let playerTwoName = document.getElementById("playertwoname").value;
		displayPlayers.playerOne.textContent = `${playerOneName}`;
		displayPlayers.playerTwo.textContent = `${playerTwoName}`;
		playerOne.name = playerOneName;
		playerTwo.name = playerTwoName;
		return playerOne, playerOneName, playerTwo, playerTwoName;
	}

	submit.addEventListener("click", changePlayerNames);

	editPlayers.addEventListener("click", showModal);
	closeButton.addEventListener("click", showModal);
	window.addEventListener("click", windowOnClick);

	function showModal() {
		modal.classList.toggle("showmodal");
	}

	function windowOnClick(event) {
		if (event.target === modal) {
			showModal();
		}
		if (event.target === submit) {
			showModal();
		}
	}

	let box = document.querySelectorAll(".box");
	box.forEach((box) => {
		box.addEventListener("click", () => {
			playGame(box);
		});
	});

	let updateScore = () => {
		displayScore.playerOneScore.textContent = `${playerOne.allWins()}`;
		displayScore.playerTwoScore.textContent = `${playerTwo.allWins()}`;
	};

	const changeTurn = () => {
		if (player === playerOne) {
			player = playerTwo;
		} else {
			player = playerOne;
		}
	};

	const newRound = () => {
		board.fill("");
		box.forEach((box) => {
			box.textContent = "";
		});
		box.textContent = "";
		boxesPlayed = [];
	};

	const playGame = (box) => {
		if (boxesPlayed.includes(box.id)) {
			!changeTurn();
		} else {
			board.splice(box.id, 1, player.symbol);
			box.textContent = player.symbol;
			boxesPlayed.push(box.id);
		}
		if (checkWinner()) {
			player.addWin();
			updateScore();
			if (
				document
					.getElementById("playerone")
					.classList.contains("playeronewin") ||
				document.getElementById("playertwo").classList.contains("playertwowin")
			) {
				document.getElementById("playerone").classList.remove("playeronewin");
				document.getElementById("playertwo").classList.remove("playertwowin");
			}
			if (player === playerOne) {
				document.getElementById("playerone").classList.add("playeronewin");
			} else if (player === playerTwo) {
				document.getElementById("playertwo").classList.add("playertwowin");
			}
			setTimeout(newRound, 1000);
		} else if (boxesPlayed.length === 9) {
			setTimeout(newRound, 1000);
		}
		changeTurn();
	};

	let checkWinner = () => {
		if (
			(board[0] === "x" && board[1] === "x" && board[2] === "x") ||
			(board[3] === "x" && board[4] === "x" && board[5] === "x") ||
			(board[6] === "x" && board[7] === "x" && board[8] === "x") ||
			(board[0] === "x" && board[4] === "x" && board[8] === "x") ||
			(board[0] === "x" && board[3] === "x" && board[6] === "x") ||
			(board[1] === "x" && board[4] === "x" && board[7] === "x") ||
			(board[2] === "x" && board[5] === "x" && board[8] === "x") ||
			(board[2] === "x" && board[4] === "x" && board[6] === "x")
		) {
			return true, player;
		} else if (
			(board[0] === "o" && board[1] === "o" && board[2] === "o") ||
			(board[3] === "o" && board[4] === "o" && board[5] === "o") ||
			(board[6] === "o" && board[7] === "o" && board[8] === "o") ||
			(board[0] === "o" && board[4] === "o" && board[8] === "o") ||
			(board[0] === "o" && board[3] === "o" && board[6] === "o") ||
			(board[1] === "o" && board[4] === "o" && board[7] === "o") ||
			(board[2] === "o" && board[5] === "o" && board[8] === "o") ||
			(board[2] === "o" && board[4] === "o" && board[6] === "o")
		) {
			return true, player;
		}
	};

	const restartBtn = document.getElementById("restart");
	restartBtn.addEventListener("click", () => {
		board.fill("");
		box.forEach((box) => {
			box.textContent = "";
		});
		playerOneScore = 0;
		playerTwoScore = 0;
		playerOne.wins = 0;
		playerTwo.wins = 0;
		displayScore.playerOneScore.textContent = "0";
		displayScore.playerTwoScore.textContent = "0";
		player = playerOne;
		boxesPlayed = [];
	});

	return {
		board,
		restart,
		playGame,
		box,
		player,
		playerOne,
		playerTwo,
	};
})();

/*

winner animation works for alternating wins, 
but if player wins twice in a row it doesn't animate the second win

when you click on edit players when custom names are already input, 
make the input fields say player 1/player 2 rather than the custom names

*/
