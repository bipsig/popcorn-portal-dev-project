# Popcorn Portal

Popcorn Portal is a ReactJS project that serves as a movie and TV series browsing application. It provides users with a platform to explore trending, top-rated, and most viewed movies and TV shows. The homepage showcases these listings, giving users a quick glimpse into the hottest entertainment options.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [TODO List](#todo-list)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Features

- **Homepage**: The homepage displays the trending, top-rated, and most viewed movies and TV shows, providing users with a curated selection of the latest and most popular content.

- **Explore**: Users can navigate to dedicated explore pages for movies and TV shows. These pages include filters for genres and sorting options based on rating, release date, and more. Users can easily find their preferred genre or discover new content based on their preferences.

- **Search**: The search bar allows users to search for any movie or TV show they desire. The search functionality quickly retrieves relevant results, making it easy for users to find their favorite content.

- **Movie/TV Show Details**: Each movie or TV show has its own description page, presenting essential information such as release date, cast, director name, runtime, rating, genres, and poster. Additionally, the description page suggests similar movies or TV shows and recommends related content to enhance the user's browsing experience.

- **Lazy Loading**: The website implements lazy loading to enhance performance. Images and content are loaded only when they are in the viewport, reducing initial loading times.

- **Responsive Design**: Popcorn Portal is fully responsive, ensuring a seamless browsing experience across various devices and screen sizes.

- **Error Handling**: The application handles scenarios where data, such as cast pictures or posters, may not be fetched properly. It gracefully handles such situations to ensure the website remains visually appealing and functional.

- **Skeleton Components**: To prevent the website from looking awkward during API loading, skeleton components are populated in place of actual data. This ensures a smooth and consistent user experience.

## Demo

You can check out the live demo of the application [here](https://popcorn-portal.netlify.app/).

## Tech Stack

The technologies used in this project include:
- ReactJS
- HTML
- CSS
- JavaScript

## Setup

To set up and run Popcorn Portal locally, follow these steps:

1. Clone the repository:
   
```bash
git clone https://github.com/bipsig/popcorn-portal-dev-project.git
```

2. Navigate to the project directory:

```bash
cd popcorn-portal-dev-project
```

3. Install dependencies: 

```bash
npm install
```

4. Start the development server:

```bash 
npm run dev
```

5. Open your browser and visit: `http://localhost:3000`

Note: Ensure you have Node.js and npm installed on your system before proceeding with the above steps.

## TODO List

Here are some recommendations to make the application even better:

- Implement user authentication to allow personalized features like saving favorites and creating watchlists.
- Add a rating and review system for users to share their opinions and experiences.
- Enhance the search functionality with advanced filters and sorting options.
- Implement a recommendation engine based on user preferences and viewing history.
- Optimize the performance of the application by implementing lazy loading and caching mechanisms.
- Improve the UI/UX design to create a more visually appealing and intuitive user experience.


## Acknowledgments

Popcorn Portal acknowledges the TMDB website for providing the APIs that power the project's data. Special thanks to the ReactJS community for their invaluable contributions.

## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out to our team at [sagnik.rik.das@gmail.com](mailto:sagnik.rik.das@gmail.com). We would love to hear from you!

Happy browsing with Popcorn Portal!
