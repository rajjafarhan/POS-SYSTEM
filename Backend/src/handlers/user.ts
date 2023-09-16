import { createJWT, comparePassword, hashPassword } from '../modules/auth';
import { database_connection } from '../db';

export const createNewUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const shopsCollection = await database_connection();
    await shopsCollection.insertOne({
      username: username,
      password: hashedPassword,
    });

    // Find the newly inserted user based on the unique identifier (username)
    const newUser = await shopsCollection.findOne({ username: username });

    if (newUser) {
      const token = createJWT(newUser);
      return res.status(201).json({ token });
    } else {
      console.log('Error occurred while inserting the data');
      return res.status(500).send('Internal Server Error');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
};



export const signin=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const shopsCollection = await database_connection();

        const user=await shopsCollection.findOne({username:username});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isValid=await comparePassword(password,user.password);
        if(!isValid){
            res.status(401).json({message:"Invalid credentials"}); 
            return;
        }  
         else{
            const token=createJWT(user);
            return res.status(200).json({token});
         }

       }
       catch(error){
           console.error("Error occurred:",error);
           return res.status(500).json({message:"Internal Server Error"});
       }
}


