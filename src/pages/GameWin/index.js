import React from 'react';
import {Link} from 'react-router-dom';
import GameDefault from '../../components/GameDefault'
import './style.scss'

export default function Index(props){
    
    return (
        <section className="">
            <GameDefault 
                pageName="Bravo!" 
                additionalInfo={
                    <div>
                        <h3 className="instruction">Time Spent: 98 seconds</h3>
                    </div>
                }
                props={props}
            />
        </section>
        
    )
}
