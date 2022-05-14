module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  globals: {
    http: true,
    nofity: true,
    AuthAPI: true,
    UserAPI: true,
    OfficeAPI: true,
    PositionAPI: true,
    EmployeeAPI: true,
    StatusAPI: true,
    TaskAPI: true,
    RoleAPI: true,
    MemberAPI: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
