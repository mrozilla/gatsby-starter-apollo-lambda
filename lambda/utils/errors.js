// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

module.exports = Object.freeze({
  emailNotSent:   'emailNotSent', // Email wasn't sent
  invalidLogin:   'invalidLogin', // Invalid password or email
  linkExpired:    'linkExpired', // Password reset link has expired
  userNotExist:   'userNotExist', // User doesn't exist
  userExists:     'userExists', // Email or username already taken
  userNotDeleted: 'userNotDeleted', // User account wasn't removed
});
