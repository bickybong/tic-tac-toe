gameboard = [];
var board = (function(){//board updates

    function create(){//create board divs
        const _body = document.querySelector('#mid');
        _body.textContent="";
        for (const char of gameboard){
            const item = document.createElement('div');
            item.classList.add('item');
            _body.appendChild(item);
            item.textContent = char;
        }
    };

    const s = '';
    function refresh() {//refresh gameboard
        gameboard = [];
        for (let i=0; i<9; i++){
            gameboard.push(s);
        }
        create()
    };
    return {refresh, create};
})();

board.refresh();

var admin = (function(){//turn order
    p1 = {type:"X", score:0, player:"Player X"};
    p2 = {type:"O", score:0, player:"Player O"};
    const announcer = document.querySelector('#bottom');
    const refreshButton = document.querySelector('.refBut');
    const scoreX = document.querySelector('.scoreX');
    const scoreO = document.querySelector('.scoreO');

    refreshButton.onclick = () =>{
        board.refresh();
        turn(p1, p2, 0);
    }
    
    const turn=(p1, p2, rounds)=>{
        var children = document.querySelectorAll(".item");
        count = 0;
        children.forEach(div =>{//plays turns with clicks
            announcer.textContent= `${p1.player} Turn`;
            div.dataset.id = count;//track position of cell
            div.addEventListener('click', (e) => {
                if (!e.target.textContent){
                    gameboard.splice( div.dataset.id,1,p1.type);
                    board.create();
                    
                    if (wincon(p1)){
                        announcer.textContent= `${p1.player} Wins!`;
                        p1.score++;
                        updateScores();
                    }else if(tie(rounds)){
                        announcer.textContent= `Its a Tie!`;
                    }else{
                        rounds++;
                        turn(p2, p1, rounds);//recursively calls to next player turn
                    };
                }});
                count++;
    })};

    function wincon(p1){//check if wincondition is met
        letter = p1.type;
        if(gameboard[0]===letter && gameboard[1]===letter &&gameboard[2]===letter 
            ||gameboard[0]===letter && gameboard[3]===letter &&gameboard[6]===letter
            ||gameboard[0]===letter && gameboard[4]===letter &&gameboard[8]===letter
            ||gameboard[1]===letter && gameboard[4]===letter &&gameboard[7]===letter
            ||gameboard[2]===letter && gameboard[4]===letter &&gameboard[6]===letter
            ||gameboard[2]===letter && gameboard[5]===letter &&gameboard[8]===letter
            ||gameboard[3]===letter && gameboard[4]===letter &&gameboard[5]===letter
            ||gameboard[6]===letter && gameboard[7]===letter &&gameboard[8]===letter){
            return true;
            }
        return false;
    };
    
    function tie(rounds){//check if tie
        if (rounds === 8){
            return true;
        };
        return false;
    };
    
    function updateScores(){//update scoreboard
        scoreX.textContent=`Player X score: ${p1.score}`;
        scoreO.textContent=`Player O score: ${p2.score}`;
    };

    updateScores();
    turn(p1, p2, 0);
    return;
})();
