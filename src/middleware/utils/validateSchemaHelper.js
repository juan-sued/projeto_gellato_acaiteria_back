async function validateSchema(objectData, schema, response) {
  const validate = schema.validate(objectData, { abortEarly: false });
  const { error } = validate;

  if (error) {
    const errors = error.details.map(err => err.message);
    console.log(errors);
    return errors;
  }
}

export { validateSchema };
