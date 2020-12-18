import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Favorites.css';
import {connect} from 'react-redux'
import { nameList, removeMovie } from '../../redux/actions';


class Favorites extends Component {
    state = {
    
    }

    removeListMovies = (id) =>{
        this.props.removeMovie(id)
    }

    nameListHandler = (e) =>{
        this.props.nameList(e.target.value)
        console.log('listInput',e.target.value, this.props.listPage)
    }

    savedListHandler = () =>{
        fetch("https://acb-api.algoritmika.org/api/movies/list/"
        ,{
            method:'POST',
            headers:{ 
                "Content-type": "application/json"},
            body: JSON.stringify(this.props.listPage)
        }
        ).then(promise => promise.json())
        .then((data)=>{
            console.log('fetch-post',data)
            this.setState({link:data.id})
        })
    }

    render() { 
        return (
            <div className="favorites">
                <input 
                 className="favorites__name"
                 value={this.props.listPage.title}
                 onChange={(e)=>{this.nameListHandler(e)}}
                  />
                <ul className="favorites__list">
                    {this.props.listMovies.map((item) => {
                        return <li key={item.imdbID}>
                            {item.Title} ({item.Year}) &nbsp;
                            <button onClick={()=>{this.removeListMovies(item.imdbID)}}>Del</button>
                            </li>;
                    })}
                </ul>
                { this.state.link? 
                <Link to={`/${this.state.link}`}>К списку Фильмов</Link> :
                 <button type="button"
                 className="favorites__save"
                 onClick={()=>{this.savedListHandler()}}
                 >Сохранить список</button>}
            </div>
        );
    }
}


const mapStateToProps = (state) =>{
        return{
            listMovies: state.listMovies,
            listPage: state.listPage
        }
}
 
const mapDispatchToProps= (dispatch) =>{
    return{
        removeMovie:(id) => dispatch(removeMovie(id)),
        nameList: (input) => dispatch(nameList(input))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Favorites);