# Toy Robot

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a controllable robot.

## How to use it

Once the Application is running, you can add the list of commands you want your robot to execute.\
When you click `run`, you will then see the robot placed on the board.

* PLACE x,y,f
* MOVE
* LEFT
* RIGHT
* REPORT

An example of a list of commands:

```
PLACE 0,0,NORTH
LEFT
REPORT
```

or

```
PLACE 1,1,WEST
MOVE
MOVE
LEFT
REPORT
```


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

This will lint the project in the terminal.

### `yarn prob`

This will `lint`, then check TypeScript, then `test` the project

## TODO

* [x] Create the base project
* [x] Create a state and a reducer to control the Robot
* [x] Create a Context to allow access to the robot in multiple components
* [x] Create the Grid to place the Robot
* [x] Create the Robot and place it on the Grid
* [x] Create the CommandPanel to write instructions to the Robot
* [x] Improve the styles
* [ ] Create the Controls to visually interact with the Robot
* [ ] Fix Types for parseCommand
* [ ] Add E2E tests
* [ ] Deploy somewhere
