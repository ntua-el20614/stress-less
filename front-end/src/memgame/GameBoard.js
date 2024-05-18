import React from "react"; 
import Data from "./data"; 
import Card from "./Card"; 
import "../App.css";  

function GameBoard() { 
    const [cardsArray, setCardsArray] = React.useState([]); 
    const [moves, setMoves] = React.useState(0); 
    const [firstCard, setFirstCard] = React.useState(null); 
    const [secondCard, setSecondCard] = React.useState(null); 
    const [stopFlip, setStopFlip] = React.useState(false); 
    const [won, setWon] = React.useState(0); 
    const [revealAll, setRevealAll] = React.useState(false); // State to handle revealing all cards

    const getResponsiveStyles = () => {
        const width = window.innerWidth;
        if (width < 480) {
            return {
                gridTemplateColumns: "repeat(3, 15vw)",
                cardSize: { height: '7.5vw', width: '7.5vw' },
                rowGap: '1px',  
                columnGap: '60px'
            };
        } else {
            return {
                gridTemplateColumns: "repeat(4, 15vw)",
                cardSize: { height: '25vw', width: '25vw' }, 
                rowGap: '5.5rem',  
                columnGap: '5.5rem' 
            };
        }
    };

    const { gridTemplateColumns, cardSize, rowGap, columnGap } = getResponsiveStyles();

    const boardStyle = {
        display: 'grid',
        marginLeft: '3rem',
        gridTemplateColumns: gridTemplateColumns,
        rowGap: rowGap,  
        columnGap: columnGap,  
        placeItems: 'center',
    };

    function NewGame() { 
        const shuffledCards = Data.sort(() => 0.5 - Math.random());
        setCardsArray(shuffledCards); 
        setMoves(0); 
        setFirstCard(null); 
        setSecondCard(null); 
        setWon(0); 
        setStopFlip(false);

        // Reveal all cards for 2 seconds
        setRevealAll(true);
        setTimeout(() => {
            setRevealAll(false);
        }, 2000);
    } 

    function handleSelectedCards(item) { 
        if (stopFlip) return;
        if (!firstCard) {
            setFirstCard(item);
        } else if (firstCard && firstCard.id !== item.id) {
            setSecondCard(item);
            setStopFlip(true);
        } 
    } 

    React.useEffect(() => { 
        if (firstCard && secondCard) { 
            if (firstCard.name === secondCard.name) { 
                const newCardsArray = cardsArray.map((card) => {
                    if (card.name === firstCard.name) {
                        return { ...card, matched: true };
                    }
                    return card;
                });
                setCardsArray(newCardsArray);
                setWon(won + 1);
            }
            setTimeout(() => {
                removeSelection();
            }, 1000);
        }
    }, [firstCard, secondCard]); 

    function removeSelection() { 
        setFirstCard(null); 
        setSecondCard(null); 
        setStopFlip(false); 
        setMoves(moves + 1);
    } 

    React.useEffect(() => { 
        NewGame(); 
    }, []); 

    return ( 
        <div className="container"> 
            <div className="header"> 
                <h1>Memory Game</h1> 
            </div> 
            <div className="board" style={boardStyle}> 
                {cardsArray.map((item) => ( 
                    <Card 
                        item={item} 
                        key={item.id} 
                        handleSelectedCards={handleSelectedCards} 
                        toggled={revealAll || item.matched || item === firstCard || item === secondCard} 
                        stopflip={stopFlip}
                        style={cardSize} 
                    /> 
                ))} 
            </div> 
            {won !== 6 ? ( 
                <div className="comments">Moves: {moves}</div> 
            ) : ( 
                <div className="comments"> 
                    You Won in {moves} moves 
                </div> 
            )}
            <button className="button" onClick={NewGame}> 
                New Game 
            </button> 
        </div> 
    ); 
} 

export default GameBoard; 
