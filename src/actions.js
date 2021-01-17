export const getVideo = (word, limit, ref = "", page = 1) => {
    return (dispatch) => {
        if (!word) return
        dispatch({ type: "LOADING", payload: { loading: true } });

        return fetch(
            `https://api.github.com/search/repositories?q=${word}&page=${page}&per_page=${limit}`
        )
        .then((res) => res.json())
        .then((json) => {
            dispatch({ type: "LOADING", payload: { loading: false } });
            if (!word) return;
            if (ref && ref.current.value !== word) return;

            dispatch({
                type: "UPDATE",
                payload: {
                    repos: {
                        [word]: { items: json.items },
                    },
                    current: word,
                    end: json?.items?.length ? false : true,
                }
            });
        });
    };
};
