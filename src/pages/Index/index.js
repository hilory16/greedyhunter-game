import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pattern from '../../assets/img/dotted-pattern.svg';
import Character from '../../assets/img/character.svg';
import CaretUp from '../../assets/img/caret-up.svg';
import CaretDown from '../../assets/img/caret-down.svg';

import './style.scss'

export default class Index extends Component {
    render() {
        return (
            <section className="bg-pattern">
                <div className="container">
                    <div className="row bg-pattern">
                        <div className="col-lg-3 h-100 d-flex align-items-center">
                            <div className="pattern w-100"></div>
                        </div>
                        <div className="col-lg-6">
                            <div className="character">
                                <img src={Character} alt="character" className="d-block mx-auto"/>
                            </div>
                            <h1 className="name">Greedy Hunter</h1>
                            <h3 className="instruction">The aim is to eat all the food in record time</h3>
                            <h3 className="instruction">Confiure your game grid below 👇🏼</h3>

                            <div className="set__grid d-flex justify-content-center">
                                <div className=" d-flex align-items-center">
                                    <h4 className="0">Game grid</h4>
                                    <div className="grid__number">
                                        <input type="number" className="hide-number"/>
                                        <div className="carets">
                                            <img src={CaretUp} alt="caret" className="d-block caret"/>
                                            <img src={CaretDown} alt="caret" className="d-block caret caret__down"/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <Link to="/gameplay" className="button d-flex align-items-center justify-content-center mx-auto">
                                <p className="mb-0 text-center">Start game</p>
                            </Link>
                            
                        </div>
                        <div className="col-lg-3 h-100 d-flex align-items-center">
                            <div className="pattern w-100" ></div>
                        </div>
                    </div>
                </div>
            </section>
            
        )
    }
}
