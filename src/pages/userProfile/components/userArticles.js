import { Fragment, useEffect } from "react";
import { stringify } from "query-string";

import { getPaginator, limit } from "../../../utils";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/loading/loading";
import ErrorMessage from "../../../components/errorMessage/errorMessage";
import Feed from "../../../components/feed/feed";
import Pagination from "../../../components/pagination/pagination";

const getApiUrl = ({username, offset, isFavorites}) => {
    const params = isFavorites ? {limit, offset, favorited: username} : {limit, offset, author: username}

    return `/articles?${stringify(params)}`
}

const UserArticles = ({username, location, isFavorites, url}) => {
    
    const {offset, currentPage} = getPaginator(location.search);
    const apiUrl = getApiUrl({username, offset, isFavorites});
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);
    
    console.log('res', response)

    useEffect(() => {
        doFetch()
    }, [doFetch, isFavorites])

    return (
        <div>
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
                <Fragment>
                    <Feed articles={response.articles}/>
                    <Pagination 
                        total={response.articlesCount} 
                        limit={limit} 
                        url={url} 
                        currentPage={currentPage} 
                    />
                </Fragment>
            )}
        </div>
    )
}

export default UserArticles;