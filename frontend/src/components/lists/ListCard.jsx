import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { UserDataContext } from "../../contexts/UserDataContext";
import { ButtonGroup } from "./ButtonGroup";
import placeHolderImage from "../../assets/placeholder.png";

export const ListCard = ({ list, inPrivate, publicProfile }) => {
  const {
    state: {
      userData: { username },
    },
  } = useContext(UserDataContext);

  const listLink = `/${username}/${inPrivate ? "private/" : "public/"}${
    list?._id
  }`;
  const publicListLink = `/user/${publicProfile?.username}/${list?._id}`;

  return (
    <Card style={{ cursor: "pointer" }}>
      <Card.Body>
        <Link
          to={publicProfile?.username ? publicListLink : listLink}
          className="text-decoration-none"
        >
          <Card.Img
            variant="top"
            src={list?.animes[0]?.coverImage || placeHolderImage}
            className="rounded w-100"
            style={{
              height: "200px",
              objectFit: "cover",
              filter: "blur(5px)",
            }}
          />
          <Card.Text className="m-0 pb-1 fs-4 ps-1 fw-bold text-truncate border-bottom text-white">
            {list?.listName}
          </Card.Text>
          <Card.Text className="m-0 mt-1 ps-1 text-muted">
            <span className="fw-semibold">{list?.animes?.length}</span>{" "}
            {list?.animes?.length > 1 ? "Animes" : "Anime"}
          </Card.Text>
          {!inPrivate && (
            <Card.Text className="m-0 ps-1 text-muted">
              <span className="fw-semibold">{list?.views}</span> Views
            </Card.Text>
          )}
        </Link>
        <ButtonGroup
          inPrivate={inPrivate}
          listId={list?._id}
          publicProfile={publicProfile?.username ? publicProfile : false}
        />
      </Card.Body>
    </Card>
  );
};
