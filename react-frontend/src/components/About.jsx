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
        <li>CRUD for comments</li>
        <li>getting clients from backend wiht filter, sorting and limit</li>
        <li>Getting single clinet and comment</li>
        <li>Use moment for date formattings</li>
      </div>
    );
  }
}

export default About;
