import { connect } from "react-redux";
import { TDispatchProps, TStateProps, Navigation, Route } from "../../common/types";
import { Dispatch } from "redux";
import { Action, State } from "../../../App";
import { Search, ISearchProps } from "./Search";
import { searchDocumentStart, getDocumentByHelperStart, searchDocumentEnd } from "./actions";


type StateProps = TStateProps<ISearchProps>;
type DispatchProps = TDispatchProps<ISearchProps>;

export interface OwnProps {
    navigation: Navigation;
    route: Route;
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
    pageStatus: state.search.pageStatus,
    helpers: state.search.helpers,
    error: state.search.error,
    navigation: ownProps.navigation,
    route: ownProps.route,
    searchedDocuments: state.search.searchedDocuments
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    search: (str: string) => {
        return dispatch(searchDocumentStart(str))
    },
    getDocumentByHelper: (helper: string) => {
        return dispatch(getDocumentByHelperStart(helper))
    },
    searchEnd: (helpers: Array<any>) => {
      return dispatch(searchDocumentEnd(helpers));
    }
  };
};

export const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);
