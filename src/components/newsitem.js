import { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {
      title,
      description,
      imageurl,
      newsurl,
      author,
      publishedAt,
      category,
    } = this.props;
    const timeAgo = new Date(publishedAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return (
      <div className="news-card">
        {imageurl ? (
          <img
            src={imageurl}
            alt={title}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="news-card-fallback">📰</div>
        )}
        <div className="news-card-body">
          <div className="news-card-category">{category || "General"}</div>
          <h5 className="news-card-title">{title}</h5>
          <p className="news-card-desc">{description}</p>
          <div className="news-card-meta">
            <span>By {author || "Unknown"}</span>
            <span>{timeAgo}</span>
          </div>
          <a
            href={newsurl}
            target="_blank"
            rel="noreferrer"
            className="news-card-btn"
          >
            Read more →
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
