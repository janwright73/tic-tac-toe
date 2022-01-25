  const Square = ({id, player, newState}) => {
    const [color, setColor] = React.useState('red');
    const [status, setStatus] = React.useState(null);
    const XorO = ["O", "X"];

    const palet = ['green', 'red'];
    const getNextColor =()=> {
      if (player!= null) 
        return palet[player];  
      else return palet[0];
    }

    React.useEffect(()=>{
      console.log(`Render ${id}`);
      return ()=> console.log(`unmounting Square ${id}`);
    });

    //keep track of the color
    return (
      //change color of Square on click
      <button onClick={(e) =>{
        //alert(`I'm Square ${id}`);
        let col = getNextColor();
        setColor(col);
        let nextPlayer = newState(id);
        setStatus(nextPlayer);
        //note that setState is async, so best to use the col variable in the next line
        e.target.style.background = col;
      }}> 
        <h1>{XorO[status]}</h1> 
        </button>
    )
  };
  function checkWinner(state) {
    //state is an arry of 0 and 1 and null

    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 5, 6],
    ];

    for (let i = 0; i < win.length; i++){
        const [a, b, c] = win[i];
        if (state[a] == state[b] && state[a] == state[c] && state[a])
            return state[a];
    }
    return null;
}
  const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));

  let status = `Player ${player}`;
  let winner = checkWinner(state);
  

  //define newState function
  const newState = (idOfSquare)=>{
    let thePlayer = player;
    state[idOfSquare] = player; //player is present player
    setState(state);
    let nextplayer = (player +1) %2;
    setPlayer(nextplayer);
    return thePlayer;
  }
  
  function checkWinner(state) {
    //state is an arry of 0 and 1 and null

    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 5, 6],
    ];

    for (let i = 0; i < win.length; i++){
        const [a, b, c] = win[i];
        if (state[a] == state[b] && state[a] == state[c] && (state[a]!= null))
            return state[a];
    }
    return null;
}

 



  function renderSquare(i){
    return <Square id={i} player={player} newState={newState}> </Square>
  }

  return (
    <div
      className="game-board">
        <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="grid-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="grid-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div id="info">
          <h1 className={ player == 1 ? 'red' : 'white'}>{status}</h1>
          {winner != null ? <h1 className={ player == 1 ? 'red' : 'white'}>{`Player ${winner} wins!`}</h1> : <h1>No Winner yet...</h1>}
        </div>
        
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
