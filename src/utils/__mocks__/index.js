const utils = jest.requireActual('Utils/index')

export const getOperationHash = jest.fn().mockImplementation(str => 'MOCKED_HASH')

export const getDonatersEmoji = jest.fn().mockImplementation(() => utils.getDonatersEmoji())

export const linkifyPlainText = jest.fn().mockImplementation((text) => utils.linkifyPlainText(text))

export const openPaymentWidget =  jest.fn().mockImplementation((amount, transactionId, desc, isDonation, challengeId, challengeBody) =>{})