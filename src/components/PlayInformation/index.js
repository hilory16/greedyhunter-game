import React from 'react';
import PropTypes from 'prop-types'
import Timer from '../Timer'
import Heart from '../../assets/img/heart.svg';

import './style.scss'

export default function PlayInformation({grid, seconds, setSeconds, props}) {
    return (
        <div className="play__information">
            <div className="meta d-flex jsutify-content-evenly align-items-center top">
                <div className={`grid_number data  ${grid > 7 ? 'pl-md-3 ': 'mr-4'}`}>Grid: <span>{grid} x {grid}</span></div>
                <div className="d-md-flex align-items-center life d-none">
                    <img src={Heart} alt="heart" />
                    <div className="meter">
                        <div className="content" style={{width:`${seconds / (grid * grid) * 100}%`}}>

                        </div>
                    </div>
                </div>
                <Timer props={props} seconds={seconds} grid={grid} setSeconds={(seconds) => setSeconds(seconds)}/>
            </div>

            <div className="meta d-flex justify-content-center align-items-center mb-3 mb-md-0">
                <div className="d-flex align-items-center life d-md-none ">
                    <img src={Heart} alt="heart" />
                    <div className="meter">
                        <div className="content" style={{width:`${seconds / (grid * grid) * 100}%`}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

PlayInformation.propTypes ={
    grid:PropTypes.number.isRequired,
    seconds:PropTypes.number.isRequired,
    setSeconds:PropTypes.func.isRequired,
    props:PropTypes.object.isRequired
}

