$(document).ready(function() {

	

	/* *******************
		SETUP VARIABLES 
	******************* */

	var winner;

	// Winning combinations
	var wins = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7]
	];

	// Scorebord variables
	var gameNumber = 1;
	var Xwins = 0;
	var Owins = 0;





	/* *******************
		GENERAL FUNCTIONS
	******************* */



	/* Clear the Board */

	function clearBoard() {
		$('.square').removeClass('Xplayed');
		$('.square').removeClass('Oplayed');
		$('.square').removeClass('played');

		$('.square').data("played", false);
		$('.square').data("player", "");
	}
	$('.reset-board-button').click(function() {
		clearBoard();
	})


	
	/* Check if the Square has Already Been Played */

	function checkIfSquareFree(squareNumber) {
		if ( $('.square[data-square="'+squareNumber+'"]').data("played") === true ) {
			return false; // Square is not free
		} else {
			return true; // Square is free
		}
	}


	

	/* Manage the Win Table */

	function addWinToTable() {

		if (winner === 'X') {
			Xwins++ 

			// Add new row to table
			$('.scores tbody').append('<tr><td>'+gameNumber+'</td><td>Win</td><td>Lose</td></tr>');
		} else {
			Owins++ 

			// Add new row to table
			$('.scores tbody').append('<tr><td>'+gameNumber+'</td><td>Lose</td><td>Win</td></tr>');
		}

		// Update total wins
		$('.x-wins').html(Xwins);
		$('.o-wins').html(Owins);

		gameNumber++;
	}



	/* Register is winning combination has happened */

	function registerWin(x, y, z) {

		if ( 

			// All three winning squares played
			$('.square[data-square="'+x+'"]').data("played") === true &&
			$('.square[data-square="'+y+'"]').data("played") === true &&
			$('.square[data-square="'+z+'"]').data("played") === true

			&&

			// All three squares played by the same player
			$('.square[data-square="'+x+'"]').data("player") === $('.square[data-square="'+y+'"]').data("player") 
			&& $('.square[data-square="'+x+'"]').data("player") === $('.square[data-square="'+z+'"]').data("player") ) 

		{

			winner = $('.square[data-square="'+x+'"]').data("player");
			return true;

		} else {
			return false;
		}	

	} // end registerWin


	/* Check if there is a draw */ 

	function checkDraw() {

		if ( $('.square.played').length === 9 ) {
			alert("Draw! Try again");
			clearBoard();
		}

	}


	/* Check if there is a win */

	function checkWin() {

		// Loop through all winning combinations
		for (i = 0; i < wins.length; i++) {
			
			var w = registerWin(wins[i][0], wins[i][1], wins[i][2]);

			if (w) {
				
				alert(winner+ " won!");
				addWinToTable();
				clearBoard();
			}

			if ( !w && i === (wins.length - 1) ) {
				checkDraw();
			}
		} // end loop
	} // end checkWin




	/* *******************
		O PLAY
	******************* */

	function Orandomplay() {

		// Loop to find a valid play
		for (var i = 0; i < 200; i++) {
		
			var n = Math.floor((Math.random() * 9) + 1);
			if ( checkIfSquareFree( n ) ) {

				$('.square[data-square="'+n+'"').addClass("Oplayed");
				$('.square[data-square="'+n+'"').addClass("played");
				$('.square[data-square="'+n+'"').data("played", true);
				$('.square[data-square="'+n+'"').data("player", "O");

				checkWin();
				break;
			} 

		}
	}


	/* *******************
		X PLAY
	******************* */

	$(".square").on("click", function() {



		if ( checkIfSquareFree( $(this).data("square") ) ) {

			$(this).addClass("Xplayed");
			$(this).addClass("played");

			$(this).data("played", true);
			$(this).data("player", "X");

			checkWin();

			Orandomplay();

		} else {
			alert("Square already played. Please try again.")
		}
		

	})


	
		





})