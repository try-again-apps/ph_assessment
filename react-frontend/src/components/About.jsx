import React, { Fragment } from 'react';

const About = () => (
  <Fragment>
    <div>
      <p>Unfortunately due to lack of time not all was done as I wanted.</p>
      <p>In few places redux could be used instead of internal state.</p>
      <p>
        Clients inline adding is not maybe very pretty but wanted to show
        reusability of component.
      </p>
      <p>
        This was my first try to react-table and I found that it does not
        support Immutables after I did part of implementation. That is why,
        there is ugly conversion to JS. But at least it shows that I can use
        reduce ;)
      </p>
    </div>
    <br />
    <div>
      Still to be done (few topics which may explain some solutions in code):
      <li>cleanup package json deps for dev and build</li>
      <li>optimistic updates</li>
      <li>404 page and react router *</li>
      <li>Populate DB with fake data - maybe use faker?</li>
      <li>Clients cannot have same name - unique?</li>
      <li>
        Add busy state for every operation (Redux is prepared ready for it)
      </li>
      <li>SSR for backend</li>
      <li>Add remove on client details page</li>
      <li>Code refactoring and cleanup</li>
      <li>production build</li>
      <li>
        {
          'Statuses could be separate table and connect to client with one-to-one relationship'
        }
      </li>
      <li>reorganize project structure</li>
      <li>eject project from react-app and configure webpack</li>
      <li>
        {
          "...and most probably many more but I'm too tired this week to think of some more ;)"
        }
      </li>
    </div>
  </Fragment>
);

export default About;
