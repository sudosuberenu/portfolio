const BerenuNft = artifacts.require('BerenuNft');
const Wallet = artifacts.require('Wallet');
const WalletImplementer = artifacts.require('WalletImplementer');

contract('BerenuNft', (accounts) => {
  
  describe('Deployment', () => {
    it('Contract has been deployed successfully', async () => {
      const berenuNftContract = await BerenuNft.deployed();
      assert.ok(berenuNftContract);
    });
  });

  describe('Method - balanceOf(owner)', () => {
    let berenuNftContract;

    beforeEach(async () => {
      berenuNftContract = await BerenuNft.new();
    });

    it('When a user does not have any token then return 0', async () => {
      const owner = accounts[0];
      const balanceExpected = 0;

      const result = await berenuNftContract.balanceOf(owner);

      assert.equal(result, balanceExpected);
    });

    it('When a user does have 1 token then return 1', async () => {
      const owner = accounts[0];
      const balanceExpected = 1;
      const tokenId = 1;
      await berenuNftContract.mint(owner, tokenId);

      const result = await berenuNftContract.balanceOf(owner);

      assert.equal(result, balanceExpected);
    });

    it('When a user does have 100 token then return 1', async () => {
      const owner = accounts[0];
      const balanceExpected = 2;
      const tokenId1 = 1;
      const tokenId2 = 2;
      await berenuNftContract.mint(owner, tokenId1);
      await berenuNftContract.mint(owner, tokenId2);

      const result = await berenuNftContract.balanceOf(owner);

      assert.equal(result, balanceExpected);
    });
  });

  describe('Method - ownerOf(tokenId)', () => {
    let berenuNftContract;

    beforeEach(async () => {
      berenuNftContract = await BerenuNft.new();
    });

    it('When token is owned then return owner', async () => {
      const tokenId = 1;
      const ownerExpected = accounts[0];
      await berenuNftContract.mint(ownerExpected, tokenId);
      
      const owner = await berenuNftContract.ownerOf(tokenId);

      assert.equal(owner, ownerExpected);
    });

    it('When token is not owned then throw error', async () => {
      try {
        const tokenId = 1;
        await berenuNftContract.ownerOf(tokenId);
        assert.fail("This function should fail");
      } catch (error) {
        assert.ok(error);
      }
    });
  });

  describe('Method - safeTransferFrom(from, to, tokenId)', () => {
    let berenuNftContract;
    let wallet;
    let walletImplementer;

    beforeEach(async () => {
      berenuNftContract = await BerenuNft.new();
      wallet = await Wallet.new();
      walletImplementer = await WalletImplementer.new();
    });

    it('When the to is a EOA then throw error', async () => {
      try {
        const from = accounts[0];
        const to = accounts[1];
        const tokenId = 1;

        await berenuNftContract.mint(accounts[0], tokenId);

        await berenuNftContract.safeTransferFrom(from, to, tokenId);

        assert.fail('Function should fail');
      } catch (error) {
        assert.equal(error.reason, "The to address is not an ERC-721 implementer");
      }
    });

    it('When the to is a smart contract but is not an ERC-721 implementer', async () => {
      try {
        const from = accounts[0];
        const to = wallet.address;
        const tokenId = 1;

        await berenuNftContract.mint(accounts[0], tokenId);

        await berenuNftContract.safeTransferFrom(from, to, tokenId);

        assert.fail('Function should fail');
      } catch (error) {
        assert.equal(error.reason, "The to address is not an ERC-721 implementer");
      }
    });

    it('When the to is a smart contract and its an ERC-721 implementer then transfer token', async () => {
      const from = accounts[0];
      const to = walletImplementer.address;
      const tokenId = 1;
      const fromBalanceExpected = 0;
      const toBalanceExpected = 1;

      await berenuNftContract.mint(accounts[0], tokenId);

      await berenuNftContract.safeTransferFrom(from, to, tokenId, {from: from});

      const fromBalance = await berenuNftContract.balanceOf(from);
      const toBalance = await berenuNftContract.balanceOf(to);

      assert.equal(fromBalance, fromBalanceExpected);
      assert.equal(toBalance, toBalanceExpected);
    });
  });

  describe('Method - transferFrom(from, to, tokenId)', () => {
    let berenuNftContract;

    beforeEach(async () => {
      berenuNftContract = await BerenuNft.new();
    });

    it('When the caller is not the owner of the token then throw error', async () => {
      try {
        const from = accounts[0];
        const to = accounts[1];
        const tokenId = 1;

        await berenuNftContract.mint(accounts[1], tokenId);

        await berenuNftContract.transferFrom(from, to, tokenId);
        assert.fail('Function should fail');
      } catch (error) {
        assert.equal(error.reason, "The caller does not own the tokenId")
      }
    });

    it('When the tokenId is not owned then throw error', async () => {
      try {
        const from = accounts[0];
        const to = accounts[1];
        const tokenId = 1;

        await berenuNftContract.transferFrom(from, to, tokenId);
        assert.fail('Function should fail');
      } catch (error) {
        assert.equal(error.reason, "TokenId is not owned by anyone")
      }
    });

    it('When caller is the owner then transfer the token', async () => {
      const from = accounts[0];
      const to = accounts[1];
      const tokenId = 1;
      const receiverBalanceExpected = 1;
      const senderBalanceExpected = 0;

      await berenuNftContract.mint(accounts[0], tokenId);

      await berenuNftContract.transferFrom(from, to, tokenId);
      
      const owner = await berenuNftContract.ownerOf(tokenId);
      const receiverBalance = await berenuNftContract.balanceOf(to);
      const senderBalance = await berenuNftContract.balanceOf(from);

      assert.equal(owner, to);
      assert.equal(receiverBalance, receiverBalanceExpected);
      assert.equal(senderBalance, senderBalanceExpected);
    });
  });

  describe('Method - approve(to, tokenId)', () => {
    let berenuNftContract;

    beforeEach(async () => {
      berenuNftContract = await BerenuNft.new();
    });

    it('When caller is owner then set the approved address', async () => {
      const owner = accounts[0];
      const to = accounts[1];
      const tokenId = 1;
      
      await berenuNftContract.mint(owner, tokenId);

      await berenuNftContract.approve(to, tokenId, {from : owner});
      
      const approved = await berenuNftContract.getApproved(tokenId);

      assert.equal(approved, to);
    });

    it('When caller is not owner then throw error', async () => {
      try {
        const to = accounts[1];
        const tokenId = 1;
        
        await berenuNftContract.mint(to, tokenId);
        await berenuNftContract.approve(to, tokenId);

        assert.fail("This function should fail");
      } catch(error) {
        assert.equal(error.reason, "The caller does not own the tokenId");
      }
    });
  });

  describe('Method - getApproved(tokenId)', () => {
    let berenuNftContract;

    beforeEach(async () => {
      berenuNftContract = await BerenuNft.new();
    });

    it('When tokenId has approved then return it', async () => {
      const tokenId = 1;
      const owner = accounts[0];
      const to = accounts[1];

      await berenuNftContract.mint(owner, tokenId);
      await berenuNftContract.approve(to, tokenId, {from: owner});

      const approved = await berenuNftContract.getApproved(tokenId);

      assert.equal(approved, to);
    });

    it('When tokenId has not approved then return address zero', async () => {
      const tokenId = 1;

      const approved = await berenuNftContract.getApproved(tokenId);

      assert.equal(approved, 0);
    });
  });

  describe('Method - setApprovalForAll(operator, approved)', () => {
    let berenuNftContract;

    beforeEach(async () => {
      berenuNftContract = await BerenuNft.new();
    });

    it('When caller is the owner then approve the operator', async () => {
      const owner = accounts[0];
      const operator = accounts[1];
      const approved = true;

      await berenuNftContract.setApprovalForAll(operator, approved, {from: owner});

      const approve = await berenuNftContract.isApprovedForAll(owner, operator);

      assert.equal(approve, true);
    });

    it('When caller is the owner and want to revoke access to operator then return false', async () => {
      const owner = accounts[0];
      const operator = accounts[1];
      const approved = false;

      await berenuNftContract.setApprovalForAll(operator, approved);

      const approve = await berenuNftContract.isApprovedForAll(owner, operator);

      assert.equal(approve, false);
    });
  });

  describe('Method - isApprovedForAll(owner, operator)', () => {
    let berenuNftContract;

    beforeEach(async () => {
      berenuNftContract = await BerenuNft.new();
    });
    
    it('When is approved then return true', async () => {
      const owner = accounts[0];
      const operator = accounts[1];
      const tokenId = 1;

      await berenuNftContract.mint(owner, tokenId);
      await berenuNftContract.setApprovalForAll(operator, true, {from: owner});

      const approved = await berenuNftContract.isApprovedForAll(owner, operator);

      assert.equal(approved, true);
    });

    it('When is not approved then return false', async () => {
      const owner = accounts[0];
      const operator = accounts[1];

      const approved = await berenuNftContract.isApprovedForAll(owner, operator);

      assert.equal(approved, false);
    });
  });

  describe('Method - safeTransferFrom(from, to, tokenId, data)', () => {
    let berenuNftContract;
    let wallet;
    let walletImplementer;

    beforeEach(async () => {
      berenuNftContract = await BerenuNft.new();
      wallet = await Wallet.new();
      walletImplementer = await WalletImplementer.new();
    });

    it('When the to is a EOA then throw error', async () => {
      try {
        const from = accounts[0];
        const to = accounts[1];
        const tokenId = 1;
        const data = [];

        await berenuNftContract.mint(accounts[0], tokenId);

        await berenuNftContract.safeTransferFrom(from, to, tokenId, data);

        assert.fail('Function should fail');
      } catch (error) {
        assert.equal(error.reason, "The to address is not an ERC-721 implementer");
      }
    });

    it('When the to is a smart contract but is not an ERC-721 implementer', async () => {
      try {
        const from = accounts[0];
        const to = wallet.address;
        const tokenId = 1;
        const data = [];

        await berenuNftContract.mint(accounts[0], tokenId);

        await berenuNftContract.safeTransferFrom(from, to, tokenId, data);

        assert.fail('Function should fail');
      } catch (error) {
        assert.equal(error.reason, "The to address is not an ERC-721 implementer");
      }
    });

    it('When the to is a smart contract and its an ERC-721 implementer then transfer token', async () => {
      const from = accounts[0];
      const to = walletImplementer.address;
      const tokenId = 1;
      const fromBalanceExpected = 0;
      const toBalanceExpected = 1;
      const data = [];

      await berenuNftContract.mint(accounts[0], tokenId);

      await berenuNftContract.safeTransferFrom(from, to, tokenId, data);

      const fromBalance = await berenuNftContract.balanceOf(from);
      const toBalance = await berenuNftContract.balanceOf(to);

      assert.equal(fromBalance, fromBalanceExpected);
      assert.equal(toBalance, toBalanceExpected);
    });
  });

  describe('Event - Transfer(from, to, tokenId)', () => {
    let berenuNftContract;
    let walletImplementer;
    let toWallet;
    const from = accounts[0];
    const to = accounts[1];
    const tokenId = 1;
    const data = [];

    beforeEach(async () => {
      berenuNftContract = await BerenuNft.new();
      walletImplementer = await WalletImplementer.new();
      await berenuNftContract.mint(from, tokenId);
      toWallet = walletImplementer.address;
    });

    it('When safeTransferFrom(from, to, tokenId) is successfully called then emit event', async () => {
      const tx = await berenuNftContract.safeTransferFrom(from, toWallet, tokenId);

      assert.equal(tx.logs[0].event, 'Transfer');
    });

    it('When transferFrom(from, to, tokenId) is successfully called then emit event', async () => {
      const tx = await berenuNftContract.transferFrom(from, to, tokenId);

      assert.equal(tx.logs[0].event, 'Transfer');
    });

    it('When safeTransferFrom(from, to, tokenId, data) is successfully called then emit event', async () => {
      const tx = await berenuNftContract.safeTransferFrom(from, toWallet, tokenId, data);

      assert.equal(tx.logs[0].event, 'Transfer');
    });
  });

  describe('Event - Approval(owner, approved, tokenId)', () => {
    let berenuNftContract;
    const from = accounts[0];
    const to = accounts[1];
    const tokenId = 1;

    before(async () => {
      berenuNftContract = await BerenuNft.new();
      await berenuNftContract.mint(from, tokenId);
    });

    it('When approve(to, tokenId) is successfully called then emit event', async () => {
      const tx = await berenuNftContract.approve(to, tokenId);

      assert.equal(tx.logs[0].event, 'Approval');
    });
  });

  describe('Event - ApprovalForAll(owner, operator, approved)', () => {
    let berenuNftContract;
    const from = accounts[0];
    const to = accounts[1];
    const tokenId = 1;

    before(async () => {
      berenuNftContract = await BerenuNft.new();
      await berenuNftContract.mint(from, tokenId);
    });

    it('When approve(to, tokenId) is successfully called then emit event', async () => {
      const tx = await berenuNftContract.setApprovalForAll(to, true);

      assert.equal(tx.logs[0].event, 'ApprovalForAll');
    });
  });
});
