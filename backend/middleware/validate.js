import { safeParse } from "zod";

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req,
      body,
    });
  };
};
