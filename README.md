## Assumptions
* all commits are pushed directly to `master` branch to save time on feature/releases
* components are implemented using hooks
## Notes

### boilerplate

project is generated using `create-react-app` to save time of configuration. You can find how to run project in their [documentation](https://github.com/facebook/create-react-app).

### codestyle & linting

project uses `prettier` with default `eslint` config from `create-react-app` to ensure consistent codestyle in the codebase
  
## Choices

### `ant-desing`

One of the most starred design system, used for saving time with styling components

### `reduxsauce`

Helps with creating redux actions and types. Saves a lot of lines of code and boilerplate code.

## left TODO
* add missing tests
* configure and add `storybooks`
* configure and add `plop` to generate components/modules faster
* create `Theme` and keep colors/typography there
* move some common components from `routes` to e.g `shared/components` directory to make reusing them easier

