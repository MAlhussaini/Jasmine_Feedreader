/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("all have URL defined and not empty.", function () {
            allFeeds.forEach(element => {
                let objectKey = Object.keys(element)
                let objectValue = Object.values(element)

                expect(objectKey[1]).toBe("url");
                expect(objectValue[1]).not.toBe(""); //ensure no empty urls.
            });
        })

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("all have name defined and not empty.", function () {
            allFeeds.forEach(element => {
                let objectKey = Object.keys(element)
                let objectValue = Object.values(element)

                expect(objectKey[0]).toBe("name")
                expect(objectValue[0]).not.toBe(""); //ensure no empty name values.
            });
        })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function () {
        // Take the element of the body that holds the hidden menu class
        beforeEach(function () {
            menuClassHolder = document.querySelector('body');
        });
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("it is hidden by default.", function () {
            expect(menuClassHolder.classList.contains("menu-hidden")).toBe(true)
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it("toggle visibility when the menu icon is clicked.", function () {

            /* function taken from 
             * https://gomakethings.com/how-to-simulate-a-click-event-with-javascript/
             * it simulates mouse click of an url
             */
            var simulateClick = function (elem) {
                // Create our event (with options)
                var evt = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                // If cancelled, don't dispatch our event
                var canceled = !elem.dispatchEvent(evt);
            };
            menuLink = document.querySelector('.menu-icon-link');

            simulateClick(menuLink); // toggle the app menu (from hidden to shown)
            expect(menuClassHolder.classList.contains("menu-hidden")).toBe(false)
            simulateClick(menuLink); // toggle the app menu (from shown to hidden again)
            expect(menuClassHolder.classList.contains("menu-hidden")).toBe(true)
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function () {

        beforeEach(function (done) {
            //load feed and wait for it to complete.
            loadFeed(index = 0, done);
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it("it has at least one entry in the feed section.", function (done) {
            //make sure the feed container is not null
            expect(document.querySelector(".feed .entry")).not.toBeNull();
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function () {
        let feedContainer = document.querySelector(".feed");
        beforeEach(function (done) {
            //load the initial feed and store its content
            loadFeed(index = 0, function () {
                initialFeed = feedContainer.innerHTML;
                // load the second feed and store its content
                loadFeed(index = 1, function () {
                    secondFeed = feedContainer.innerHTML;
                    done();
                });
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it("it change content with new feed.", function (done) {
            //compare the two content and make sure they are not matching.
            expect(initialFeed).not.toEqual(secondFeed);
            done();
        });
    });

}());
