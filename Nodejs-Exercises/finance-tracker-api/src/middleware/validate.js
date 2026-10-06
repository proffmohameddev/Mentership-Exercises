// runs a zod schema against body, query and params
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) return next(result.error);

  const { body, query, params } = result.data;
  if (body) req.body = body;
  if (query) req.query = query;
  if (params) req.params = params;
  next();
};
