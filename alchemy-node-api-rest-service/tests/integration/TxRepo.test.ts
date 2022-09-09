import TxRepo from "../../src/repository/TxRepo";

describe('TxRepo', () => {
  describe('fetchFromBlock', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    })

    it('When given correct blockNumber then return correct txs', async () => {
      const expectedResult = {
        "asset": "DAI", "blockNum": "0xbc614e", 
        "category": "erc20", "erc1155Metadata": null, "erc721TokenId": null, 
        "from": "0x503828976d22510aad0201ac7ec88293211d23da", "hash": "0x59ab07eddb9093b18466f4fe39544fb11dc028790bc675382e121c5851092c3c", 
        "rawContract": {"address": "0x6b175474e89094c44da98b954eedeac495271d0f", "decimal": "0x12", "value": "0x0a6af0535661d3d400"}, 
        "to": "0x8213001dc18a285c8527f86cf0b4267ce6bd0616", "tokenId": null, "uniqueId": "0x59ab07eddb9093b18466f4fe39544fb11dc028790bc675382e121c5851092c3c:log:14", "value": 192.17319133}

      const result = await TxRepo.fetchFromBlock(12345678);

      expect(result.length).toBe(1000);
      expect(result[0]).toStrictEqual(expectedResult);
    })

    it('When given incorrect blockNumber then throw error', async () => {   
      await expect(TxRepo.fetchFromBlock(-1)).rejects.toThrowErrorMatchingSnapshot();
    })

  })
})
