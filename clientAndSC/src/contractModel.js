const ethers = require('ethers');
const abi = require('./artifacts/contracts/AiNft.sol/AiNft.json');

let provider;
let signer;
let contractAddress = "0x90072B47Dd9FB99383e391FaF12Ffc436df1571A";
let infuraUrl = "https://goerli.infura.io/v3/a89fc1de7ad2450da2ca305a134730be";

exports.disconnectToMetamask = () => {
    provider = ""
    signer = ""
}

exports.connectToMetamask = async () => {
    if(window.ethereum) {
        try{
            window.ethereum.request({ method: "eth_requestAccounts" });
            provider = new ethers.providers.JsonRpcProvider(infuraUrl);
            signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
            return true;
        }
        catch(error){
            return false;
        }
    }
}

exports.mint = async () => {
    try{
        if(signer && provider){
            const aiNftContract = new ethers.Contract(contractAddress,abi.abi,provider);
            const options = {value: ethers.utils.parseEther("0")};
            const response = await aiNftContract.connect(signer).mint(options);
            const events  = await response.wait();
            return true;
        }
    }
    catch(err){
        return false; 
    }        
}
exports.getAllIds = async () => {
    let account = signer.getAddress();
    try{
        const aiNftContract = new ethers.Contract(contractAddress,abi.abi,provider);
        const response = await aiNftContract.getOwnedNFTIds(account);
        return response;
    }
    catch(err){
        console.log(err);
        return false;
    }

    
}




