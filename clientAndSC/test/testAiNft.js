const hardhat = require("hardhat");

async function test(addr1){
    const [owner] = await ethers.getSigners();

    let AiNft = await ethers.getContractFactory("AiNft");

    AiNft = await AiNft.deploy();

    
    await AiNft.mint("randomUrl");
    await AiNft.mint("randomUrl2");
    await AiNft.mint("randomUrl3");
    await AiNft.setApprovalForAll(addr1,false);
    console.log(await AiNft.isApprovedForAll("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",addr1));
}

test("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");