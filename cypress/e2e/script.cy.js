/// <reference types="cypress" />

let citiesArray = [];
let tempArray = [];
let chosenCity = '';

describe('Email temperature between two email addresses', function () {
    
    
    it('Get cities', function () {
        //Go to Wikipedia
        cy.visit('https://en.wikipedia.org/wiki/List_of_cities_in_the_United_Kingdom#List_of_cities');
        //Get 10 random cities
        for (let a = 0; a < 10; a++) {
            let num = Math.floor(Math.random() * 77);
            cy.get('tbody tr').eq(num,0).find('a').eq(0).invoke('text').then(message => {
                //Push the cities to an array (citiesArray)
                citiesArray.push(message); 
                //Select one city at random (chosenCity) 
                if (a == 9) {
                    let randomNum = Math.floor(Math.random() * 10);
                    chosenCity = citiesArray[randomNum].city; 
                }
            });
        };
    })
    

    it('Find temperature', function () {
        for (let b = 0; b < citiesArray.length -9; b++) {
            //Go to BBC Weather
            cy.visit('https://bbc.co.uk/weather');
            //Search for each city
            cy.get('input').type(`${citiesArray[b].city}{enter}`);
            cy.get('.ls-o-location').eq(0).click();
            for (let a = 7; a < 14; a++) {
                //Check for Saturday one week from todat
                cy.get('.wr-js-day').eq(a).find('.wr-date__long').eq(0).invoke('text').then(message => {
                    let day = message.slice(0,8);
                    if (day == 'Saturday') {
                        let num = (a*2)-3;
                        //Add the temperature to the array (citiesTemp)
                        cy.get('.wr-value--temperature--c').eq(num).invoke('text').then(received => {
                            tempArray.push(received);
                        });
                    }
                });
            }
        }
    });

    
    it('Send email', function () {
        //Filter only cities containing 10C+ temperature into new array (citiesForEmail)
        let citiesForEmail = citiesArray.filter(city => city.temp >= 10);
        cy.visit('https://login.yahoo.com/?.src=ym&pspid=159600001&activity=mail-direct&.lang=en-GB&.intl=uk&.done=https%3A%2F%2Fuk.mail.yahoo.com%2Fd');
        //Sign into first email
        cy.get('.phone-no').type('BoomerangTesta@yahoo.com{enter}');
        cy.get('.password').type('Turkey!123{enter}');
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.get('.e_dRA').eq(0).click();
        //Add command to use tab
        Cypress.Commands.add('typeTab', (shiftKey, ctrlKey) => {
            cy.focused().trigger('keydown', {
                keyCode: 9,
                which: 9,
                shiftKey: shiftKey,
                ctrlKey: ctrlKey
            })
          })
        //Enter email address to send the email to
        cy.get('.select-input').eq(1).type('BoomerangTestb@yahoo.com');
        //Write body text
        cy.get('[role="textbox"]').type(`Hi Second Email, the weather will be 10oc plus in the following destinations - Regards, First Email`);
        //Send the email
        cy.get('[title="Send this email"]').click();
        //Sign into new email
        cy.get('[data-test-id="primary-btn"]').click();
        cy.get('._yb_1golm').click();
        cy.get('[data-soa="Sign out of all"]').click();
        cy.get('[data-redirect-params="pspid=[[pspid]]&activity=ybar-signin"]').click();
        cy.get('.pure-button').eq(1).click();
        //Crashes here

    });   

})
