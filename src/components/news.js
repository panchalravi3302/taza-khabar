import PropTypes from "prop-types";
import { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./News.css";
import NewsItem from "./newsitem";

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
this.apiKey = process.env.REACT_APP_NEWS_API_KEY;  }

 async fetchNews(pageNumber) {
  try {
    this.setState({ loading: true, error: null });

const url = `https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&token=${this.apiKey}&max=${this.pageSize}`;    // 🔴 check if request failed
    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    // 🔴 safe fallback
    const articles = data.articles || [];

    this.setState((prevState) => ({
      articles:
        pageNumber === 1
          ? articles
          : [...prevState.articles, ...articles],
      totalResults: data.totalResults || 0,
      page: pageNumber,
      loading: false,
    }));
  } catch (error) {
    console.error("Error fetching news:", error);

    this.setState({
      articles: [],
      loading: false,
error: "Failed to load news. Check your API key.",    });
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
            dataLength={this.state.articles?.length || 0}
            next={this.fetchMoreData}
hasMore={(this.state.articles?.length || 0) < this.state.totalResults}            loader={
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
  imageurl={element?.image}
  newsurl={element?.url}
  author={element?.source?.name}
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
