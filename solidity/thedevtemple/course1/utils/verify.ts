import { run } from "hardhat";

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
