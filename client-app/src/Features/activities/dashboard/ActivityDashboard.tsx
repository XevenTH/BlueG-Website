import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import { UseStore } from "../../../App/Containers/storeContainer";
import { PagingParams } from "../../../App/Models/pagination";
import ActivityList from "./ActivityList";
import Filter from "./filter";
import ListItemPlaceholder from "./ListPlaceHolder";

export default observer(function ActivityDashboard() {
    const { activityStore } = UseStore();
    const { activitiesMap, GetAllActivities, initialLoading, SetPagingParams, pagination } = activityStore;

    const [loadingNext, setLoadingNext] = useState(false);

    function HandleGetNext() {
        setLoadingNext(true);
        SetPagingParams(new PagingParams(pagination!.currentPage + 1));
        GetAllActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activitiesMap.size <= 1) GetAllActivities();
    }, [activitiesMap.size, GetAllActivities]);

    return (
        <Grid>
            <Grid.Column width='10'>
                {initialLoading && !loadingNext ? (
                    <>
                        <ListItemPlaceholder />
                        <ListItemPlaceholder />
                        <ListItemPlaceholder />
                    </>
                ) :
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={HandleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <ActivityList />
                    </InfiniteScroll>
                }
            </Grid.Column>
            <Grid.Column width={6}>
                <Filter />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})