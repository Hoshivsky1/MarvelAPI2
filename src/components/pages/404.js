import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

import '../../style/error404.scss'

const PageError404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p  style={{'textAlign':"center", 'fontWeight':"bold", "fontSize": "24px", "marginBottom": '10px', 'marginTop': '30px'}}>Page doesn`t exist</p>
            <Link
                className="errorPage" 
                to="/">Back to main page</Link>
        </div>
    )
    
}

export default PageError404;