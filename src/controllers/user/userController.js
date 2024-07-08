

const profile = async (req, res) => {
    return res.json({message: "User profile after auth middleware."})
}

const resetPassword = async (req, res) => {
    return res.json({message: "Password reset."})
}

module.exports = { profile }