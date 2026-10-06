// wraps async controllers so any thrown error goes straight to next()
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
