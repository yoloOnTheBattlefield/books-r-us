import { Link } from "react-router-dom";
import { Container } from "./allBooks.styles";
import { Card } from "./allBooks.styles";
import { Genre } from "./allBooks.styles";

export const AllBooks = (props) => {
  const mappedBooks = props.data.map((book) => {
    return (
      <Card>
        <Link to={`/book/${book.volumeInfo.industryIdentifiers[0].identifier}`}>
          <div>{book.volumeInfo.title}</div>
          <div>
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
            />
          </div>
        </Link>
      </Card>
    );
  });
  return (
    <Container>
      <Genre>{props.genre}</Genre>
      {mappedBooks}
    </Container>
  );
};
