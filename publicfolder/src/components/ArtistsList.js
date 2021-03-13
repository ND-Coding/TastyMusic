import React from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../images/music.jpeg';
import firebase from '../firebase'
import Button from 'react-bootstrap/Button';

const ArtistsList = ({ artists }) => {
    function addTaste(e, link, src, title) {
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
                author:"",
                type: "Artist",
            }).then(() => {

            })
    }



  return (
    <React.Fragment>
      {Object.keys(artists).length > 0 && (
        <div className="artists">
          {artists.items.map((artist, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: '18rem' }}>
                  <a
                    target="_blank"
                    href={artist.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(artist.images) ? (
                      <Card.Img
                        variant="top"
                        src={artist.images[0].url}
                        alt=""
                      />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                            <Card.Title>{artist.name}</Card.Title>
                            <Button variant="outline-success" size="lg" onClick={e => addTaste(
                                e,
                                artist.external_urls.spotify,
                                artist.images[0].url,
                                artist.name)
                            }>
                                  ADD IT
                  </Button>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default ArtistsList;
