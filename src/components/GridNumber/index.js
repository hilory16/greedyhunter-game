import React,{useState} from 'react';
import CaretUp from '../../assets/img/caret-up.svg';
import CaretDown from '../../assets/img/caret-down.svg';
import PropTypes from 'prop-types'
import './style.scss'

export default function GridNumber({ grid, changeInput, adjustValue}) {

    return (
        <div>
            <div className="grid__number">
                <input type="number" className="hide-number " value={grid} onChange={e => changeInput(e)}/>
                <div className="carets">
                    <img src={CaretUp} alt="caret" className="d-block caret" onClick={() => adjustValue("increment")}/>
                    <img src={CaretUp} alt="caret" className="d-block caret caret__down" onClick={() => adjustValue("decrement")}/>
                </div>
                
                
            </div>
        </div>

    )
}

GridNumber.propTypes ={
    grid:PropTypes.number.isRequired,
    changeInput:PropTypes.func.isRequired,
    adjustValue:PropTypes.func.isRequired
}
