Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test


    ***************LOCATOR RULES*******

    If Id is present
    css-> tagname#id (or) #id

    If class attribute is present
    css-> tagname.id (or) .class

    Write css based on any attribute
    css-> [attibute='value']

    Write css with traversing from Parent to child
    css-> parenttagname >> childtagname

    if needs to write the locator based on text
    text=''


