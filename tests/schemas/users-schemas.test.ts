import faker from '@faker-js/faker';
import { authSchemas } from '@/schemas';

describe('signUpSchema', () => {
  const Fakepassword = faker.internet.password(6);

  const generateValidInput = () => ({
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: Fakepassword,
    confirmPassword: Fakepassword,
  });

  describe('when email is not valid', () => {
    it('should return error if email is not present', () => {
      const input = generateValidInput();
      delete input.email;

      const { error } = authSchemas.signUpSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if email does not follow valid email format', () => {
      const input = generateValidInput();
      input.email = faker.lorem.word();

      const { error } = authSchemas.signUpSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('when password is not valid', () => {
    it('should return error if password is not present', () => {
      const input = generateValidInput();
      delete input.password;

      const { error } = authSchemas.signUpSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if password is shorter than 6 characters', () => {
      const input = generateValidInput();
      input.password = faker.lorem.word(5);

      const { error } = authSchemas.signUpSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it('should return no error if input is valid', () => {
    const input = generateValidInput();

    const { error } = authSchemas.signUpSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
