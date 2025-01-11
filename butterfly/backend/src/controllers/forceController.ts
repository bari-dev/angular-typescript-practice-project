import { Request, Response } from 'express';
import jsforce from 'jsforce';
import User from '../models/user';
import ForceInterface from '../interfaces/force';

const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_BASE_URL } = process.env;

class ForceController {
  async loginWithUsernamePassword(req: Request, res: Response): Promise<void> {
    const   user = req.user;
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required.' });
      return;
    }

    const conn = new jsforce.Connection({
      loginUrl: SF_BASE_URL,
    });

    try {
      const userInfo = await conn.login(username, password);
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        await existingUser!.update({
          accessToken: conn.accessToken,
          instanceUrl: conn.instanceUrl,
          issuedAt: new Date(),
        });
      } else {
        await User.create({
          username,
          password: password,
          accessToken: conn.accessToken,
          instanceUrl: conn.instanceUrl,
          issuedAt: new Date(),
        });
      }

      res.status(200).json({
        message: 'Successfully logged into Salesforce.',
        user: {
          username,
          instanceUrl: conn.instanceUrl,
          userId: userInfo.id,
          orgId: userInfo.organizationId,
        },
      });
    } catch (error) {
      console.error('Error logging into Salesforce:', error);
      res.status(500).json({ error: 'Failed to log into Salesforce.' });
    }
  }

  async fetchAccounts(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.body;

      if (!username) {
        res.status(400).json({ error: 'Username is required.' });
        return;
      }

      // Retrieve user credentials from the database
      const user = await User.findOne({ where: { username } });

      if (!user) {
        res.status(404).json({ error: 'User not found.' });
        return;
      }

      const force = user?.salesforce as any;
 
      if (!force) {
        res.status(404).json({ error: 'Salesforce credentials not found for user.' });
        return;
      }
 
      // Establish Salesforce connection
      const conn = new jsforce.Connection({
        instanceUrl: user.instanceUrl,
        accessToken: user.accessToken,
      });

      // Query Salesforce for accounts
      const accounts = await conn.query('SELECT Id, Name FROM Account LIMIT 10');
      res.status(200).json(accounts.records);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      res.status(500).json({ error: 'Failed to fetch Salesforce accounts.' });
    }
  }
}

export default new ForceController();
