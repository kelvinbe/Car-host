# Folder structure
- This project was setup using the `create-next-app` template, so the base structure is the same as the one provided by the template. The following are the additional folders:

| Folder | Description |
| ------ | ----------- |
| cypress | Contains the cypress tests and related configuration files |
| jest | Contains some of the jest configuration files and mock data |
| .storybook | Contains the storybook configuration files and stories |
| test_utils | Shared resources between the jest and cypress tests such as test ids|

# Running the project
- To run the project, you can use the following commands:
  - `npm run dev` - Runs the project in development mode
  - `npm run build` - Builds the project for production
  - `npm run start` - Runs the project in production mode
  - `npm run test` - Runs the jest tests
  - `npm run test:watch` - Runs the jest tests in watch mode
  - `npm run cypress` - Opens the cypress test runner
  - `npm run cypress:run` - Runs the cypress tests in headless mode
  - `npm run storybook` - Runs the storybook
  - `npm run build-storybook` - Builds the storybook
  - `npm run electron:serve` - Runs web and desktop applications concurrently
  - `npm run electron:start` - Ensures control panel is running on port 3000 then starts the desktop application
  - `npm run electron:package` - Creates an executable bundle for target OS eg .exe on Windows
  - `npm run electron:dist` - Creates "distributables" from the executable bundles. This command packages and creates the distributables. Distributables are found in the /out/make folder
  - `npm run electron:publish` - Takes the distributable build artifacts from the Make step and uploads for distribution to your app's end users. Publishing is an optional step in the Electron Forge pipeline, since the artifacts from the Make step are already in their final format.


# HowTo Guides

## Swagger UI
- To add documentation to an api handler under the `/api` handler, all you have to do is write the documentation in `yaml` format within comments in the hadler file like below:
```ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

```
you can then view this when you visit the `/api-docs` route.
![image](https://user-images.githubusercontent.com/58218526/203850115-506a0170-edac-4a21-8b52-b9ca4aa6a725.png)

