import { NavLink } from "react-router-dom";
import styles from './navigation.module.css'

export const Navigation = () => {
    return ( 
        <ol className={styles.navigation}>
                <li><NavLink to="/">Main</NavLink></li>
                <li><NavLink to="/products">Countries</NavLink></li>
                <li><NavLink to="error404">Info</NavLink></li>
            </ol>
     );
}
