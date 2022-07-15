import { run, network } from "hardhat";
// import { networkConfig } from "../helper-hardhat-config";

export const verify = async (contractAddress: any, args: any) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        console.log(error)
        
    }
}
