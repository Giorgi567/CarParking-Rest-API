import { sign } from 'jsonwebtoken';
// DISCLAMER: i know i should save these in .env file but ran into some errors which were not worht time i had left so i just decided to leave them here

const SECRETJWT =
  'MIICWwIBAAKBgQCQNBc4IP2ewViqE+ZHbnqGoCZFyAUtrxKmO4k/boSvBisJH6BX01ajpafM7c7f5PO+wAcGYIxiTQsv9ml2/cgnB6MWG/YYKDCfbWLNbpvQxYlUCu0fbRHc4dYM3AysBpx/SE9JNAlUoRsuQ05PP3U0IsM9FzYUpyZ9TDR7bjPYyQIDAQABAoGABnnAXS3mFb36/FA+dBC7AdapQVL1IJMPFFXyGN4eqTlur08zRR5hcqHawjIfqyA97d/zsM6fHz70dKftHoHQ/hZKfWsBr2+R8C7rY/tlJhM24kqusDvNA9AMNoQWK4+DF+J05q5a+VWjP07Y976LZjq+vXlEVBfEiHig4wECaDECQQDbRQ5L9Mcibd5aR+Y3LxtXu0agpSG1dYDcWlLzRAt6yDD/EziRV8DSFyvgj1amO0SQ+2K/Hp5BEHiifDJB48ZFAkEAqFv32dNZcBy4IKAAHPgxhsYBcuUCHGfwwxxXJ3DjjZlhuR4K9YjO0alf4zNOlUyoULe9z+OAIgIqI9EyIX2itQJAShMeLVLYIy1yvJUllOb5Gb5Osd6XcLHtgoORGlWWezg+NS3NImy+2zqwvAAwiZ/kHgaO6XnyhJCH8Hx8jf3g8QJAepLKtlo7iXY/T/FtY6oHVNof/+hfSxMZpNOjWGHGKjd7gG0xCWZbPSYVW7LlCanP+URs+0fk592vlHggCWYQ6QJANZzno1FwUOjtGLeKm83ZGdbo3K+00i25FmBgB2d0uAtknoxFVOjsY+eSXHZqNybrhWRAzutSnpz/QEf/7Vg97g==';
export const sendJWT = (id: string) => {
  return sign({ id: id }, SECRETJWT, {
    expiresIn: 300000,
  });
};
