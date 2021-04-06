import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import GameDefault from '../../components/GameDefault'
import './style.scss'

export default function Index(props){
    
    const [time, setTime] = useState('')
    useEffect(() =>{
        const gameDetails = localStorage.getItem('game_details');
        const parseGameDetails = JSON.parse(gameDetails)
        if(!parseGameDetails) props.history.push('/')
        setTime(parseGameDetails ? parseGameDetails.timeSpent : '')
        localStorage.removeItem('game_details')
    },[])
    
    return (
        <section className="">
            <GameDefault 
                pageName="Bravo!" 
                additionalInfo={
                    <div>
                        <h3 className="instruction min">Time Spent: {time} seconds</h3>
                    </div>
                }
                props={props}
            />
        </section>
        
    )
}
