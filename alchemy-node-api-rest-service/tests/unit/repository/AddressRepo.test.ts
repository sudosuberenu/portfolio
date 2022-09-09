import Logger from '../../../src/core/Logger';
jest.mock('../../../src/core/Logger');

import { AddressModel } from '../../../src/model/Address';
jest.mock('../../../src/model/Address');

import AddressRepo from "../../../src/repository/AddressRepo";

describe('AddressRepo', () => {
  describe('getDAIBalance', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    })

    it('When given correct address then return the balance as string', async () => {
      const sypeLogger = jest.spyOn(Logger, 'info');
      const spyGetDaiBalance = jest.spyOn(AddressModel, 'getDAIBalance').mockResolvedValue('12345');
      const address = '0x28c6c06298d514db089934071355e5743bf21d60';
      const expectedBalance = '12345';

      const result = await AddressRepo.getDAIBalance(address);

      expect(spyGetDaiBalance).toBeCalledTimes(1);
      expect(spyGetDaiBalance).toBeCalledWith(address);
      expect(sypeLogger).toBeCalledWith(`Fetch DAI balance ${expectedBalance} from ${address}`);
      expect(result).toBe(expectedBalance);
    })

    it('When given incorrect address then throw error', async () => {
      const sypeLogger = jest.spyOn(Logger, 'info');
      const spyGetDaiBalance = jest.spyOn(AddressModel, 'getDAIBalance').mockRejectedValue(new Error('Error'))
      const address = '0x28c6c06298d514db089934071355e5743bf21d60';

      await expect(AddressRepo.getDAIBalance(address)).rejects.toThrowError('Error')
      expect(spyGetDaiBalance).toBeCalledWith(address);
      expect(sypeLogger).toBeCalledTimes(0);
    })
  })
})
