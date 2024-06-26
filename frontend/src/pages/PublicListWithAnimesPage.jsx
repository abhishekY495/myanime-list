import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { UserDataContext } from "../contexts/UserDataContext";
import { removeAnimeFromList } from "../services/removeAnimeFromList";
import deleteIcon from "../assets/delete.png";
import viewsIcon from "../assets/views.png";
import "../components/lists/PrivatePublicLists.css";

export const PublicListWithAnimesPage = () => {
  const { listId } = useParams();
  const {
    state: {
      userData: { publicLists },
      removeAnimeLoading,
    },
    dispatch,
  } = useContext(UserDataContext);

  const list = publicLists.find((list) => String(list._id) === String(listId));

  const removeBtnHandler = (_id) => {
    removeAnimeFromList(_id, listId, false, dispatch);
  };

  return (
    <>
      {!list ? (
        <p className="fw-semibold text-center mt-5 fs-3">No such List</p>
      ) : (
        <Container>
          <Row>
            <Col md={1} className="m-auto" style={{ width: "900px" }}>
              <div className="border-bottom mb-3 d-flex justify-content-between align-items-end">
                <p className="mb-1 fs-1 fw-semibold">
                  {list?.listName}{" "}
                  <span className="fs-5 text-muted">
                    ({list?.animes.length})
                  </span>
                </p>
                <p className="mb-2 fw-semibold d-flex gap-2" title="views">
                  <img
                    src={viewsIcon}
                    alt="views"
                    style={{ width: "20px", cursor: "pointer" }}
                  />
                  <span>{list?.views}</span>
                </p>
              </div>
              {list?.animes.length === 0 ? (
                <p className="fw-semibold text-center">No animes ...</p>
              ) : (
                <div className="private-lists">
                  {list?.animes.map((anime) => {
                    return (
                      <Card style={{ cursor: "pointer" }} key={anime?._id}>
                        <Card.Body>
                          <Link
                            to={anime?.link}
                            className="text-decoration-none"
                            target="_blank"
                            title={anime?.title}
                          >
                            <Card.Img
                              variant="top"
                              src={anime?.coverImage}
                              className="rounded w-100"
                              style={{
                                height: "320px",
                                objectFit: "cover",
                              }}
                            />
                            <Card.Text className="m-0 pb-1 fs-4 ps-1 fw-bold text-truncate border-bottom text-white">
                              {anime?.title}
                            </Card.Text>
                          </Link>
                          <Button
                            variant="danger"
                            className="fw-semibold mt-2 w-100 d-flex justify-content-center align-items-center gap-2"
                            onClick={() => removeBtnHandler(anime?._id)}
                            disabled={removeAnimeLoading}
                          >
                            <img
                              width="12"
                              height="12"
                              src={deleteIcon}
                              alt="delete"
                            />{" "}
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
