var board = (function(){//board updates
    const o = 'O';
    const x = 'X';
    const s = '';
    gameboard = {top:[s,s,s], mid:[s,s,s], bot:[s,s,s]};
    const _body = document.querySelector('#mid');
    function viewboard(){for (const section in gameboard){
        count = 0;
        for (const char of gameboard[section]){
            const item = document.createElement('div')
            item.classList.add('item');
            _body.appendChild(item);
            item.textContent = char;

            count++
        }}};
    return {gameboard, viewboard};
})();

board.viewboard();

const players = (type) =>{//player functions
    score = 0;
    const turn=()=>{
        var children = document.querySelectorAll(".item");
        children.forEach(div =>{
            div.addEventListener('click', (e) => {
                if (!e.target.textContent){
                    e.target.style.backgroundColor = "azure";
                    e.target.textContent = type;
                }})
        });
        };
    return {score, type, turn};
}

const p1 = players('X');
const p2 = players('O');

var admin = (function(){//turn order
    console.log("turn")
    const board1 = board;
    while (true){
        p1.turn();
        p2.turn();
        break;
    };
    return board1;
})();
