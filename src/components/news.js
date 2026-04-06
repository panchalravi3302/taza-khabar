import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./newsitem";
import InfiniteScroll from "react-infinite-scroll-component";
import "./News.css";

export class News extends Component {
  static defaultProps = {
    category: "general",
  };

  static propTypes = {
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      error: null,
    };
    this.pageSize = 12;
    this.apiKey = "cb7a3f08f2254249a5c6a90ead9e47b3";
  }

  async fetchNews(pageNumber) {
    try {
      this.setState({ loading: true, error: null });
      const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${this.apiKey}&page=${pageNumber}&pageSize=${this.pageSize}`;
      const response = await fetch(url);
      const data = await response.json();

      this.setState((prevState) => ({
        articles:
          pageNumber === 1
            ? data.articles
            : [...prevState.articles, ...data.articles],
        totalResults: data.totalResults || 0,
        page: pageNumber,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({
        articles: [],
        loading: false,
        error: "Failed to load news.",
      });
    }
  }

  componentDidMount() {
    this.fetchNews(1);
  }

  fetchMoreData = () => {
    this.fetchNews(this.state.page + 1);
  };

  render() {
    return (
      <div className="container my-3 justify-content-center">
        <h2 style={{ fontFamily: "fangsong", fontWeight: "bold" }}>
          TAZA KHABAR - Top{" "}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}{" "}
          Headlines
        </h2>

        {this.state.error ? (
          <p className="text-danger">{this.state.error}</p>
        ) : (
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={
              <div className="d-flex justify-content-center my-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all 🎉</b>
              </p>
            }
          >
            <div className="row">
              <div className="news-grid">
                {this.state.articles.map((element) => (
                  <NewsItem
                    key={element.url}
                    title={element?.title || "No title"}
                    description={element?.description || "No description"}
                    imageurl={element?.urlToImage}
                    newsurl={element?.url}
                    author={element?.author}
                    publishedAt={element?.publishedAt}
                  />
                ))}
              </div>
            </div>
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default News;
