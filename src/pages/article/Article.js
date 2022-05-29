import { useEffect } from "react";
import { Link } from "react-router-dom";


import Loading from "../../components/loading/loading";
import useFetch from "../../hooks/useFetch";
import ErrorMessage from "../../components/errorMessage/errorMessage";
import TagList from "../../components/tagList/tagList";

const Article = (props) => {
    
    const slug = props.match.params.slug;
    const apiUrl = `/articles/${slug}`;
    const [{response, error, isLoading}, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch();
    }, [doFetch])

    return (
        <div className="article-page">
            <div className="banner">
                {!isLoading && response && (
                    <div className="container">
                        <h1>{response.article.title}</h1>
                        <div className="article-meta">
                            <Link to={`/profiles/${response.article.author.username}`}>
                                <img src={response.article.author.image} alt="avatar" />
                            </Link>
                            <div className="info">
                                <Link to={`/profiles/${response.article.author.username}`}>
                                    {response.article.author.username}
                                </Link>
                                <span className="date">{response.article.createdAt}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="container page">
                {isLoading && <Loading />}
                {error && <ErrorMessage />}
                {!isLoading && response && (
                    <div className="row article-content">
                        <div className="col-xs-12">
                            <div>
                                <p>
                                    {response.article.tagList}
                                </p>
                            </div>
                            <TagList tags={response.article.tagList} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Article;