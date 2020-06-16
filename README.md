## Error Handler

Managing errors in express can get really messy, really quickly. Making the s

How to use this package:
Step1: install the package via npm or yarn
yarn:

```
   yarn add exos-error-handler
```

npm:

```
   npm install exos-error-handler
```

Step2: import the specific error object you prefer

```
 import { APIError, HttpStatusCode } from "exos-error-handler";
 ...

 throw new APIError(
        "Invalid Password",
        HttpStatusCode.UNATHORIZED,
        true,
        "Invalid  password"
      );
```
You could also choose to extend the base error object and create your own custom errors