

const testEndpoint = async (req, res) => {
    try {
        const loggedInUser = req.user;

        return res.status(200).json({message: "This is the test endpoint", loggedInUser});
    } catch (error) {
        console.log(`Error testing. Error: ${error}`);
        
        return res.status(500).json({error: 'Internal server error'});
    }
};

module.exports = testEndpoint;