import { z } from 'zod';
import { HttpStatusCode } from '../../constants/error.constants';
import SessionModel from '../../models/Session.model';
import catchErrors from '../../utils/catchErrors.utils';
import appAssert from '../../utils/appErrorAssert.utils';
import { DB_COLLECTIONS } from '../../config/MongoDB.config';

const SERVICE_NAME = DB_COLLECTIONS.Sessions;

const getSessions = catchErrors(async (req, res) => {
  const sessions = await SessionModel.find(
    {
      userId: req.userId,
      expiresAt: { $gt: new Date() },
    },
    {
      //object that will be returned
      _id: 1,
      userAgent: 1,
      createdAt: 1,
    },
    {
      sort: { createdAt: -1 },
    }
  );

  return res.status(HttpStatusCode.OK).json(
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === req.sessionId && {
        isCurrent: true,
      }),
    }))
  );
});

const deleteSession = catchErrors(async (req, res) => {
  const sessionId = z.string().parse(req.params.id); // from url
  const deleted = await SessionModel.findOneAndDelete({
    _id: sessionId,
    userId: req.userId,
  });
  appAssert(
    deleted,
    HttpStatusCode.NotFound,
    'Session not found',
    SERVICE_NAME
  );

  return res.status(HttpStatusCode.OK).json({
    message: 'Session removed',
  });
});

export default {
  getSessions,
  deleteSession,
};
