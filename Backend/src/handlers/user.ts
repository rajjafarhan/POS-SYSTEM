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