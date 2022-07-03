const { network} = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    const arguments = ["BERENU", "BRN"];
    const waitBlockConfirmations = 1;
    
    const berenu = await deploy("Berenu", {
        from: deployer,
        args: arguments,
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