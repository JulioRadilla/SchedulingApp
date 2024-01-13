module.exports = {
    signUpUser: async (req,res =>{
        try {
            
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message})
        }
    }),
    loginUser: async (req,res => {

    })
}