import { useEffect,Fragment } from "react";
import { stringify } from "query-string";

import Feed from "../../components/feed/feed";
import useFetch from "../../hooks/useFetch";
import Pagination from "../../components/pagination/pagination";
import { getPaginator, limit } from "../../utils";
import PopularTags from "../../components/popularTags/popularTags";
import Loading from "../../components/loading/loading";
import ErrorMessage from "../../components/errorMessage/errorMessage";
import FeedToggler from "../../components/feedToggler/feedToggler";

const TagFeed = (props) => {

    const tagName = props.match.params.slug;   
    const {offset, currentPage} = getPaginator(props.location.search);
    const stringifiedParams = stringify({
        limit,
        offset,
        tag: tagName
    });
    const url = props.match.url;
    const apiUrl = `/articles?${stringifiedParams}`;
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage, tagName])
    
    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1>Medium clone</h1>
                    <p>A place to share knowledge</p> 
                </div>
            </div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <FeedToggler tagName={tagName}/>
                        {isLoading && <Loading/>}
                        {error && <ErrorMessage/>}
                        {!isLoading && response && (
                            <Fragment>
                                <Feed articles={response.articles} />
                                <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage} />
                            </Fragment>
                        )}
                    </div>
                    <div className="col-md-3">
                        <PopularTags />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TagFeed;