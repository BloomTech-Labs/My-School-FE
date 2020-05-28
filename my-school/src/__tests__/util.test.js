const pillColor = require('../utils/pillColor.js')

describe('pillColor', () => {
    it('should return pink if no subject is given', () => {
        expect(pillColor()).toBe('pink')
    })
})