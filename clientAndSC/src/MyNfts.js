import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";
const contractModel = require("./contractModel.js");

function MyNfts(){
    const [listOfIds, setListOfIds] = useState([]);
    const [isRendered,setIsRendered] = useState(false);

    const { isConnected } = useSelector((state) => state.isConnected);

    useEffect(() => {
        if(isConnected && !isRendered) {
            ReadLinks();
        }
    }, [isConnected, isRendered,listOfIds]);

    const ReadLinks = () => {
        contractModel.getAllIds().then(async (_listOfIds) => {
            setListOfIds(_listOfIds);
            setIsRendered(true);
        }).catch(error => {
            console.log(error);
        });
    }

    if(!isConnected){
        return(
            <>
                <p className="myNftText">My Nfts:</p>
                <p className="errorMessage">*Connect to Metamask First*</p>
            </>
        );
    }
    else if(isConnected && !isRendered){
        return(
            <>
                <p className="myNftText">My Nfts:</p>
                <p className="errorMessage">Loading...</p>
            </>
        );
    }
    else{
        return(
            <>
                <p className="myNftText">My Nfts:</p>
                {listOfIds.map((id) => {
                    return <img className="myNftImage" src={`http://localhost:3001/${id}`} alt={`NFT with ID ${id}`}/>;
                })}
            </>
        );
    }
}
export default MyNfts;
