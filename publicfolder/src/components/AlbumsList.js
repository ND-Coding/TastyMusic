import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../images/music.jpeg';
import firebase from '../firebase'
import Button from 'react-bootstrap/Button';

const AlbumsList = ({ albums }) => {
   
    function addTaste(e, link, src, title, author) {
        e.preventDefault()
        firebase
            .firestore()
            .collection('menu').add({
                title,
                link,
                rank:0,
                vote:0,
                user: "test",
                src,
                author,
                type:"Album",
            }).then(() => {

            })
    }
  return (
    <React.Fragment>
      {Object.keys(albums).length > 0 && (
        <div className="albums">
          {albums.items.map((album, index) => {
              return (
                 
              <React.Fragment key={index}>
                <Card style={{ width: '18rem' }}>
                  <a
                    target="_blank"
                    href={album.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(album.images) ? (
                      <Card.Img
                        variant="top"
                        src={album.images[0].url}
                        alt=""
                      />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <Card.Text>
                      <small>
                        {album.artists.map((artist) => artist.name).join(', ')}
                      </small>
                                
                      </Card.Text>
                  <Button variant="outline-success" size="lg" onClick={e => addTaste(
                    e,
                    album.external_urls.spotify,
                    album.images[0].url,
                    album.name,
                    album.artists.map((artist) => artist.name).join(', '))}>
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

export default AlbumsList;
