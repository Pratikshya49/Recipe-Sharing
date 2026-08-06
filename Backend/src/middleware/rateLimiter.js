const rateLimit = (options = {}) => {
  const {
    windowMs = 60 * 1000,
    max = 10,
    message = "Too many requests, please try again later.",
  } = options;

  const hits = new Map();

  return (req, res, next) => {
    const key = req.ip || req.socket?.remoteAddress || "unknown";
    const now = Date.now();
    const windowStart = now - windowMs;
    const timestamps = (hits.get(key) || []).filter((t) => t > windowStart);

    if (timestamps.length >= max) {
      return res.status(429).json({ error: message });
    }

    timestamps.push(now);
    hits.set(key, timestamps);
    next();
  };
};

export default rateLimit;
