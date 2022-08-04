import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner';
import PageError404 from './404';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useParams, Link } from 'react-router-dom';

import './singleComic.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
        // eslint-disable-next-line
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const idСomic = window.location.pathname.replace(/\D/g, '')
    const urlPath = idСomic === window.location.pathname.slice(8) ? true : false
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null; 
    
    return (
        <>  
            {errorMessage}
            {urlPath ? content : <PageError404/>}
            {loading ? <Spinner/>: null}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price } = comic;
    
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}
SingleComicPage.propTypes = {
    comicId: PropTypes.number
}

export default SingleComicPage;
