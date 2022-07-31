import { useState, useEffect } from 'react';

import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';

const RandomChar = (props) => {
    
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);
        
        return () => {
            clearInterval(timerId)
        }
        // eslint-disable-next-line
    }, [])

    const onCharLoaded = (char) => {
        if(char.description === ''){
            char.description = "There is no data about this character" 
        } 
        if(char.description.length > 205 ){
            char.description = char.description.slice(0, 205) + '...';
        }
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true)
    }

    const onError = () => { 
        setLoading(false);
        setError(true);
    }
    
    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)+ 1011000 );
        onCharLoading();
        marvelService
            .getCharacters(id)
            .then(onCharLoaded)
            .catch(onError);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null; 

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View =({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    
    const imgUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    let imgStyle = {objectFit: "cover"}
    if(char.thumbnail === imgUrl ) {
        imgStyle = {objectFit: "contain"}
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" style={imgStyle} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;