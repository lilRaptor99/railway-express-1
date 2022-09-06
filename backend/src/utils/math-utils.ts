/* eslint-disable import/prefer-default-export */

export function generateVerifyKey() {
  let verifyKey = 0;
  while (verifyKey < 999 || verifyKey > 9999) {
    verifyKey = Math.floor(Math.random() * 10000);
  }
  return verifyKey;
}
