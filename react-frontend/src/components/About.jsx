import React from 'react';

class About extends React.PureComponent {
  render() {
    return (
      <div>
        <li>Update readme files.</li>
        <li>Remeber to cleanup package json deps for dev and build.</li>
        <li>Optimistic update</li>
        <li>404 page and react router *</li>
        <li>Populate DB with fake data - maybe use faker?</li>
        <li>Limit operations buttons width and give some space between</li>
        <li>Clients cannot have same name - unique?</li>
        <li>CRUD for client</li>
        <li>CRUD for notes</li>
        <li>getting clients from backend with filter, sorting and limit</li>
        <li>Getting single note</li>
        <li>(M) adding notes</li>
        <li>(M) removing notes</li>
        <li>(M) updating notes</li>
        <li>(M) filtering (by status)</li>
        <li>(M) sorting by name/status</li>
        <li>Add busy state for every operation (Redux is ready for it)</li>
        <li>SSR for backend</li>
        <li>Add remove on client details page</li>
      </div>
    );
  }
}

export default About;
