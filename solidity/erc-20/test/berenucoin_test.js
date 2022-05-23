const BerenuCoin = artifacts.require('BerenuCoin');

contract('BerenuCoin', (accounts) => {
  const name = 'BerenuCoin';
  const symbol = 'BNC';
  const totalSupplyExpected = 1000;
  const decimalsExpected = 18;
  
  describe('Deployment', () => {
    it('BerenuCoin has been successfully deployed', async () => {
      const berenuCoin = await BerenuCoin.deployed();
      assert(berenuCoin);
    });
  });

  describe('State variables', () => {
    let berenuCoin;

    before(async () => {
      berenuCoin = await BerenuCoin.deployed();
    });

    it('Check name', async () => {
      const name = await berenuCoin.name();
      const nameExpected = 'BerenuCoin';

      assert.equal(name, nameExpected);
    });

    it('Check symbol', async () => {
      const symbol = await berenuCoin.symbol();
      const symbolExpected = 'BNC';

      assert(symbol, symbolExpected);
    });

    it('Check decimals', async () => {
      const decimals = await berenuCoin.decimals();
      
      assert.equal(decimals, decimalsExpected);
    });

    it('Check totalSupply', async () => {
      const totalSupply = await berenuCoin.totalSupply();

      assert.equal(totalSupply, totalSupplyExpected);
    });
  });

  describe('Method transfer', () => {
    let berenuCoin;

    before(async () => {
      berenuCoin = await BerenuCoin.deployed();
    });

    it('When sender has not enough tokens then throw error', async() => {
      try {
        const sender = accounts[1];
        const receiver = accounts[3];
        const amount = 100;
        await berenuCoin.transfer(receiver, amount, {from: sender});
        assert.fail('The transaction should fail');
      } catch (error) {
        assert.equal(error.reason, 'The amount of tokens exceeds from the sender balance');
      }
    });

    it('When sender has zero tokens then throw error', async() => {
      try {
        const sender = accounts[2];
        const receiver = accounts[1];
        const amount = 100;

        await berenuCoin.transfer(receiver, amount, {from: sender});

        assert.fail('The transaction should fail');
      } catch (error) {
        assert.equal(error.reason, 'The amount of tokens exceeds from the sender balance');
      }
    });

    it('When sender and receiver is the same address then throw error', async() => {
      try {
        const sender = accounts[0];
        const receiver = accounts[0];
        const amount = 100;
        await berenuCoin.transfer(receiver, amount, {from: sender});
        assert.fail('The transaction should fail');
      } catch (error) {
        assert.equal(error.reason, 'The sender address and the receiver address must be different');
      }
    });

    it('When sender has enough tokens then returns true', async() => {
      const sender = accounts[0];
      const receiver = accounts[1];
      const amount = 100;

      const response = await berenuCoin.transfer(receiver, amount, {from: sender});

      assert.ok(response);
    });
  });

  describe('Method transfer and balanceOf', () => {
    let berenuCoin;

    before(async () => {
      berenuCoin = await BerenuCoin.new(name, symbol);
    });

    it('When inicialization then accounts[0] balance is totalSupply', async() => {
      const account = accounts[0];

      const balance = await berenuCoin.balanceOf(account);

      assert.equal(balance, totalSupplyExpected);
    });

    it('When sender has enough tokens then receiver balance increment the amount of the tx and sender balance decrise the same', async() => {
      const sender = accounts[0];
      const receiver = accounts[1];
      const amount = 50;

      const senderBalanceExpected = totalSupplyExpected - amount;
      const receiverBalanceExpected = amount;

      await berenuCoin.transfer(receiver, amount, {from: sender});

      const senderBalance = await berenuCoin.balanceOf(sender);
      const receiverBalance = await berenuCoin.balanceOf(receiver);

      assert.equal(senderBalance, senderBalanceExpected);
      assert.equal(receiverBalance, receiverBalanceExpected);
    });

    it('When account balance is empty then return 0', async() => {
      const account = accounts[2];
      const balanceExpected = 0;

      const balance = await berenuCoin.balanceOf(account);

      assert.equal(balance, balanceExpected);
    });
  });

  describe('Method approve', () => {
    let berenuCoin;
    let spender;
    let sender;
    const amount = 100;


    before(async () => {
      berenuCoin = await BerenuCoin.new(name, symbol);
    });

    beforeEach(() => {
      sender = accounts[0];
      spender = accounts[1];
    });

    it('When approve sufficient amount then return true', async () => {
      const result = await berenuCoin.approve(spender, amount, {from: sender});
      assert.ok(result);
    });

    it('When sender and spender are the same then throw error', async () => {
      const spender = sender;
      try {
        await berenuCoin.approve(spender, amount, {from: sender});
        assert.fail('It should fail')
      } catch(error) {
        assert.equal(error.reason, 'The sender and the spender cannot be the same address')
      };
    });
  });

  describe('Method transferFrom and approve', () => {
    let berenuCoin;
    let sender = accounts[0];
    let receiver = accounts[1];
    let amount = 100;

    before(async () => {
      berenuCoin = await BerenuCoin.new(name, symbol);
    });

    it('When allowance is not set then throw error', async () => {
      try {
        await berenuCoin.transferFrom(sender, receiver, amount);
        assert.fail('It should fail');
      } catch(error) {
        assert.equal(error.reason, 'The allowance address has not permission to send the tokens');
      }
    });

    it('When allowance is smaller than the amount to be sent then throw error', async () => {
      try {
        const amountApproved = 10;
        const spender = accounts[1];
        sender = accounts[0];
        receiver = accounts[2];

        await berenuCoin.approve(spender, amountApproved, {from: sender});
        await berenuCoin.transferFrom(sender, receiver, amount, {from: spender});

        assert.fail('It should fail');
      } catch(error) {
        assert.equal(error.reason, 'The allowance is smaller than the amount');
      }
    });

    it('When allowance is the same amount as the amount to be sent and the sender has tokens then transfer the amount', async () => {
      const senderBalanceExpected = 900;
      const receiverBalanceExpected = 100;
      const amountApproved = 100;
      const spender = accounts[1];
      sender = accounts[0];
      receiver = accounts[2];

      await berenuCoin.approve(spender, amountApproved, {from: sender});
      await berenuCoin.transferFrom(sender, receiver, amount, {from: spender});

      const senderBalance = await berenuCoin.balanceOf(sender);
      const receiverBalance = await berenuCoin.balanceOf(receiver);

      assert.equal(senderBalance, senderBalanceExpected);
      assert.equal(receiverBalance, receiverBalanceExpected);
    });
  });

  describe('Method allowance', () => {
    let berenuCoin;
    let sender = accounts[0];
    let receiver = accounts[1];
    let spender = accounts[2];
    let amount = 100;

    beforeEach(async () => {
      berenuCoin = await BerenuCoin.new(name, symbol);
    });

    it('When allowance is set then returns the amount', async () => {
      const allowanceExpected = 100;
      const amountApproved = 100;

      await berenuCoin.approve(spender, amountApproved, {from: sender});

      const allowance = await berenuCoin.allowance(sender, spender);

      assert.equal(allowance, allowanceExpected);
    });

    it('When allowance is not set then return the 0', async () => {
      const allowanceExpected = 0;

      const allowance = await berenuCoin.allowance(sender, spender);

      assert.equal(allowance, allowanceExpected);
    });

    it('When allowance is bigger than the amount to be sent and the sender has tokens then transfer the amount and decraise the allowance', async () => {
      const senderBalanceExpected = 900;
      const receiverBalanceExpected = 100;
      const amountApproved = 200;
      spender = accounts[1];
      sender = accounts[0];
      receiver = accounts[2];

      await berenuCoin.approve(spender, amountApproved, {from: sender});
      await berenuCoin.transferFrom(sender, receiver, amount, {from: spender});

      const senderBalance = await berenuCoin.balanceOf(sender);
      const receiverBalance = await berenuCoin.balanceOf(receiver);

      const allowance = await berenuCoin.allowance(sender, spender);

      assert.equal(senderBalance, senderBalanceExpected);
      assert.equal(receiverBalance, receiverBalanceExpected);
      assert.equal(allowance, 100);
    });

    it('When sender approve a second time the allowance amount is replaced', async () => {
      const amountApprovedFirst = 200;
      const amountApprovedSecond = 400;

      await berenuCoin.approve(spender, amountApprovedFirst, {from: sender});
      await berenuCoin.approve(spender, amountApprovedSecond, {from: sender});

      const allowance = await berenuCoin.allowance(sender, spender);

      assert.equal(allowance, 400);
    });
  });

  describe('Events', () => {
    let berenuCoin;
    let sender = accounts[0];
    let receiver = accounts[1];
    let spender = accounts[2];
    let amount = 100;

    beforeEach(async () => {
      berenuCoin = await BerenuCoin.new(name, symbol);
    });

    it('Event Transfer: transfer', async () => {
      const tx = await berenuCoin.transfer(receiver, amount, {from: sender});

      assert.equal(tx.logs[0].event, 'Transfer');
    });

    it('Event Transfer: transferFrom', async () => {
      await berenuCoin.approve(spender, amount, {from: sender});
      const tx = await berenuCoin.transferFrom(sender, receiver, amount, {from: spender});

      assert.equal(tx.logs[0].event, 'Transfer');
    });

    it('Event Approval: approve', async () => {
      const tx = await berenuCoin.approve(receiver, amount, {from: sender});

      assert.equal(tx.logs[0].event, 'Approval');
    });
  });
});

