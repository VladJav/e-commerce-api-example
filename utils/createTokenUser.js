const createTokenUser = (user) => {
    return {
        userId: user._id,
        role: user.role,
        name,
    };
};

module.exports = createTokenUser;