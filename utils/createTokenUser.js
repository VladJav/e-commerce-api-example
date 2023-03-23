const createTokenUser = (user) => {
    return {
        userId: user._id,
        role: user.role,
        name: user.name,
    };
};

module.exports = createTokenUser;