import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./index.css";
import { useSelector } from "react-redux";
const contractModel = require('./contractModel.js');


function App(){

    const [generated, setGenerated] = useState(false);
    const [imageLink,setImageLink] = useState("");
    const [nftParameters, setNftParameters] = useState("");
    const [loadingText, setLoadingText] = useState("Your Nft is being Generated...");
    const { isConnected } = useSelector((state) => state.isConnected);

    useEffect(() => {}, [generated,loadingText,isConnected,imageLink]);

    let navigate = useNavigate();

    const generateNft = async () => {
        const link = await axios.get(`http://localhost:3001/?aiParams=${nftParameters}`);
        setImageLink(link.data);
    }

    const handleChange = (e) =>{
        setNftParameters(e.target.value);
    }
    

    const handleSubmit = () => {
        if(nftParameters == ""){

        }
        else{
            generateNft().then((data) => {
                setLoadingText("Your nft is ready!");
            });
            setGenerated(true);
        }
    }

    const handleMint = async () => {
        if(isConnected){
            const result = await contractModel.mint();
            if(result){
                const encodedLink = encodeURIComponent(imageLink);
                const respose =  await axios.post(`http://localhost:3001/?link=${encodedLink}`);
                navigate('/mynfts');
            }
        }
        else{
            setLoadingText("Connect your wallet first!");
        }
       
    }
    if(!generated){
        return (
            <div>
                <p className="mainText">
                    Mint your ideas!
                </p> 
                <p className="subText">
                    Ai generated Nfts
                </p>
                <div className="generateBar">
                    <input onChange={handleChange} className="textInput" placeholder="Eg. Bored monkey wearing a rolex"></input>
                    <button onClick={handleSubmit} className="generateButton"><img src="../UI/button4.png"/></button>
                </div>
            </div>
            );
    }
    else{
        return(
            <div className="mintDiv">
                <p className="generatedText">{loadingText}</p>
                <img className="imageNft" src={imageLink}/>
                <button className="mintButton" onClick={handleMint}><img src={"../UI/Button3.png"}/></button>
            </div>
        );
        
    }
    
}

export default App;