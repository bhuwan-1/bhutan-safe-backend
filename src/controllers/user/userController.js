

const profile = async (req, res) => {
    return res.json({message: "User profile after auth middleware."})
}

module.exports = { profile }