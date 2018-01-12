var generateMessage = (from, text) => {
    return {
        from,
        text,
        compleated: new Date().getDate()
    };
};

module.exports = {generateMessage};