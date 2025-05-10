interface ForceInterface {
  id: number;
  username: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  instanceUrl: string;
  userId: number;
  issueAt:   Date;
  createdAt: Date;
  updatedAt: Date;
}

export default ForceInterface;
