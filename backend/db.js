module.exports = {
    'secret': 'scrt',
    'url' : 'mongodb://localhost/' + (process.env.TD_ENV === 'test' ? 'test': 'sensors')
};
