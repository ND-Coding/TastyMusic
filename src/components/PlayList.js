import React from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../images/music.jpeg';
import firebase from '../firebase'
import Button from 'react-bootstrap/Button';


const PlayList = ({ playlist }) => {
    function addTaste(e, link, src, title, author) {
        e.preventDefault()
        firebase
            .firestore()
            .collection('menu').add({
                title,
                link,
                rank: 0,
                vote: 0,
                user: "test",
                src,
                author,
                type: "Playlist",
            }).then(() => {

            })
    }

  return (
    <div>
      {Object.keys(playlist).length > 0 && (
        <div className="playlist">
          {playlist.items.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: '18rem' }}>
                  <a
                    target="_blank"
                    href={item.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(item.images) ? (
                      <Card.Img variant="top" src={item.images[0].url} alt="" />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                                <small>By testing{item.owner.display_name}</small>
                            </Card.Text>
                 <Button variant="outline-success" size="lg" onClick={e => addTaste(
                    e,
                    item.external_urls.spotify,
                    item.images[0].url,
                    item.name,
                    item.owner.display_name)}>
                    ADD IT
                 </Button>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlayList;
