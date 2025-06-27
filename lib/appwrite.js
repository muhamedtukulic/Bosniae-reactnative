import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.muhamed.bosniae',
  projectId: '68545e32003080cf05a0',
  databaseId: '6854612b0002e7197ae4',
  userCollectionId: '685461de0002ed70fe6e',
  storageId: '685466ac00204f57adf5',
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);

export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
    console.log('Logged out successfully');
  } catch (error) {

    console.log('Logout error or no active session:', error.message || error);
  }
};

export const createUser = async (email, password, username) => {
  try {
    
    await logoutUser();

    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error('Account creation failed');

  

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
      }
    );

    return newUser;
  } catch (error) {
    console.log('Appwrite createUser error:', error);
    throw new Error(error.message || 'Error creating user');
  }
};

export async function signIn(email, password) {
  try {
    
    try {
      await account.deleteSession('current');
      console.log('Deleted existing session');
    } catch (err) {
      
    }

    
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message || 'Error signing in');
  }
}