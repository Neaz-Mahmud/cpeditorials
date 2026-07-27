import { safeParse } from "zod";

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(new ApiError(400, "Validation failed", errors));
    }

    if (req.body) req.body = result.data.body ?? req.body;
    if (req.params) Object.assign(req.params, result.data.params);
    if (req.query) Object.assign(req.query, result.data.query);
    next();
  };
};

export default validate;
