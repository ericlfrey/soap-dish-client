# The Soap Dish
Watch the [Video Walkthrough](https://www.loom.com/share/8a691f8f485d4807accd0458dcbced52) on Loom! 

![logo](https://user-images.githubusercontent.com/107942776/246680367-2b14c0d1-f0ad-451c-a60e-4792a6046e58.png)

## Topics
- [Overview](#overview)
- [MVP Features](#mvp-features)
- [Try the App Yourself](#try-the-app-yourself)
- [Planning The Soap Dish](#planning)
- [Code Snippets](#code-snippets)
- [Tech Stacks for TSD](#tech-stacks)
<!-- - [Stretch Features](#stretch-features) -->

## Overview
The Soap Dish is a recipe creation app that allows a User to Create, Read, Update and Delete a Soapmaking Recipe, maintain notes and descriptions of the soap performance, and share the recipe with others. 

Modern Soap Makers have few choices when it comes to designing and calculating soap recipes. These resources rarely have a way to store recipes with the ability to update them and make notes on the outcomes of the recipes. While there are many blogs for soapers, there should be an easy way to search, share, and save favorite recipes with other like-minded makers.

## MVP Features 

<em>Recipes:</em>
- Sign in via Google Authentication
- Add a new Recipe to see the recipe card visible on the home page with all other user-created recipes.
- Clicking the recipe card takes the User to the Recipe Details page which has weight amounts for all ingredients needed to make the recipe. This page also contains the soap description and notes about the recipe.
- A Favorite Button allows a User to add a recipe to their favorites list, whether the recipe was created by the User, or another Soaper.
- The Favorite Recipes Page allows a User to see all favorited recipes
- The Public Recipes page allows a User to see recipes by all users set to public.
<img src="https://user-images.githubusercontent.com/107942776/246680238-226e1c2e-f8be-4819-b6be-e909b2d12b99.png" width="500"/>
<img src="https://user-images.githubusercontent.com/107942776/246680233-789b08da-fcfb-4a5e-a2ed-416cd565a122.png" width="500"/>
<img src="https://user-images.githubusercontent.com/107942776/246680224-ad5f027a-e93a-4f7d-b345-b0b4f100fe51.png" width="500"/>


## Try the app yourself
Watch the [Video Walkthrough](https://www.loom.com/share/8a691f8f485d4807accd0458dcbced52) on Loom! 

1. Set up a [Firebase](https://firebase.google.com/) project - [Here's how to setup](https://www.loom.com/share/163ffe1539bb482196efa713ed6231e9)
2. Clone TSD to your local machine 
```
git@github.com:ericlfrey/soap-dish-client.git
```

3. Next, create an .env file at the root of the project and paste the following keys into the .env file:
```
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
# Add your Server URL to the NEXT_PUBLIC_DATABASE_URL variable below (ex: http://localhost:8000)
NEXT_PUBLIC_DATABASE_URL=http://localhost:8000

```
4. The last portion of the Firebase walkthrough from step 1 highlights where to find the values to put in the empty strings in the code snippet of step 3 . From Firebase, copy the values and paste them into the empty strings of the respective keys located in the .env file.
5. Be in the root directory and from your command line, run
```
npm i
```
6. Now from your command line, run:
```
npm run prepare
```
7. To start The Soap Dish, run:
```
npm run dev
```
8. Click http://localhost:3000 in the terminal to open the browser
9. Setup and run the [The Soap Dish Server](https://github.com/ericlfrey/soap-dish-server) for this project to run on local machine.



## Planning
#### ERD for The Soap Dish MVP
<img src="https://user-images.githubusercontent.com/107942776/246680192-ffd33b5b-ba25-4621-87f2-842de85e4d29.png" width="500"/>

#### Screenshot of Wireframe with Next JS Routes
<img src="https://user-images.githubusercontent.com/107942776/246683815-bcd5c80d-5943-48fe-8c9f-e905d3f788df.png" width="500"/>

[Link to ERD](https://dbdiagram.io/d/6477a843722eb774942b395b)

[Link to Figma Wireframe](https://www.figma.com/file/fT2y5vBYsuC4aeyZyLN1mZ/Soap?type=whiteboard&t=oI7dB8blbt9OO1a0-0)

[Link to Github tickets for The Soap Dish - MVP](https://github.com/users/ericlfrey/projects/11/views/1?layout=board)


## Code Snippets
#### Favorites Page
<img src="https://user-images.githubusercontent.com/107942776/246680193-d2eebb83-6f9e-4d0f-914c-5c3ac6bf7e59.png" width="600"/>

#### Recipe Card Component
<img src="https://user-images.githubusercontent.com/107942776/246680194-e73969ca-0aad-4eb5-96ab-10cfc145d0f1.png" width="600"/>

#### Recipe Card CSS Module
<img src="https://user-images.githubusercontent.com/107942776/246680195-5be7b181-8fe8-4665-8414-6ae03d0742a7.png" width="600"/>

## Tech Stacks
<div align="center">  
<a href="https://reactjs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" height="50" /></a>  
<a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" alt="nextjs" width="40" height="40"/>
<a href="https://www.python.org/" target="_blank" rel="noreferrer"> <img src="https://profilinator.rishav.dev/skills-assets/python-original.svg" alt="python" width="40" height="40"/>
<a href="https://www.djangoproject.com/" target="_blank" rel="noreferrer"> <img src="https://profilinator.rishav.dev/skills-assets/django-original.svg" alt="django" width="40" height="40"/>
<a href="https://firebase.google.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/firebase.png" alt="Firebase" height="50" /></a> 
<a href="https://www.w3schools.com/css/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" /></a>  
<a href="https://en.wikipedia.org/wiki/HTML5" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" height="50" /></a>  
<a href="https://getbootstrap.com/docs/3.4/javascript/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/bootstrap-plain.svg" alt="Bootstrap" height="50" /></a>  
<a href="https://www.figma.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/figma-icon.svg" alt="Figma" height="50" /></a>  
</div>


## Contributors
- [Eric Frey](https://github.com/ericlfrey)
