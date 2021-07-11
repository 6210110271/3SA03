import React, { useState } from 'react';
import _, { attempt } from 'lodash';
import CharacterCard from './CharacterCard';

const prepareStateFromWord = given_word => {
    let word = given_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return {
        word,
        chars,
        attempt: 1,
        guess: '',
        completed: false
    }
}

export default function WordCard(props) {

    const [state, setState] = useState(prepareStateFromWord(props.value))

    const activationHandler = c => {
        console.log(`${c} has been activated.`)

        let guess = state.guess + c
        setState({ ...state, guess })

        if (guess.length == state.word.length) {
            if (guess == state.word) {
                console.log('yeah!')
                setState({ ...state, guess: guess, completed: true })
            } else {
                console.log('reset, next attempt')
                setState({ ...state, guess: '', attempt: state.attempt + 1 })
            }
        }
        console.log(guess)
    }

    const resetWord = b => {
        if (state.guess != '')
            setState({ ...state, guess: '', attempt: state.attempt + 1, completed: false })
    }

    const congrade = state.completed ? 'CONGRATULATION' : ''



    return (
        <div >
                <div style=
                {{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                className="congrade"
                >

                {'รอบที่ ' + state.attempt}
            </div>
            <br></br>
            <center><img src="https://www.pinclipart.com/picdir/big/195-1959825_animated-cute-filly-rarity-safe-scrunchy-face-rarity.png"/></center>

            <center><div>
                {
                    state.chars.map((c, i) =>
                        <CharacterCard value={c} key={i} activationHandler={activationHandler} attempt={state.attempt} />)
                }
            </div></center>

        
            
            <div className='font' style=
                {{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                {state.guess}
            </div>
            <br></br>
            
            <div className='congrade' style=
                {{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                {congrade}
            </div>

           <center> <div onClick={resetWord} className='card' style=
                {{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                Reset
            </div></center>
        </div>
    );
}