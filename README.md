# Book Store Resultados Digitais

## Your digital shelf on the internet

1. [About](#about)
2. [Usage](#usage)
3. [Browser Compatibility](#browser-compatibility)
4. [Automated Tests](#automated-tests)

### About
This is an open source project that aims facilitate the search of books by people on [Google Books API][GoogleBooks]. Basically, this app gives the user a custom experience which it is possible to search, read and bookmark his books.

### Usage
Anyone can clone this repo and collaborate to either improve the actual features or create new ones. In order to develop this project, you will the following requirements.

1. clone this repo, or fork it.
2. Make sure you have both [NodeJS][node] and [npm][npm] installed.
3. In a terminal, in the project root directory, run `npm install`.
4. After install the dependencies, run `npm run watch`.
5. Open your browser and visit [http://localhost:5000/][http://localhost:5000/]

You will see the Book Store Home page. Now, you can open your editor and start coding. Every time you save some file, eslint will check your code. If all its right, the browser will reload the page.

### Browser Compatibility
This release version (1.0.0) uses [Flexible Box Layout](http://caniuse.com/#feat=flexbox), which is compatible with [Firefox 51](https://www.mozilla.org/en-US/firefox/51.0/releasenotes/), [Internet Explorer 11](https://www.microsoft.com/pt-br/download/Internet-Explorer-11-for-Windows-7-details.aspx), [Microsoft Edge](https://www.microsoft.com/pt-br/windows/microsoft-edge), [Chrome 55](https://www.google.com/chrome/browser/desktop/index.html) and modern mobile browsers. The next stable version should brings flex box fallback for old browsers, and a responsive version for small screens.

### Automated Tests
Automated tests comming soon with Jest and Airbnb enzyme on next minor release.

[GoogleBooks]: https://books.google.com/
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
