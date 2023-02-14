# Cypress Test

## Description

To fulfil the below requirements : 
-Go to https://en.wikipedia.org/wiki/List_of_cities_in_the_United_Kingdom#List_of_cities and select ten random cities from the table
-Select one random city from the previously selected list
-Go to https://bbc.co.uk/weather
-Find the location using the search on the BBC weather website
-Go to Saturday at least a week from today
-Pass the test if
    all places have been checked
    OR
    it will be sunny and at least 10C
-Send a short email from one inbox to another explaining where is the nice weather (or that there is no such place) 
-To pass the second part of the test log in to the second inbox and verify if the message containing the correct location has arrived (you may -need to give it some time).

## Technologies Used

Cypress | Javascript | Node

## Installation

Clone the code into your terminal from the repository. 

The test script can be found in ./cypress/e2e/script.cy.js file location