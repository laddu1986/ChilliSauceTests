@login-feature
Feature: Login on Gastro

    As a random user on the Gastro site
    I want to login
    So that I can navigate through the new website

    Background:

        Given I am on the Gastro.org page

    @successfullogin.emailaccount
    Scenario Outline: Successful Login with email account
        When an "<usertype>" user enters his email and password "<email>" "<password>" into the fields
        Then user sees his username "<username>" at the top of the main page

        Examples:
        |email|                     |password|      |usertype|      |username|
        |aho@gastro.org|            |123|           |admin|         |Antonio Ho|
        |walter@acklenavenue.com|   |Testing123|    |editor|        |Walter Test|

    @successfullogin.socialmedia
    Scenario Outline: Successful Login with social media accounts
        When a "<usertype>" user enters his email and password "<email>" "<password>" into the fields
        Then user sees his username "<username>" at the top of the main page

        Examples:
        |email|                     |password|       |usertype| |username|
        |qatestingacklen@gmail.com| |Acklen123|      |facebook| |Tester Acklen|
        |qatestingacklen@gmail.com| |Acklen123|      |linkedin| |Tester Acklen|
        |qatestingacklen@gmail.com| |Acklen123|      |google|   |QA Testing|

    @unsuccessfullogin.wrongcredentials
    Scenario: Unsuccessful Login with wrong credentials
        When a user enters incorrectly his email-password "aho@gastro.org" "1234" into the fields
        Then user sees an error message "unable to login user."

    @unsuccessfullogin.nocredentials
    Scenario: Unsuccessful Login with no credentials
        When a user leaves in blank the email-password fields
        Then user sees a warning message "can't be blank"
