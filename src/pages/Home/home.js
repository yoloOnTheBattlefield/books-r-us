import React from "react";
import axios from "axios";
import { AllBooks } from "../../components/AllBooks/allBooks";

export class Home extends React.Component {
  state = {
    data: null,
    isLoading: false,
  };

  getBookData = async (subject) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=40&key=${process.env.REACT_APP_API_KEY}`
      );
      const updatedState = { ...this.state.data };
      updatedState[subject] = data.items;
      this.setState({ data: updatedState, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getBookData("horror");
    this.getBookData("romance");
    this.getBookData("mystery");
    this.getBookData("nonfiction");
    this.getBookData("history");
  }

  render() {
    const readyToLoad = !this.state.isLoading && this.state.data;

    return (
      <>
        {this.state.isLoading && <>Loading...</>}
        {readyToLoad && (
          <>
            {Object.entries(this.state.data).map((entry) => {
              const [key, value] = entry;
              const firstLetterCaps =
                key.charAt(0).toUpperCase() + key.slice(1);
              return (
                <>
                  <AllBooks data={value} genre={firstLetterCaps} />
                </>
              );
            })}
          </>
        )}
      </>
    );
  }
}
