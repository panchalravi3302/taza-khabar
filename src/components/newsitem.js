import { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, publishedAt } =
      this.props;
    return (
      <div className="news-container">
        <div className="my-3">
          <div className="card">
            <img
              className="card-img-top"
              src={
                imageurl
                  ? imageurl
                  : "https://media.zenfs.com/en/coingape_360/9666ffd53aebba899efea6ee3770e282"
              }
              alt={title}
            />{" "}
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <small className="text-muted">
                  By {author ? author : "Unknown"}
                </small>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  Published at {new Date(publishedAt).toGMTString()}
                </small>
              </p>
              <a
                href={newsurl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
