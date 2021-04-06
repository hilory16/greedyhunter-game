import React from 'react';
import Food from '../../assets/img/food.svg';
import Character from '../../assets/img/character.svg';
import PropTypes from 'prop-types'
import './style.scss'

export default function GameBoard({column, gridNumber, playerPosition, playerSelected, playerError, foodLocation, validGrids, selectPlayer, movePlayer}) {

    const renderBox = () =>{
        const array = []
        for(let i = 1; i <= gridNumber; i++){
            array.push(i)
        }
        return array.map((item, i) =>{
            if(playerPosition == (i + 1)) return<div key={i} className={`board__box d-flex align-items-center justify-content-center ${playerError ? 'player__error' : ''} ${playerSelected ? 'player__selected' : ''}`} onClick={() => selectPlayer()}>
                <img src={Character} alt="" className={`character__play`}/>
            </div>
            return(
                <div className={`board__box d-flex align-items-center justify-content-center ${playerSelected ? 'player__active' : ''} ${validGrids.includes(i + 1) ? 'player__possible' : ''}`} onClick={() => movePlayer(i + 1)} key={i}>
                    <img src={Food} alt="" className={`${foodLocation.includes(i + 1) ? '' : 'd-none'}`}/>
                </div>
            )
        })
        
    }

    return (
        <div className="board__item mx-auto mobile-grid" style={{
            gridTemplateColumns: column(),
            gridTemplateRows:column(),
            // width:`${(60 * grid) + 5}px`
        }}
        >
            {renderBox()}
        </div>
    )
}

GameBoard.propTypes ={
    column:PropTypes.func.isRequired,
    gridNumber:PropTypes.number.isRequired,
    playerSelected:PropTypes.bool.isRequired,
    playerError:PropTypes.bool.isRequired, 
    foodLocation:PropTypes.arrayOf(PropTypes.number).isRequired,
    validGrids:PropTypes.arrayOf(PropTypes.number).isRequired, 
    selectPlayer:PropTypes.func.isRequired, 
    movePlayer:PropTypes.func.isRequired
}
