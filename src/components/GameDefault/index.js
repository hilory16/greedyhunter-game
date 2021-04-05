import React,{Component} from 'react';
import Pattern from '../../assets/img/dotted-pattern.svg';
import Character from '../../assets/img/character.svg';
import GridNumber from '../../components/GridNumber'
import './style.scss';

export default class Index extends Component {
    state= {
        grid:10,
        error: {
            status:false,
            message:''
        }
    }

    changeInput = (e) =>{
        // console.log(e.target.value)
        if( e.target.value > 12)  return this.setState({grid:12,error:{status:true, message:"Please enter a value between 5 - 12!"}})
        if(e.target.value < 5 && e.target.value != 1 && e.target.value !== "") return this.setState({grid:5,error:{status:true, message:"Please enter a value between 5 - 12!"}})
        this.setState({grid:e.target.value, error:{staus:false, message:""}})
    }

    adjustValue = (type) =>{
        const {grid} = this.state
        const parsedGrid = parseInt(grid)
        // console.log(grid)
        if(parsedGrid + 1 > 12 && type === 'increment') return this.setState({error:{status:true, message:"Please enter a value between 5 - 12!"}})
        if(parsedGrid <= 5 && type === 'decrement') return this.setState({error:{status:true, message:"Please enter a value between 5 - 12!"}})
        
        switch(type){
            case "increment":
                this.setState({grid:parsedGrid === 1 || grid === "" ? 5 :parsedGrid + 1, error:{status:false, message:""}})
                break;

            case "decrement":
                this.setState({grid:parsedGrid === 1 || grid === "" ? 5 : parsedGrid - 1, error:{status:false, message:""}})
        }
       
    }
    setDefaultGrid = () =>{
        const {grid} = this.state
        if(grid < 5) return this.setState({grid:5})
        if(grid > 12) return this.setState({grid:12})
    }
    
    startGame = () =>{
        const {grid} = this.state
        if(grid < 5 || grid > 12) return this.setState({error:{status:true, message:"Please enter a value between 5 - 12!"}})
        localStorage.setItem('grid', grid)
        this.props.props.history.push('/gameplay')
    }
    render(){
        const {pageName, additionalInfo} = this.props
        const {error,grid} = this.state
        // console.log(this.props)
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
                                <h1 className="name">{pageName}</h1>
                                {additionalInfo}
                                <div className="set__grid ">
                                    <div className="d-flex justify-content-center mb-1">
                                        <div className=" d-flex align-items-center" onMouseLeave={this.setDefaultGrid}>
                                            <h4 className="0">Game grid</h4>
                                            <GridNumber grid={grid} changeInput={this.changeInput} adjustValue={this.adjustValue} />
                                        </div>
                                    </div>
                                    {
                                        error.status
                                        ?<p className="text-error text-center mb-0 text-danger ">{error.message}</p>
                                        : null
                                    }
                                </div>

                                <div className="button d-flex align-items-center justify-content-center mx-auto pointer" onClick={this.startGame}>
                                    <p className="mb-0 text-center">Start game</p>
                                </div>
                                
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
