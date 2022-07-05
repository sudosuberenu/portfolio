import { HardhatRuntimeEnvironment } from 'hardhat/types';

module.exports = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = ["BERENU", "BRN"];
    const waitBlockConfirmations = 1;

    const berenuContract = await deploy("Berenu", {
      from: deployer,
      args: args,
      log: true,
      waitConfirmations: waitBlockConfirmations,
    });
    
    // Verify the deployment
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    //     log("Verifying...")
    //     await verify(berenu.address, arguments)
    // }
}

module.exports.tags = ["all", "berenu"]