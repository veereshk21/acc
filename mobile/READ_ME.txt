Initialization
npm run setup
Initializes the project and installs the dependencies.

Development
npm run start
Starts the node development server running on http://localhost:3000

Bundle for play akka dev-server 
npm run bundle:dev
Preps your app for deployment. Optimizes and creates source-maps for all files, piping them to the build folder. 

Bundle for production server
npm run bundle:prod
The app is built for optimal performance: assets are minified and source maps are not included.

Linting
npm run lint
Lints your JavaScript.

Dependency size test
npm run analyze
This command will generate a stats.json file from your production build, which you can upload to the webpack analyzer. This analyzer will visualize your dependencies and chunks with detailed statistics about the bundle size.

Remove node_modules
npm run clean:modules
Removes node_modules folder and prepares your application for fresh installation.
