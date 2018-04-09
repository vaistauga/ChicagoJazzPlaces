# Intro

This project was build during my Full-Stack Nanodegree attendance at Udacity. Project's goal is to build a single page application which creates a new service by combining several third-party API.

# Features

* Display a list of suggestions for you to hear some of the best Chicago jazz musicians.
* Displays best photo and description of each place (data pulled from FourSquare).
* You may use the filter field to displayed locations to find a specific one faster.
* The location marker bounces when you click on it - maximum interactivity! ;)

# Technology

* JQuery
* Knockout
* NPM
* Google Maps API
* FourSquare API

# Future Improvements

### Implement backend

This application has no backend. Most of the data shown are pull from either Google Maps or FourSquare. The only exception is the list of jazz places which uses a simple JavaScript object to store the list. This 'database' needs to be replaced with an actual database application.

Additionally, Foursquare expects it's client to be the server of the website, not the website client itself. This should be fixed once the backend is implemented.

### Allow the user to add new Jazzy places

I don't want to be the only one who can add content to this site. Once the backend is established, I will implement a form to add new locations.

# How view

The application uses NPM package manager. To preview the application pull the files and initialize NPM. From there simply open index.html.

I hope you like it!

# License

MIT License

Copyright (c) 2018 Vaidotas Staugaitis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
