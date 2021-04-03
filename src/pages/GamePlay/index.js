import React, { Component } from 'react';
import GamePlay from '../../assets/img/gameplay.jpg';
import Heart from '../../assets/img/heart.svg';
import Food from '../../assets/img/food.svg';
import Character from '../../assets/img/character.svg'
import './style.scss';

export default class Index extends Component {

    state={
        gridNumber:100,
        food:10,
        foodLocation:[],
        playerPosition:'',
        playerSelected:false,
        playerError:false,
        validGrids:[]
    }

    componentDidMount(){
        console.log(this.placeFood())
        this.setState({
            foodLocation:this.placeFood()
        })
    }

    placeFood = () =>{
        const randomPlace = []
        for(let i = 1; i <= this.state.food; i++){
            const randomNumber = Math.floor(Math.random() * 101)
            // const exist = randomPlace.includes(i);
            randomPlace.push(randomNumber)
        }
        const playerPosition = Math.floor(Math.random() * 101)
        this.setState({playerPosition})
        return randomPlace
        
        // 
    }

    selectFood = (target) =>{
        if(this.state.playerSelected){
            this.setState({playerError:false})

            const foods = this.state.foodLocation
            const exist = foods.includes(target);
            if(!exist && !this.state.validGrids.includes(target)) return null

            var removed = foods.splice(this.state.foodLocation.indexOf(target),1);
            this.setState({foodLocation:foods,playerPosition:target},this.selectPlayer())
            
            

        }else{
            this.setState({playerError:true})
        }
    }

    selectPlayer = () =>{
        const {playerPosition, food,playerSelected} = this.state
        this.setState({playerSelected:!playerSelected})
        const activeFields = []
        const top = playerPosition - food
        const bottom = playerPosition + food
        activeFields.push(top-1,top, top + 1, playerPosition -1, playerPosition + 1, bottom -1, bottom, bottom + 1)
        this.setState({validGrids:activeFields})
        console.log(playerPosition, food,playerSelected)
    }
    renderBox = () =>{
        const array = []
        for(let i = 1; i <= this.state.gridNumber; i++){
            array.push(i)
        }
        return array.map((item, i) =>{
            
            if(this.state.playerPosition == i) return<div className={`board__box d-flex align-items-center justify-content-center ${this.state.playerError ? 'player__error' : ''} ${this.state.playerSelected ? 'player__selected' : ''}`} onClick={() =>  this.selectPlayer()}>
                <img src={Character} alt="" className={`character__play`}/>
            </div>
            return(
                <div className={`board__box d-flex align-items-center justify-content-center ${this.state.playerSelected ? 'player__active' : ''} ${this.state.validGrids.includes(i) ? 'player__possible' : ''}`} onClick={() =>this.selectFood(i)}>
                    <img src={Food} alt="" className={`${this.state.foodLocation.includes(i) ? '' : 'd-none'}`}/>
                    {
                        // <img src={Food} alt="" className={`${this.state.foodLocation.includes(i) ? '' : 'd-none'}`}/>
                        // <img src={Food} alt="" className={`${this.state.foodLocation.includes(i) ? '' : 'd-none'}`}/>
                    }
                    
                </div>
            )
        })
        
    }
    render() {
        // console.log(this.state.validGrids)
        return (
            <section className="gameplay d-flex align-items-center justify-content-center">
                <div className="gameboard">
                    <div className="meta d-flex jsutify-content-evenly align-items-center">
                        <div className="grid_number data pl-3">Grid: <span>10 x 10</span></div>
                        <div className="d-flex align-items-center life">
                            <img src={Heart} alt="heart" />
                            <div className="meter">
                                <div className="content">

                                </div>
                            </div>
                        </div>
                        <div className="time data pr-3">Time spent: <span>00:48 secs</span></div>
                    </div>
                    <div className="board__item ">
                        {this.renderBox()}
                    </div>
                </div>
            </section>
        )
    }
}
