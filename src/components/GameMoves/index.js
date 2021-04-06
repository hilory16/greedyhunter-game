import React from 'react';
import PropTypes from 'prop-types'
import './style.scss';

export default function GameMoves({grid, totalMoves}) {
    return (
        <div className="meta bottom d-flex jsutify-content-evenly align-items-center">
            <div className="max__moves data pl-3">Maximum moves: <span>{Math.ceil(grid * grid / 2)} </span></div>
            <div className="total__moves data pr-3">Total moves: <span>{totalMoves}</span></div>
        </div>
    )
}

GameMoves.propTypes ={
    grid:PropTypes.number.isRequired,
    totalMoves:PropTypes.number.isRequired
}
