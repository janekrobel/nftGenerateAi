import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./index.css";
import { setIsConnected } from './metamaskReducer';
const contractModel = require('./contractModel.js');

const Header = () => {
    const { isConnected } = useSelector((state) => state.isConnected);
    const dispatch = useDispatch();
    useEffect(() => {}, [isConnected]);

    const handleMetamask = async () =>{
        if(isConnected){
            contractModel.disconnectToMetamask();
            dispatch(setIsConnected(false));
        }
        else{
            if(await  contractModel.connectToMetamask()){
                dispatch(setIsConnected(true));
            }
        }
    }

    return(
        <div className="header">
        <Link to="/"className="menuLink">Home</Link><Link to='/mynfts' className="menuLink">My Nfts</Link>
        <button onClick={handleMetamask} className="MetamaskBtn"><img src={`../UI/Button${isConnected?2:1}.png`}/></button>
        </div> 
    );
}

export default Header; 