const Berenu = artifacts.require('Berenu');

contract('Berenu', (accounts) => {
  
  describe('Deployment', () => {
    it('Contract has been deployed successfully', async () => {
      const berenuContract = await Berenu.deployed();
      assert.ok(berenuContract);
    });
  });
});
