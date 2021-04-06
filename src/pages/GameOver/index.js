import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import GameDefault from '../../components/GameDefault'
import './style.scss'

export default function Index(props){

    const [game, setGame] = useState({})
    useEffect(() =>{
        const gameDetails = localStorage.getItem('game_details');
        const parseGameDetails = JSON.parse(gameDetails)
        if(!parseGameDetails) props.history.push('/')
        setGame(parseGameDetails ? parseGameDetails : {})
        localStorage.removeItem('game_details')
        
    },[])
    const {foodWon, timeSpent, totalFood} = game
    return (
        <section className="">
            <GameDefault 
                pageName="Game over!" 
                additionalInfo={
                    <div>
                        <h3 className="instruction">Total Food: {foodWon} / {totalFood}</h3>
                        <h3 className="instruction">Time Spent: {timeSpent} seconds</h3>
                    </div>
                }
                props={props}
            />
        </section>
        
    )
}
