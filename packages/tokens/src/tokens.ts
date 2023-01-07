import { token, Theme } from './token-utils'
// RGB Values need to be converted to HSL
const neutral = {
    0: token([0, 0, 100]),
    50: token([0, 0, 98]),
    100: token([0, 0, 95]),
    200: token([0, 0, 91]),
    300: token([0, 0, 87]),
    400: token([0, 0, 80]),
    500: token([0, 0, 70]),
    600: token([0, 0, 55]),
    700: token([0, 0, 40]),
    800: token([0, 0, 27]),
    900: token([0, 0, 20]),
    1000: token([0, 0, 0])
}
const accent = {
    1: token([227, 86, 59]),
    '1b': token([227, 95, 63])
}
const base = {
    0: token([0, 0, 100]),
    1: token([0, 0, 92]),
    2: token([0, 0, 96]),
    3: token([0, 0, 100]),
    4: token([0, 0, 100]),
}

const functional = {
    blue: token([210, 83, 47]),
    red: token([0, 72, 51]),
    yellow: token([43, 72, 51]),
    green: token([115, 62, 51])
}

const text = {
    1: token('rgba(0, 0, 0, .90)'),
    2: token('rgba(0, 0, 0, .60)'),
    3: token('rgba(0, 0, 0, .20)')
}

const border = {
    radius: {
        square: token('4px'),
        pill: token('50%'),
        circle: token('900px')
    },
    width: {
        light: token('1px'),
        medium: token('2px'),
        heavy: token('4px')
    }
}

const shadow = {
    light: token('0 0 4px rgba(0,0,0,0.25)')
}

export const baseTheme = {
    neutral, accent, base, functional, text, border, shadow
}