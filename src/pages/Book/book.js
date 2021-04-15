import React from "react";
import axios from "axios";
import { Cover } from "../../components/Cover/cover";
import { Title } from "../../components/Title/title";
import { Author } from "../../components/Author/author";
import { Description } from "../../components/Description/description";
import { Container } from "./book.styles";
import { CoverDiv } from "./book.styles";

export class Book extends React.Component {
  state = {
    data: null,
    isLoading: false,
  };

  getBook = async (isbn) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data: data.items[0], isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { isbn } = this.props.match.params;
    this.getBook(isbn);
  }

  render() {
    return (
      <>
        {this.state.isLoading && <>Loading...</>}
        {this.state.data && !this.state.isLoading && (
          <Container>
            <CoverDiv>
              <Cover
                coverUrl={this.state.data.volumeInfo.imageLinks.thumbnail}
                title={this.state.data.volumeInfo.title}
              />
            </CoverDiv>
            <Title title={this.state.data.volumeInfo.title} />
            <Author authors={this.state.data.volumeInfo.authors} />
            <Description description={this.state.data.volumeInfo.description} />
          </Container>
        )}
      </>
    );
  }
}
