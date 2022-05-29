import { useEffect,Fragment } from "react";
import { stringify } from "query-string";

import Feed from "../../components/feed/feed";
import useFetch from "../../hooks/useFetch";
import Pagination from "../../components/pagination/pagination";
import { getPaginator, limit } from "../../utils";

const GlobalFeed = (props) => {
    
    const {offset, currentPage} = getPaginator(props.location.search);
    const stringifiedParams = stringify({
        limit,
        offset
    });
    const url = props.match.url;
    const apiUrl = `/articles?${stringifiedParams}`;
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage])
    
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
                        {isLoading && <div>Loading...</div>}
                        {error && <div>Some error happened</div>}
                        {!isLoading && response && (
                            <Fragment>
                                <Feed articles={response.articles} />
                                <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage} />
                            </Fragment>
                        )}
                    </div>
                    <div className="col-md-3">
                        Popular tags
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalFeed;