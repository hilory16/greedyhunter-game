import React, { Component } from 'react';
import GameMoves from '../../components/GameMoves';
import PlayInformation from '../../components/PlayInformation';
import GameBoard from '../../components/GameBoard';
import GamePlay from '../../assets/img/gameplay.jpg';

import './style.scss';

export default class Index extends Component {
    localStorageGrid = localStorage.getItem('grid')
    parsedStorage =  parseInt(this.localStorageGrid)
    state={
        gridNumber:this.parsedStorage * this.parsedStorage,
        food:this.parsedStorage,
        grid:this.parsedStorage,
        foodLocation:[],
        playerPosition:'',
        playerSelected:false,
        playerError:false,
        validGrids:[],
        totalMoves:0,
        topMoveBarrier:[],
        bottomMoveBarrier:[],
        leftMoveBarrier:[],
        rigthMoveBarrier:[],
        seconds: this.parsedStorage * this.parsedStorage
    }

    componentDidMount(){
        const localStorageGrid = localStorage.getItem('grid')
        if(!localStorageGrid) this.props.history.push('/')
        this.setMoveBarrier()
        this.setState({
            foodLocation:this.placeFood()
        })
        localStorage.removeItem('grid')
    }

    componentDidUpdate(prevProps, prevState){
        const{foodLocation, playerPosition, totalMoves, maxMoves, grid,seconds, food} =this.state
        const gameDetails = {
            foodWon:grid - foodLocation.length,
            totalFood:grid,
            timeSpent:(grid * grid ) - seconds
        }
        const gameDetailsString = JSON.stringify(gameDetails)

        if(prevState.playerPosition !== playerPosition ){
            const maxMoves = Math.ceil(grid * grid / 2)
            if(foodLocation.length < 1 && food){
                localStorage.setItem('game_details', gameDetailsString)
                return this.props.history.push('/gamewin')
            } 
            if(totalMoves >= maxMoves){
                if(foodLocation.length > 0){
                    localStorage.setItem('game_details', gameDetailsString)
                    return this.props.history.push('/gameover')
                } else{
                    localStorage.setItem('game_details', gameDetailsString)
                    return this.props.history.push('/gamewin')
                }
            } 
        }

        if(prevState.seconds !== seconds){
            if(seconds == 0){
                localStorage.setItem('game_details', gameDetailsString)
                return this.props.history.push('/gameover')
            } 
        }   
    }

    placeFood = () =>{
        const randomPlace = []
        while(randomPlace.length < this.state.food + 1){
            var randomNumber =Math.floor(Math.random() * this.state.gridNumber + 1)
            if(randomPlace.indexOf(randomNumber) === -1) randomPlace.push(randomNumber);
        }
        const playerPosition = randomPlace.pop()
        this.setState({playerPosition})
        return randomPlace
    }

    movePlayer = (target) =>{
        const {playerSelected, foodLocation, totalMoves, grid} =  this.state 

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

        const activeFields = []
        const top = activePosition - food
        const bottom = activePosition + food
        // console.log(bottom)
        switch(activeBarrier){
            case "top":
                activeFields.push(activePosition -1, activePosition + 1,bottom);
                break;
            case "top-left":
                activeFields.push(activePosition + 1,bottom);
                break;
            case "top-right":
                activeFields.push(activePosition -1, bottom);
                break;
            case "bottom":
                activeFields.push(top, activePosition -1, activePosition + 1)
                break;
            case "bottom-left":
                activeFields.push(top, activePosition + 1);
                break;
            case "bottom-right":
                activeFields.push(top, activePosition -1);
                break;
            case "left":
                activeFields.push(top, activePosition + 1,bottom)
                break;
            case "right":
                activeFields.push(top,activePosition -1, bottom)
                break;
            default:
                activeFields.push(top, activePosition -1, activePosition + 1, bottom)
        }
        
        this.setState({validGrids:type === "auto" ?  activeFields : !playerSelected ? activeFields : []})
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
        
    }

    setColumnNumber = () =>{
        const {grid} = this.state
        let css = ""
        const deviceWidth = window.screen.width
        let boxWidth =""
        
        // FOR MOBILE 5 - 7 grid
        if( deviceWidth < 768 && grid < 8){
            boxWidth = ' 45px'
        }else if( deviceWidth < 768  && grid < 10 && grid > 7){
            // FOR MOBILE 8 - 9
            boxWidth = ' 35px'
        }else if(deviceWidth < 768  && grid < 13 && grid > 9 ){
            //FOR MOBILE 10 - 11
            boxWidth = ' 28px'
        }else if(deviceWidth < 768  && grid > 11){
            //FOR MOBILE 12
            boxWidth = ' 25px'
        }
        else if(deviceWidth > 767  && deviceWidth < 1024 ){
            //FOR TABLET, ALL GRID
            boxWidth = ' 55px'
        }
        else{
            //FOR DESKTOP, ALL GRID
            boxWidth = ' 60px'
        }
       
        // console.log(boxWidth)
        for(let i =0; i< this.state.grid; i++){
            css+=boxWidth
        }  
        return css
    }

    setSeconds = () =>{
        let seconds = this.state.seconds - 1;
        this.setState({
            seconds: seconds,
        });
    }
   
    render() {
        const {playerPosition, food,playerSelected, validGrids, foodLocation, gridNumber, grid, totalMoves,seconds, playerError} = this.state
        // console.log(seconds / (grid * grid) * 100)
        
        return (
            <section className={`gameplay d-flex  justify-content-center ${grid < 9 ? 'align-items-center' :''}`}>
                
                <div className="gameboard">
                    <PlayInformation grid={grid} seconds={seconds} setSeconds={(seconds) => this.setSeconds(seconds)}  props={this.props}/>
                    <GameBoard 
                        column= {this.setColumnNumber} 
                        gridNumber={gridNumber} 
                        playerPosition={playerPosition} 
                        playerSelected={playerSelected} 
                        playerError={playerError} 
                        foodLocation={foodLocation} 
                        validGrids={validGrids}
                        selectPlayer ={() =>this.selectPlayer()}
                        movePlayer ={(target) => this.movePlayer(target)}
                    />
                    <GameMoves grid={grid} totalMoves={totalMoves}/>
                </div>
            </section>
        )
    }
}
