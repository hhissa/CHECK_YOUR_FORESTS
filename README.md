# 🌎 NDVI (Vegetation Index) Website
An NDVI site capable of client-side computing of NDVI's from TIFF's using WEBGL, Fetching pregenerated imagery and NDVI's from most popular API's and designed following Clean Architecture Principles

[![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![WebGL](https://img.shields.io/badge/WebGL-990000?logo=webgl&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)

The source code, following clean architecure principles, is structured as so:    
src      
├── core <-- General base classes and scripts present across multiple features  
│   ├── network_test.ts  
│   └── widgets  
│       └── widget.ts  
├── features  
│   └── imagery <-- main imagery feature  
│       ├── data  
│       │   ├── datasources <-- Lowest Layer - API calls   
│       │   ├── models   
│       │   └── repositories <-- Repository contract implementation   
│       ├── domain   
│       │   ├── entities <-- domain specific data structures   
│       │   ├── repositories <-- respository contract for layer indepenance   
│       │   └── usecases <-- Imagery Use cases    
│       └── presentation   
│           ├── pages   
│           ├── state <-- State management with custom bloc implementation    
│           └── widgets   
├── package.json   
├── package-lock.json    
└── pages <--feature independant UI   
    ├── selection_page.html   
    ├── splash_screen.css    
    ├── splash_screen.html    
    └── splash_screen.ts    



Their relationships can be defined like so:


<img width="1938" height="1246" alt="image" src="https://github.com/user-attachments/assets/9baad387-df65-4a37-8d8e-71a1397d0485" />


## Goals 🏆
- Building an automated NDVI pipeline using imagery API's:
  - <b>Program Structure</b>
    - Create Easily Maintanable Data layer for quick switching of imagery API's and types
    - Implement logically structured well planned code adhering to clean architecture principles</b> 
    - Create pleasant UX by allowing for multiple input methods for imagery bounds.

## What I learned 📚

### Geoprocessing and Satellite Imagery on the Web  
There is a wide variety of Imagery API's out there that provide different types of geographical products. Manipulating a variety of imagery formats and learning the <b> WMS standard </b> that many API's adhere to:
  - gave me a deeper understanding of how API standards work, as well as domain-specific knowledge in calling WMS APIS
  - How to use imagery in a variety of formats, through array buffers, such as converting and processing geotiffs or manipulating PNGs to create colour classifications on the web

### Discovering TypeScript
I gained hands-on experience integrating TypeScript with Imagery API's and WebGL. 
- Static Typing
  - I learned how TypeScript can help catch errors during development time rather than at runtime. This enhances code reliability, reduces bugs, and improves overall code quality.
- Improved Code Readability
  - I learned how to use TypeScript interfaces and types for defining API return values. 

### Code Structure and Project Design
Adhering to a rigid code structure allowed me to work methodically - filling in black boxes as I go - rather than sporadically building it in a looser module-based architecture.
- Sticking to small layers communicating to each other allows easily swapping out API's, Business logic or the presentation of the website
- layered structure allows for testing in isolation using mock testing to simulate other layers return values based on contracts. 

## Final Product: [https://hhissa.github.io/CHECK_YOUR_FORESTS](https://hhissa.github.io/CHECL_YOUR_FORESTS/)


<img width="1207" height="678" alt="image" src="https://github.com/user-attachments/assets/57d9ff3b-8c77-41ce-9cb9-54dcfa932b56" />



