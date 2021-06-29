import * as jwt from 'jsonwebtoken';

// export default (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw new Error('Invalid user ID');
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!'),
//     });
//   }
// };

export default (req, res, next) => {
  const token = req.header('authorization');
  if (!token) {
    return next({ message: 'Token required!', type: 'UnauthorizedError' });
  }

  try {
    const decoded = jwt.verify(token, 'randomString');
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    next({ message: 'Invalid Token!', type: 'UnauthorizedError' });
  }
};
