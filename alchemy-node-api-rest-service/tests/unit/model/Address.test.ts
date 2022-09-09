import { Alchemy } from 'alchemy-sdk';
jest.mock('alchemy-sdk');

import { AddressModel } from "../../../src/model/Address";

describe('Address', () => {
  describe('getDAIBalance', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    })

    it('When given address has small balance then return balance', async () => {
      const balance = '0x4D2';
      prepareMock(Alchemy, balance);
      const address = '0x28c6c06298d514db089934071355e5743bf21d60';
    
      const result = await AddressModel.getDAIBalance(address);

      expect(Alchemy).toBeCalled();
      // @ts-ignore
      expect(Alchemy.mock.results[0].value.core.getTokenBalances).toBeCalledWith(address, [""])
      expect(result).toBe('1234');
    })

    it('When given address has big balance then return balance', async () => {
      const balance = "0x44444444444444444444444444444444444444";
      prepareMock(Alchemy, balance);
      const address = '0x28c6c06298d514db089934071355e5743bf21d60';
    
      const result = await AddressModel.getDAIBalance(address);

      // @ts-ignore
      expect(Alchemy.mock.results[0].value.core.getTokenBalances).toBeCalledWith(address, [""])
      expect(result).toBe('1522397538886357206462171700746128145474929732');
    })

    it('When given correct has 0 balance then return 0', async () => {
      const balance = '0x0000000000000000000';
      prepareMock(Alchemy, balance);
      const address = '0x28c6c06298d514db089934071355e5743bf21d60';
    
      const result = await AddressModel.getDAIBalance(address);

      // @ts-ignore
      expect(Alchemy.mock.results[0].value.core.getTokenBalances).toBeCalledWith(address, [""])
      expect(result).toBe('0');
    })

    it('When alchemy fails alchemy then throws an error', async () => {
      // @ts-ignore
      Alchemy.mockImplementation(() => {
        return {
          core: {
            getTokenBalances: jest.fn(() => {
              throw new Error('error');
            })
          },
        };
      });
      const address = '0x28c6c06298d514db089934071355e5743bf21d60';
    
      await expect(AddressModel.getDAIBalance(address)).rejects.toThrowError('error')

    })
  })
})

function prepareMock(Alchemy: any, newBalance: string) {
  Alchemy.mockImplementation(() => {
    return {
      core: {
        getTokenBalances: jest.fn(() => {
          return  { tokenBalances: [ {tokenBalance: newBalance} ] }
        })
      },
    };
  });
}