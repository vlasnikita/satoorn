export const logAuthButtonClick = jest.fn().mockImplementation(event => {});

export const logDonateEvent = jest.fn().mockImplementation((context, userId) => {})

export const logShareEvent = jest.fn().mockImplementation((context, type, userId) => {})

export const logUserAction = jest.fn().mockImplementation((context, action, userId) => {})