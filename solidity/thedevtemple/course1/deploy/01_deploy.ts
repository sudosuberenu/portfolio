import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { verify } from '../utils/verify'

module.exports = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const args: any[] = [];
    const waitBlockConfirmations = 1;

    const contract = await deploy("TDTNft1", {
      from: deployer,
      args: args,
      log: true,
      waitConfirmations: waitBlockConfirmations,
    });

    // Verify the deployment
    // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    // if (process.env.ETHERSCAN_API_KEY) {
    //     // log("Verifying...")
        await verify(contract.address, args)
    // }
}

module.exports.tags = ["all", "contract"]