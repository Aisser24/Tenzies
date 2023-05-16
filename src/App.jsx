import React, { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const App = () => {
    const [diceArray, setDiceArray] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const allHeld = diceArray.every(dice => dice.isHeld)
        const firstValue = diceArray[0].value
        const allSameValue = diceArray.every(dice => dice.value === firstValue)

        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [diceArray])

    function allNewDice() {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr[i] = {
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid()
            }
        }
        return arr
    }

    function roll() {
        return setDiceArray(prevDiceArray => {
            return prevDiceArray.map(prevDice => {
                if (prevDice.isHeld) {
                    return prevDice
                } else {
                    return {
                        ...prevDice,
                        value: Math.floor(Math.random() * 6) + 1
                    }
                }
            })
        })
    }

    function holdDie(id) {
        setDiceArray(prevDiceArray => {
            return prevDiceArray.map(prevDice => {
                if (prevDice.id === id) {
                    return {
                        ...prevDice,
                        isHeld: !prevDice.isHeld
                    }
                } else {
                    return prevDice
                }
            })
        })
    }

    function newGame() {
        setDiceArray(allNewDice)
        setTenzies(false)
    }


    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            <div className="wrapper">
                {
                    diceArray.map(dice => (
                        <Die 
                            value={dice.value}
                            isHeld={dice.isHeld}
                            key={dice.id}
                            id={dice.id}
                            handleClick={() => {holdDie(dice.id)}}
                        />
                    ))
                }
            </div>
            <button onClick={!tenzies ? roll : newGame} className="roll--btn">
                {
                    tenzies ? "New Game" : "Roll"
                }
            </button>
        </main>
    )
}

export default App;