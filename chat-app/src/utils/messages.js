const generateMessage = (text) => {
    return {
        text: text,
        createdAt: new Date().getTime()
    }
};

const generateLocationMessage = (locationUrl) => {
    return {
        locationUrl: locationUrl,
        createdAt: new Date().getTime()
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
};