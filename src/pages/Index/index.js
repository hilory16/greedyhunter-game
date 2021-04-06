import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import GameDefault from '../../components/GameDefault'
import './style.scss'

export default function Index (props) {
    
    return (
        <section className="">
            <GameDefault 
                pageName="Greedy Hunter" 
                additionalInfo={
                    <div>
                        <h3 className="instruction">The aim is to eat all the food in record time</h3>
                        <h3 className="instruction">Confiure your game grid below 👇🏼</h3>
                    </div>
                }
                props = {props}
            />
        </section>
        
    )
}

