var board = (function(){
    gameboard = {top:[0,0,0], mid:[0,0,0], bot:[0,0,0]};
    const _body = document.querySelector('#mid');
    function viewboard(){for (const section in gameboard){
        count = 0;
        // const container = document.createElement('div')
        // container.classList.add(section);
        // _body.appendChild(container);
        for (const char of gameboard[section]){
            const item = document.createElement('div')
            item.classList.add(section + count);
            _body.appendChild(item);
            item.textContent = char;
            count++
        }}}
    return {gameboard, viewboard};
})();

board.viewboard();

var admin = (function(p1,p2){
    const board1 = board
    return board1;
}())

const players = (type) =>{
    score = 0;
    return {score, type};
}

const p1 = players('X')
const p2 = players('O')
