import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import '../../style/error404.scss'

const NotFound = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Error page 404"
                    />
                <title>Not found 404</title>
            </Helmet>
            <ErrorMessage/>
            <p  style={{'textAlign':"center", 'fontWeight':"bold", "fontSize": "24px", "marginBottom": '10px', 'marginTop': '30px'}}>Page doesn`t exist</p>
            <Link
                className="errorPage" 
                to="/">Back to main page</Link>
        </div>
    )
    
}

export default NotFound;