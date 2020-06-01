const pillColor = require('../utils/pillColor.js')
const validateCredentials = require('../utils/validateCredentials.js')
const validateTitle = require('../utils/validateTitle')
const timeChange = require('../utils/timeChange.js')

describe('pillColor', () => {
    it('should return pink if no subject is given', () => {
        expect(pillColor()).toBe('pink')
    })
    it('should return red if subject is English', () => {
        expect(pillColor('English')).toBe('red')
    })
    it('should return orange if subject is Math', () => {
        expect(pillColor('Math')).toBe('orange')
    })
    it('should return yellow if subject is Science', () => {
        expect(pillColor('Science')).toBe('yellow')
    })
    it('should return green if subject is Social Studies', () => {
        expect(pillColor('Social Studies')).toBe('green')
    })
    it('should return teal if subject is Art', () => {
        expect(pillColor('Art')).toBe('teal')
    })
    it('should return blue if subject is Music', () => {
        expect(pillColor('Music')).toBe('blue')
    })
    it('should return cyan if subject is Health', () => {
        expect(pillColor('Health')).toBe('cyan')
    })
    it('should return purple if subject is Physical Education', () => {
        expect(pillColor('Physical Education')).toBe('purple')
    })
})

describe('validateCredentials', () => {
    it('should return null if no value is provided', () => {
        expect(validateCredentials()).toBe(null)
    })
    it('should return an error message if the value is less than or equal to 0', () => {
        expect(validateCredentials(-1)).toBe('Must provide login information')
    })
})

describe('validateTitle', () => {
    it('should return true if a title longer than 3 characters is provided', () => {
        expect(validateTitle('Test')).toBe(true)
    })
    it('should return a message indicating a title is required if no title is provided', () => {
        expect(validateTitle()).toBe('A title is required')
    })
    it('should return a message indicating a title is required if an emptystring is provided', () => {
        expect(validateTitle('')).toBe('A title is required')
    })
})

describe('timeChange', () => {
    it('should should return an appropriate value if no value is provided', () => {
        expect(timeChange()).toBe('0h 0m')
    })
})