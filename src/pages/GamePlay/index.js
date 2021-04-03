import React, { Component } from 'react';
import GamePlay from '../../assets/img/gameplay.jpg';
import Heart from '../../assets/img/heart.svg';
import Food from '../../assets/img/food.svg';
import Character from '../../assets/img/character.svg'
import './style.scss';

export default class Index extends Component {

    state={
        gridNumber:"",
        food:10,
        grid:10,
        foodLocation:[],
        playerPosition:'',
        playerSelected:false,
        playerError:false,
        validGrids:[],
        totalMoves:0,
        topMoveBarrier:[],
        bottomMoveBarrier:[],
        leftMoveBarrier:[],
        rigthMoveBarrier:[]
    }

    componentDidMount(){
        // console.log(this.placeFood())
        this.setMoveBarrier()
        this.setState({
            foodLocation:this.placeFood(),
            gridNumber:this.state.grid * this.state.grid
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

    MovePlayer = (target) =>{
        const {playerSelected, foodLocation, totalMoves} =  this.state
        if(playerSelected){
            this.setState({playerError:false})

            const foods = this.state.foodLocation
            const exist = foods.includes(target);
            if(!this.state.validGrids.includes(target)) return null
            if(!exist) return this.setState({playerPosition:target, totalMoves: totalMoves + 1},this.selectPlayer("auto",target))

            var removed = foods.splice(foodLocation.indexOf(target),1);
            this.setState({foodLocation:foods,playerPosition:target, totalMoves: totalMoves + 1},this.selectPlayer("auto",target))
            
            
            

        }else{
            this.setState({playerError:true})
        }
    }
    // playerSelected ? activeFields : []playerSelected ? activeFields : []

    selectPlayer = (type,target) =>{
        const {playerPosition, food,playerSelected, topMoveBarrier, bottomMoveBarrier, leftMoveBarrier, rightMoveBarrier} = this.state
        this.setState({playerSelected:type === "auto" ? true : !playerSelected})

        const activePosition = type === "auto" ? target  : playerPosition
        let activeBarrier = ''
        if(topMoveBarrier.includes(activePosition)){
            const index = topMoveBarrier.indexOf(activePosition)
            index === 0 ? activeBarrier = 'top-left': index === topMoveBarrier.length - 1 ? activeBarrier = 'top-right' :  activeBarrier = 'top'
        }else if(bottomMoveBarrier.includes(activePosition)){
            const index = bottomMoveBarrier.indexOf(activePosition)
            index === 0 ? activeBarrier = 'bottom-left': index === bottomMoveBarrier.length - 1 ? activeBarrier = 'bottom-right' :  activeBarrier = 'bottom'
        }else if(leftMoveBarrier.includes(activePosition)){
            activeBarrier = 'left'
        }else if(rightMoveBarrier.includes(activePosition)){
            activeBarrier = 'right'
        }
        console.log(topMoveBarrier, bottomMoveBarrier, leftMoveBarrier, rightMoveBarrier)

        

        const activeFields = []
        const top = activePosition - food
        const bottom = activePosition + food
        switch(activeBarrier){
            case "top":
                activeFields.push(activePosition -1, activePosition + 1, bottom -1, bottom, bottom + 1);
                break;
            case "top-left":
                activeFields.push(activePosition + 1,bottom, bottom + 1);
                break;
            case "top-right":
                activeFields.push(activePosition -1, bottom -1, bottom);
                break;
            case "bottom":
                activeFields.push(top - 1,top, top + 1, activePosition -1, activePosition + 1)
                break;
            case "bottom-left":
                activeFields.push(top, top + 1, activePosition + 1);
                break;
            case "bottom-right":
                activeFields.push(top - 1,top, activePosition -1);
                break;
            case "left":
                activeFields.push(top, top + 1, activePosition + 1,bottom, bottom + 1)
                break;
            case "right":
                activeFields.push(top - 1,top,activePosition -1,bottom -1, bottom)
                break;
            default:
                activeFields.push(top - 1,top, top + 1, activePosition -1, activePosition + 1, bottom -1, bottom, bottom + 1)
        }
        
        this.setState({validGrids:type === "auto" ?  activeFields : !playerSelected ? activeFields : []})
        // console.log(playerSelected)
        
    }

    setMoveBarrier = () =>{
        let array = []
        const {grid} = this.state

        //SET TOP MOVE BARRIER
        for(let i = 1; i <= grid; i++){
            array.push(i)
        }
        this.setState({topMoveBarrier:array})
        array = []

        //SET BOTTOM MOVE BARRIER
        for(let i = (grid * grid) - grid + 1; i <= (grid * grid); i++){
            array.push(i)
        }
        this.setState({bottomMoveBarrier:array})
        array = []

        //SET LEFT MOVE BARRIER
        for(let i = 1; i <= grid - 2; i++){
            array.push((grid * i) + 1)
        }
        this.setState({leftMoveBarrier:array})
        array = []
        
        //SET RIGHT MOVE BARRIER
        for(let i = 2; i <= grid - 1; i++){
            array.push(grid * i)
        }
        this.setState({rightMoveBarrier:array})

        

        // console.log(array)


        
    }

    renderBox = () =>{
        const array = []
        for(let i = 1; i <= this.state.gridNumber; i++){
            array.push(i)
        }
        return array.map((item, i) =>{
            
            if(this.state.playerPosition == (i + 1)) return<div className={`board__box d-flex align-items-center justify-content-center ${this.state.playerError ? 'player__error' : ''} ${this.state.playerSelected ? 'player__selected' : ''}`} onClick={() =>  this.selectPlayer()}>
                <img src={Character} alt="" className={`character__play`}/>
            </div>
            return(
                <div className={`board__box d-flex align-items-center justify-content-center ${this.state.playerSelected ? 'player__active' : ''} ${this.state.validGrids.includes(i + 1) ? 'player__possible' : ''}`} onClick={() =>this.MovePlayer(i + 1)}>
                    <img src={Food} alt="" className={`${this.state.foodLocation.includes(i + 1) ? '' : 'd-none'}`}/>
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
        const {playerPosition, food,playerSelected, validGrids, foodLocation, gridNumber, grid, totalMoves} = this.state
        // console.log(playerPosition, validGrids,playerSelected, foodLocation)
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

                    <div className="meta d-flex jsutify-content-evenly align-items-center">
                        <div className="max__moves data pl-3">Maximum moves: <span>{Math.ceil(grid * grid / 2)} </span></div>
                        <div className="total__moves data pr-3">Total moves: <span>{totalMoves}</span></div>
                    </div>
                </div>
            </section>
        )
    }
}
