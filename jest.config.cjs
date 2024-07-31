module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/redux/reducers/actions/creators/index.js',
        '!src/components/*/index.js',
        '!src/pages/*/index.js',
        '!src/index.js',
        '!src/components/app/app.jsx',
        '!src/constants/**'
    ],
    coverageDirectory: 'coverage',
    moduleNameMapper: {
        '\\.(css|less|scss)$': require.resolve('./src/__mocks__/styleMock.js'),
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    testEnvironment: 'jsdom'
};
