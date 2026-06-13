# The Decisions behind this website flow

## Q1. One architectural decision you could have gone either way on — what were the options and why did you pick what you picked?

### I have been working and orchestrating web apps from scaffolding to deployment, i have been very much lean to the architecture decision which had worked for me well, like the folder structure and routing patterns.

### Currently the approcah is layered architecture, could have been used the feature based approached considering the simplicity of the app and its limit like a ecomm app has screens from home page, plp, pdp, cart, checkout, order tracking, profile and each route is totally independent of the other so the layered fits well here also this structure is easy to reason also new team member can understand the structure easily.

#### Here goes the context of folder structure
- api: its totally resposible for the api calls which are hooks build on top of tanstack query which handles the error and loading state and separation is done based on the business logic like products, users, cart etc.
- components: Its splitted into two subfolder like ui which is the atomic layer of the app where we have all the base components like buttons, card, toggle. The we have the shared folder which is for the components which are used across the app like navbar, footer, layout etc.
- pages: This is the core business logic layer of the app. Here all the components are combined to form the pages.
- types: This is common folder for storing the types across the folders in the src/* directory eg: page/productListing which translated to types/pages/productListing and so on.
- router: Here we render the app routes as an object rather than using the Router components direclty with this approach we can scale the routing system easily like nested routing, and feature based routing like routes for procuts, cart and users.
- store: we are using the context api to manage the state of the cart and we can easily manage the state for feature this small ecomm app


## Q2. What you would clean up or do differently with more time ?

- Styles:  I could have created base classes for the styles like .flex-row, .flex-col, .items-center, .justify-center etc. in which is more of like how tailwind works, so it would be easier to write styles and also maintain the code structure.
- Mobile Screen optimization currently it looks very avg this could have been done in better way, like having the add to cart button on the bottom like a drawer
- Could have done prefetching the links on hovering the card which could have resulted in faster pdp page of each product.
- One more thing we are missing if common components like the add and reduce button could have build it once used it anaywere via props.
- Empty state if no items found is something missing currenlty showing blank page
- Skeleton Loader for each section to make it more interactive

### Features With Assumption:
- I added search and category base filtering which seems obvious since its and ecommerce application
- Added the + and - action button on each page also persisted across the application

## Library Used:
1. React
2. Tanstack Query for data fetching.
3. Lucide React for icons
4. SASS for styling
5. React Router
