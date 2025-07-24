import { createNew } from "./createNew"
import { findByDate } from "./findByDate"

export const resolveTransactionID = async (date: Date = new Date()): Promise<{
  sessionID: number;
  transactionID: number;
}> => {
  let session = await findByDate({ date });
  let seed = 1;

  if (session) {
    seed = session.transactionCounts + 1;
  } else {
    session = await createNew();
  }

  const transactionID = Number(`${session._id.toString()}${seed.toString().padStart(4, "0")}`);

  return {
    sessionID: session._id,
    transactionID,
  };
};
