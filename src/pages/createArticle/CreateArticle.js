import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import ArticleForm from "../../components/articleForm/articleForm";
import useFetch from "../../hooks/useFetch";
import { CurrentUserContext } from "../../contexts/currentUser";

const CreateArticle = () => {
    
    const [currentUserState] = useContext(CurrentUserContext);
    const apiUrl = '/articles';
    const [{response, error}, doFetch] = useFetch(apiUrl);
    const initialValues = {
        title: '',
        description: '',
        body: '',
        tagList: []
    };
    const [isSuccesfullSubmit, setIsSuccesfullSubmit] = useState(false);
    
    const handleSubmit = article => {

        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    }

    useEffect(() => {
        if (!response) {
            return
        }

        setIsSuccesfullSubmit(true)
    }, [response])

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to="/"/>
    }
    
    if (isSuccesfullSubmit) {
        return <Redirect to={`/articles/${response.article.slug}`} />
    }

    return (
        <div>
            <ArticleForm 
                errors={(error && error.errors) || {}} 
                initialValues={initialValues} 
                onSubmit={handleSubmit} />
        </div>
    )
}

export default CreateArticle;