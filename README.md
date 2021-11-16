# schoolyard

Launch backend server
```
cd backend
npm install
node app
```

Launch frontend
```
cd frontend
npm install
npm start
```

Run ESLint & autofix style
```
# Make sure you have the latest version of Node installed

cd frontend
npm install
npm run lint

cd ../backend
npm install
npm run lint
```

Upon the first start of the application, a pre-commit hook will be installed. This hook prevents you from committing code that doesn't compile.

### Packages/Libraries

`npm install react-bootstrap@next bootstrap@5.1.3`