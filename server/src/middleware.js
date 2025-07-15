export const inputValidator = inputSchema => (req, res, next) => {
  const results = inputSchema.safeParse(req.body);

  if (!results.success) {
    const formattedErrors = results.error.issues.map(err => ({
      field: err.path[0],
      message: err.message,
    }));

    return res.status(400).json({ success: false, errors: formattedErrors });
  }

  next();
};
